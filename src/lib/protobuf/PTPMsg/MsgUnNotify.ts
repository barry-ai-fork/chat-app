import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgUnNotify_Type } from './types';

export default class MsgUnNotify extends BaseMsg {
  constructor(msg?: MsgUnNotify_Type) {
    super('PTP.Msg.MsgUnNotify', msg);
    this.setCommandId(ActionCommands.CID_MsgUnNotify);
  }
  getMsg(): MsgUnNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgUnNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgUnNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
