import type {Api} from '../../../lib/gramjs';
import type {ApiInitialArgs, ApiOnProgress, OnApiUpdate} from '../../types';
import type {MethodArgs, MethodResponse, Methods} from '../methods/types';
import type {OriginRequest, WorkerMessageEvent} from './types';

import {DEBUG} from '../../../config';
import generateIdFor from '../../../util/generateIdFor';
import {pause} from '../../../util/schedulers';
import MsgConn, {MsgClientState, MsgConnNotify, MsgConnNotifyAction} from "../../../lib/client/MsgConn";
import AccountController from "../../../lib/client/AccountController";

type RequestStates = {
  messageId: string;
  resolve: Function;
  reject: Function;
  callback?: AnyToVoidFunction;
};

const HEALTH_CHECK_TIMEOUT = 150;
const HEALTH_CHECK_MIN_DELAY = 5 * 1000; // 5 sec

let worker: Worker;
let m_onUpdate: OnApiUpdate;
const requestStates = new Map<string, RequestStates>();
const requestStatesByCallback = new Map<AnyToVoidFunction, RequestStates>();
let msgClient: MsgConn;

const initMsgClient = async (onUpdate?: OnApiUpdate)=>{
  if(onUpdate && !m_onUpdate){
    m_onUpdate = onUpdate;
  }
  await AccountController.getCurrentAccount()?.initGroups();
  m_onUpdate({
    '@type': 'updateMsgNotify',
    accountId:AccountController.getCurrentAccountId(),
    action:MsgConnNotifyAction.onInitAccount,
    payload:{}
  });
  msgClient = MsgConn.getInstance(AccountController.getCurrentAccountId());
  msgClient.connect();
  msgClient.setMsgHandler((accountId:number,notifyList:MsgConnNotify[])=>{
    for (let i = 0; i < notifyList.length; i++) {
      if(m_onUpdate){
        m_onUpdate({
          '@type': 'updateMsgNotify',
          accountId,
          ...notifyList[i],
        });
      }
    }
  })
  await msgClient.waitForMsgServerState(MsgClientState.connected);
}

// TODO Re-use `util/WorkerConnector.ts`
export function initApi(onUpdate: OnApiUpdate, initialArgs: ApiInitialArgs) {
  if (!worker) {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log('>>> START LOAD WORKER');
    }

    worker = new Worker(new URL('./worker.ts', import.meta.url));
    subscribeToWorker(onUpdate);

    if (initialArgs.platform === 'iOS') {
      setupIosHealthCheck();
    }
  }
  initMsgClient(onUpdate).catch(r => console.error(r));
  return makeRequest({
    type: 'initApi',
    args: [initialArgs],
  });
}

async function switchAccount(accountId:number){
  if(accountId!= msgClient.getAccountId()){
    await msgClient.close();
    await initMsgClient()
  }
}

export function callApi<T extends keyof Methods>(fnName: T, ...args: MethodArgs<T>) {
  if(fnName === "switchAccount"){
    //@ts-ignore
    const accountId:number = args[0];
    switchAccount(accountId);
    return undefined;
  }
  if (!worker && !["sendMessage"].includes(fnName)) {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.warn('API is not initialized',fnName,args);
    }
    return undefined;
  }

  const promise = makeRequest({
    type: 'callMethod',
    name: fnName,
    args,
  });

  // Some TypeScript magic to make sure `VirtualClass` is never returned from any method
  if (DEBUG) {
    (async () => {
      try {
        type ForbiddenTypes =
          Api.VirtualClass<any>
          | (Api.VirtualClass<any> | undefined)[];
        type ForbiddenResponses =
          ForbiddenTypes
          | (AnyLiteral & { [k: string]: ForbiddenTypes });

        // Unwrap all chained promises
        const response = await promise;
        // Make sure responses do not include `VirtualClass` instances
        const allowedResponse: Exclude<typeof response, ForbiddenResponses> = response;
        // Suppress "unused variable" constraint
        void allowedResponse;
      } catch (err) {
        // Do noting
      }
    })();
  }

  return promise as MethodResponse<T>;
}

export function cancelApiProgress(progressCallback: ApiOnProgress) {
  progressCallback.isCanceled = true;

  const { messageId } = requestStatesByCallback.get(progressCallback) || {};
  if (!messageId) {
    return;
  }

  worker.postMessage({
    type: 'cancelProgress',
    messageId,
  });
}

function subscribeToWorker(onUpdate: OnApiUpdate) {
  worker.addEventListener('message', ({ data }: WorkerMessageEvent) => {
    if (data.type === 'update') {
      onUpdate(data.update);
    } else if (data.type === 'methodResponse') {
      const requestState = requestStates.get(data.messageId);
      if (requestState) {
        if (data.error) {
          requestState.reject(data.error);
        } else {
          requestState.resolve(data.response);
        }
      }
    } else if (data.type === 'methodCallback') {
      requestStates.get(data.messageId)?.callback?.(...data.callbackArgs);
    } else if (data.type === 'unhandledError') {
      throw new Error(data.error?.message);
    }
  });
}

function makeRequest(message: OriginRequest) {
  const messageId = generateIdFor(requestStates);
  const payload: OriginRequest = {
    messageId,
    ...message,
  };

  const requestState = { messageId } as RequestStates;

  // Re-wrap type because of `postMessage`
  const promise: Promise<MethodResponse<keyof Methods>> = new Promise((resolve, reject) => {
    Object.assign(requestState, { resolve, reject });
  });

  if (('args' in payload) && typeof payload.args[1] === 'function') {
    const callback = payload.args.pop() as AnyToVoidFunction;
    requestState.callback = callback;
    requestStatesByCallback.set(callback, requestState);
  }

  requestStates.set(messageId, requestState);

  promise
    .catch(() => undefined)
    .finally(() => {
      requestStates.delete(messageId);

      if (requestState.callback) {
        requestStatesByCallback.delete(requestState.callback);
      }
    });

  worker.postMessage(payload);

  return promise;
}

const startedAt = Date.now();

// Workaround for iOS sometimes stops interacting with worker
function setupIosHealthCheck() {
  window.addEventListener('focus', () => {
    void ensureWorkerPing();
    // Sometimes a single check is not enough
    setTimeout(() => ensureWorkerPing(), 1000);
  });
}

async function ensureWorkerPing() {
  try {
    await Promise.race([
      makeRequest({ type: 'ping' }),
      pause(HEALTH_CHECK_TIMEOUT).then(() => Promise.reject(new Error('HEALTH_CHECK_TIMEOUT'))),
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    if (Date.now() - startedAt >= HEALTH_CHECK_MIN_DELAY) {
      window.location.reload();
    }
  }
}
