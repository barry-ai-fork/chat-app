import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupModifyReq_Type } from './types';

export default class GroupModifyReq extends BaseMsg {
  constructor(msg?: GroupModifyReq_Type) {
    super('PTP.Group.GroupModifyReq', msg);
    this.setCommandId(ActionCommands.CID_GroupModifyReq);
  }
  getMsg(): GroupModifyReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupModifyReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupModifyReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
