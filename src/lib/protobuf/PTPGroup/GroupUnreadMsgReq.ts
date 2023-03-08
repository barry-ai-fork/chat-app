import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupUnreadMsgReq_Type } from './types';
import MsgConn from "../../client/MsgConn";

export default class GroupUnreadMsgReq extends BaseMsg {
  constructor(msg?: GroupUnreadMsgReq_Type) {
    super('PTP.Group.GroupUnreadMsgReq', msg);
    this.setCommandId(ActionCommands.CID_GroupUnreadMsgReq);
  }
  getMsg(): GroupUnreadMsgReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupUnreadMsgReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }

  static parseMsg(pdu : Pdu) {
    return new GroupUnreadMsgReq().decode(pdu.getPbBody());
  }

  static async run(accountId : number) {
    return MsgConn.getInstance(accountId).SendPduWithCallback(
      new GroupUnreadMsgReq({}).pack()
    );
  }
}
