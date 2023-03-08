import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyGetStatReq_Type } from './types';

export default class BuddyGetStatReq extends BaseMsg {
  constructor(msg?: BuddyGetStatReq_Type) {
    super('PTP.Buddy.BuddyGetStatReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyGetStatReq);
  }
  getMsg(): BuddyGetStatReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyGetStatReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyGetStatReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
