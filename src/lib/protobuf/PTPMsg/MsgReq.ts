import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgReq_Type } from './types';

export default class MsgReq extends BaseMsg {
  constructor(msg?: MsgReq_Type) {
    super('PTP.Msg.MsgReq', msg);
    this.setCommandId(ActionCommands.CID_MsgReq);
  }
  getMsg(): MsgReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
