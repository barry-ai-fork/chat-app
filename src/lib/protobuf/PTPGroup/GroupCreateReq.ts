import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupCreateReq_Type } from './types';

export default class GroupCreateReq extends BaseMsg {
  constructor(msg?: GroupCreateReq_Type) {
    super('PTP.Group.GroupCreateReq', msg);
    this.setCommandId(ActionCommands.CID_GroupCreateReq);
  }
  getMsg(): GroupCreateReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupCreateReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupCreateReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
