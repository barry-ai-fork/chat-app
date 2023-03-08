// eslint-disable-next-line import/no-cycle
import AuthUser from '../models/AuthUser';
// eslint-disable-next-line import/no-named-as-default,import/no-cycle
import ImUser from '../models/ImUser';
// eslint-disable-next-line import/no-named-as-default,import/no-cycle
import ImGroup from '../models/ImGroup';
// eslint-disable-next-line import/no-named-as-default,import/no-cycle
import ImMessage from '../models/ImMessage';
// eslint-disable-next-line import/no-named-as-default,import/no-cycle
import ImFriends from '../models/ImFriends';
import { getImWsUrl, ImMsgReply, ImRequest } from '../bootstrap';

// eslint-disable-next-line no-null/no-null
let currentWs = null;
export default class ImWebSocket {
  constructor() {
    // eslint-disable-next-line no-null/no-null
    this.imWs = null;
    this.initWhenClose = false;
    this.wsUrl = getImWsUrl();
    this.init();
  }

  init() {
    try {
      if (this.imWs) {
        this.initWhenClose = true;
        this.closeWs();
      }
      const imWs = new WebSocket(this.wsUrl);
      imWs.onopen = this.onOpen.bind(this);
      imWs.onmessage = this.onMessage.bind(this);
      imWs.onclose = this.onClose.bind(this);
      imWs.onerror = this.onError.bind(this);
      this.imWs = imWs;
      currentWs = this;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('init error', e);
    }
  }

  onOpen() {
    // eslint-disable-next-line no-console
    console.log('im ws onOpen');
    this.login();
  }

  onMessage(e) {
    const reply = new ImMsgReply({ ...JSON.parse(e.data) });
    // eslint-disable-next-line no-console
    console.log(reply);
    switch (reply.model) {
      case 'ImUser':
        ImUser.handleMsgReplay(reply);
        break;
      case 'ImGroup':
        ImGroup.handleMsgReplay(reply);
        break;
      case 'ImFriends':
        ImFriends.handleMsgReplay(reply);
        break;
      case 'ImMessage':
        ImMessage.handleMsgReplay(reply);
        break;
      default:
        break;
    }
  }

  onClose() {
    // eslint-disable-next-line no-console
    console.log('im ws onClose');
    // eslint-disable-next-line no-null/no-null
    this.imWs = null;
    if (this.initWhenClose) {
      this.initWhenClose = false;
      this.init();
    }
  }

  onError() {
    console.log('im ws onError');
  }

  send(jsonString) {
    if (this.imWs) {
      this.imWs.send(jsonString);
    } else {
      // eslint-disable-next-line no-console
      console.error('imWs is null');
    }
  }

  sendImRequest(request) {
    this.send(new ImRequest({
      ...request,
    }).toString());
  }

  sendAction(action, body, ...request) {
    this.sendImRequest(new ImRequest({
      action,
      body,
      ...request,
    }));
  }

  login() {
    this.sendAction('login', {
      access_token: AuthUser.getAccessToken(),
    });
  }

  closeWs() {
    this.imWs.close();
  }

  reconnect() {
    if (this.imWs) {
      this.initWhenClose = true;
    }
    this.imWs.close();
  }

  static getCurrentWs() {
    return currentWs;
  }
}
