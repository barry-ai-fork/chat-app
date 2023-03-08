import config from '../config';
import DateHelper from '../helpers/DateHelper';
import { MiniTicker } from './BaApi';
import { getActions, getGlobal } from '../global';

// eslint-disable-next-line no-null/no-null
let currentInstance = null;
const getCurrentTimeStamp = DateHelper.currentTimestamp;
let SUBSCRIBED_STREAMS = [];

class BaWebSocket {
  constructor({ onReady }) {
    this.retrySend = 0;
    this.retrySendMax = 20;
    this.api = config.blockChain.biAnWsApi;
    // eslint-disable-next-line no-null/no-null
    this.ws = null;
    if (onReady) {
      this.onReady = onReady;
    }
    this.init();
  }

  init() {
    if (currentInstance) {
      return;
    }
    try {
      const ws = new WebSocket(`${this.api}/stream`);
      ws.onopen = this.onOpen.bind(this);
      ws.onmessage = this.onMessage.bind(this);
      ws.onclose = this.onClose.bind(this);
      ws.onerror = this.onError.bind(this);
      this.ws = ws;
      currentInstance = this;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    // eslint-disable-next-line no-console
    console.log('ws close');
  }

  reconnect() {
    if (this.ws) {
      this.close();
    } else {
      // eslint-disable-next-line no-null/no-null
      currentInstance = null;
      this.init();
    }
  }

  onOpen() {
    // eslint-disable-next-line no-console
    console.log('ws onOpen');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.onReady && this.onReady(this);
  }

  onMessage({ data }) {
    data = JSON.parse(data);
    // console.log("ws onMessage", data)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // this.onMsg && this.onMsg(data);
    BaWebSocket.handleStreamMsg(data);
  }

  onClose(e) {
    // eslint-disable-next-line no-null/no-null
    this.ws = null;
    // eslint-disable-next-line no-null/no-null
    currentInstance = null;
    // eslint-disable-next-line no-console
    console.log('ws onClose', e);
    this.init();
  }

  // eslint-disable-next-line class-methods-use-this
  onError(e) {
    // eslint-disable-next-line no-console
    console.log('ws onError', e);
  }

  isReady() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * @param dataJsonObj
   */
  sendData(dataJsonObj) {
    if (this.isReady()) {
      this.ws.send(JSON.stringify(dataJsonObj));
    } else {
      setTimeout(() => {
        if (this.retrySend < this.retrySendMax) {
          this.retrySend += 1;
          this.sendData(dataJsonObj);
        }
      }, 1000 * (this.retrySend % 5 + 1));
    }
  }

  subscribe(streams) {
    if (typeof streams === 'string') {
      streams = [streams];
    }
    const params = [];
    streams.forEach((stream) => {
      if (SUBSCRIBED_STREAMS.indexOf(stream) === -1) {
        SUBSCRIBED_STREAMS.push(stream);
        params.push(stream);
      }
    });
    if (params.length > 0) {
      this.sendData({
        method: 'SUBSCRIBE',
        params,
        id: getCurrentTimeStamp(),
      });
    }
  }

  unSubscribe(streams) {
    if (typeof streams === 'string') {
      streams = [streams];
    }
    const params = [];
    streams.forEach((stream) => {
      if (SUBSCRIBED_STREAMS.indexOf(stream) > -1) {
        params.push(stream);
      }
    });
    if (params.length > 0) {
      SUBSCRIBED_STREAMS = SUBSCRIBED_STREAMS.filter((stream) => params.indexOf(stream) > -1);
      this.sendData({
        method: 'UNSUBSCRIBE',
        params,
        id: getCurrentTimeStamp(),
      });
    }
  }

  listSubscribes() {
    this.sendData({
      method: 'LIST_SUBSCRIPTIONS',
      id: getCurrentTimeStamp(),
    });
  }

  static getChatIdBySymbol(symbol) {
    const { channels } = config.blockChain;
    for (let i = 0; i < Object.keys(channels).length; i++) {
      const chatId = Object.keys(channels)[i];
      if (channels[chatId].symbol === symbol) {
        return chatId;
      }
    }
    // eslint-disable-next-line no-null/no-null
    return null;
  }

  static handleMiniTicker(data) {
    const miniTicker = new MiniTicker({ ...data });
    const chatId = BaWebSocket.getChatIdBySymbol(miniTicker.symbol);
    if (chatId) {
      if (!window.coin) {
        window.coin = {};
      }
      window.coin[chatId] = miniTicker;
      const global = getGlobal();
      getActions().setGlobal({
        updateTimeControl: {
          ...global.updateTimeControl,
          coinMiniTickerUpdateTime: DateHelper.currentTimestamp(),
        },
      });
    }
  }

  static handleStreamMsg({
    data,
    stream,
  }) {
    const handlers = Object.keys(BaWebSocket.streamHandler);
    // eslint-disable-next-line no-console
    console.log('[BA_OnMsg]', stream, data);
    if (stream && stream.indexOf('miniTicker') > -1) {
      BaWebSocket.handleMiniTicker(data);
    }
    for (let i = 0; i < handlers.length; i++) {
      if (BaWebSocket.streamHandler[handlers[i]]) {
        BaWebSocket.streamHandler[handlers[i]]({
          data,
          stream,
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('handleStreamMsg', stream);
      }
    }
  }

  static regStreamHandler(id, handler) {
    if (handler) {
      if (!BaWebSocket.streamHandler[id]) {
        BaWebSocket.streamHandler[id] = handler;
      }
    } else {
      delete BaWebSocket.streamHandler[id];
    }
  }

  static getInstance() {
    return currentInstance;
  }
}

BaWebSocket.streamHandler = {};

export default BaWebSocket;
