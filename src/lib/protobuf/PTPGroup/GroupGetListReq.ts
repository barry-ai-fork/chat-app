import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupGetListReq_Type } from './types';
import AccountController from "../../client/AccountController";
import MsgConn from "../../client/MsgConn";

export default class GroupGetListReq extends BaseMsg {
  constructor(msg?: GroupGetListReq_Type) {
    super('PTP.Group.GroupGetListReq', msg);
    this.setCommandId(ActionCommands.CID_GroupGetListReq);
  }
  getMsg(): GroupGetListReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupGetListReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }

  static parseMsg(pdu : Pdu) {
    return new GroupGetListReq().decode(pdu.getPbBody());
  }

  static async run(accountId : number) {
    const group_info_updated_time =
      AccountController.getInstance(accountId)!.getGroupInfoUpdatedTime();
    return MsgConn.getInstance(accountId).SendPduWithCallback(
      new GroupGetListReq({
        group_info_updated_time,
      }).pack()
    );
  }
}
