import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyModifyUpdatePair_Type } from './types';

export default class BuddyModifyUpdatePair extends BaseMsg {
  constructor(msg?: BuddyModifyUpdatePair_Type) {
    super('PTP.Buddy.BuddyModifyUpdatePair', msg);
    this.setCommandId(ActionCommands.CID_BuddyModifyUpdatePair);
  }
  getMsg(): BuddyModifyUpdatePair_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyModifyUpdatePair_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyModifyUpdatePair().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
