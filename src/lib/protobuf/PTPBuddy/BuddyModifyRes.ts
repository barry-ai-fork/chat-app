import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { BuddyModifyRes_Type } from './types';

export default class BuddyModifyRes extends BaseMsg {
  constructor(msg?: BuddyModifyRes_Type) {
    super('PTP.Buddy.BuddyModifyRes', msg);
  }
  getMsg(): BuddyModifyRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyModifyRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyModifyRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
