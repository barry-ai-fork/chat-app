import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { MsgGetByIdsReq_Type } from './types';

export default class MsgGetByIdsReq extends BaseMsg {
  constructor(msg?: MsgGetByIdsReq_Type) {
    super('PTP.Msg.MsgGetByIdsReq', msg);
    this.setCommandId(ActionCommands.CID_MsgGetByIdsReq);
  }
  getMsg(): MsgGetByIdsReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgGetByIdsReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgGetByIdsReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
