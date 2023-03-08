import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgReadNotify_Type } from './types';

export default class MsgReadNotify extends BaseMsg {
  constructor(msg?: MsgReadNotify_Type) {
    super('PTP.Msg.MsgReadNotify', msg);
    this.setCommandId(ActionCommands.CID_MsgReadNotify);
  }
  getMsg(): MsgReadNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgReadNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgReadNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
