import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyQueryListReq_Type } from './types';

export default class BuddyQueryListReq extends BaseMsg {
  constructor(msg?: BuddyQueryListReq_Type) {
    super('PTP.Buddy.BuddyQueryListReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyQueryListReq);
  }
  getMsg(): BuddyQueryListReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyQueryListReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyQueryListReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
