import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyModifyNotify_Type } from './types';

export default class BuddyModifyNotify extends BaseMsg {
  constructor(msg?: BuddyModifyNotify_Type) {
    super('PTP.Buddy.BuddyModifyNotify', msg);
    this.setCommandId(ActionCommands.CID_BuddyModifyNotify);
  }
  getMsg(): BuddyModifyNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyModifyNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyModifyNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
