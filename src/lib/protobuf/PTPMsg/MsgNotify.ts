import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgNotify_Type } from './types';

export default class MsgNotify extends BaseMsg {
  constructor(msg?: MsgNotify_Type) {
    super('PTP.Msg.MsgNotify', msg);
    this.setCommandId(ActionCommands.CID_MsgNotify);
  }
  getMsg(): MsgNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
