import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupRemoveSessionNotify_Type } from './types';

export default class GroupRemoveSessionNotify extends BaseMsg {
  constructor(msg?: GroupRemoveSessionNotify_Type) {
    super('PTP.Group.GroupRemoveSessionNotify', msg);
    this.setCommandId(ActionCommands.CID_GroupRemoveSessionNotify);
  }
  getMsg(): GroupRemoveSessionNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupRemoveSessionNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupRemoveSessionNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
