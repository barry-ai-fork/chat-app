import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyStatNotify_Type } from './types';

export default class BuddyStatNotify extends BaseMsg {
  constructor(msg?: BuddyStatNotify_Type) {
    super('PTP.Buddy.BuddyStatNotify', msg);
    this.setCommandId(ActionCommands.CID_BuddyStatNotify);
  }
  getMsg(): BuddyStatNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyStatNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyStatNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
