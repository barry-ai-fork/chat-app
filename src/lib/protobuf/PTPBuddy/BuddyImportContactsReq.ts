import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyImportContactsReq_Type } from './types';

export default class BuddyImportContactsReq extends BaseMsg {
  constructor(msg?: BuddyImportContactsReq_Type) {
    super('PTP.Buddy.BuddyImportContactsReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyImportContactsReq);
  }
  getMsg(): BuddyImportContactsReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyImportContactsReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyImportContactsReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
