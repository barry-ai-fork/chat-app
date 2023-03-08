import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupChangeMemberReq_Type } from './types';

export default class GroupChangeMemberReq extends BaseMsg {
  constructor(msg?: GroupChangeMemberReq_Type) {
    super('PTP.Group.GroupChangeMemberReq', msg);
    this.setCommandId(ActionCommands.CID_GroupChangeMemberReq);
  }
  getMsg(): GroupChangeMemberReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupChangeMemberReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupChangeMemberReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
