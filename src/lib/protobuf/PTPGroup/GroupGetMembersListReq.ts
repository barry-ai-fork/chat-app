import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupGetMembersListReq_Type } from './types';

export default class GroupGetMembersListReq extends BaseMsg {
  constructor(msg?: GroupGetMembersListReq_Type) {
    super('PTP.Group.GroupGetMembersListReq', msg);
    this.setCommandId(ActionCommands.CID_GroupGetMembersListReq);
  }
  getMsg(): GroupGetMembersListReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupGetMembersListReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupGetMembersListReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
