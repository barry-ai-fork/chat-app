import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { HeartBeatNotify_Type } from './types';

export default class HeartBeatNotify extends BaseMsg {
  constructor(msg?: HeartBeatNotify_Type) {
    super('PTP.Other.HeartBeatNotify', msg);
    this.setCommandId(ActionCommands.CID_HeartBeatNotify);
  }
  getMsg(): HeartBeatNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): HeartBeatNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new HeartBeatNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
