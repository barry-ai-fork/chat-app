import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupModifyNotify_Type } from './types';

export default class GroupModifyNotify extends BaseMsg {
  constructor(msg?: GroupModifyNotify_Type) {
    super('PTP.Group.GroupModifyNotify', msg);
    this.setCommandId(ActionCommands.CID_GroupModifyNotify);
  }
  getMsg(): GroupModifyNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupModifyNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupModifyNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
