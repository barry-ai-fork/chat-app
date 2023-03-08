import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupChangeMemberNotify_Type } from './types';

export default class GroupChangeMemberNotify extends BaseMsg {
  constructor(msg?: GroupChangeMemberNotify_Type) {
    super('PTP.Group.GroupChangeMemberNotify', msg);
    this.setCommandId(ActionCommands.CID_GroupChangeMemberNotify);
  }
  getMsg(): GroupChangeMemberNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupChangeMemberNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupChangeMemberNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
