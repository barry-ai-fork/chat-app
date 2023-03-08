import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { BuddyImportContactsRes_Type } from './types';

export default class BuddyImportContactsRes extends BaseMsg {
  constructor(msg?: BuddyImportContactsRes_Type) {
    super('PTP.Buddy.BuddyImportContactsRes', msg);
  }
  getMsg(): BuddyImportContactsRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyImportContactsRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyImportContactsRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
