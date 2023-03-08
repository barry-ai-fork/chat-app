import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgReadAckReq_Type } from './types';

export default class MsgReadAckReq extends BaseMsg {
  constructor(msg?: MsgReadAckReq_Type) {
    super('PTP.Msg.MsgReadAckReq', msg);
    this.setCommandId(ActionCommands.CID_MsgReadAckReq);
  }
  getMsg(): MsgReadAckReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgReadAckReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgReadAckReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
