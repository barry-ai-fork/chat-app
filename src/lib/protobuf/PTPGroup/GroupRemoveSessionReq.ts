import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupRemoveSessionReq_Type } from './types';

export default class GroupRemoveSessionReq extends BaseMsg {
  constructor(msg?: GroupRemoveSessionReq_Type) {
    super('PTP.Group.GroupRemoveSessionReq', msg);
    this.setCommandId(ActionCommands.CID_GroupRemoveSessionReq);
  }
  getMsg(): GroupRemoveSessionReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupRemoveSessionReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupRemoveSessionReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
