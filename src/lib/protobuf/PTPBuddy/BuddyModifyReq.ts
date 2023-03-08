import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyModifyReq_Type } from './types';

export default class BuddyModifyReq extends BaseMsg {
  constructor(msg?: BuddyModifyReq_Type) {
    super('PTP.Buddy.BuddyModifyReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyModifyReq);
  }
  getMsg(): BuddyModifyReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyModifyReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyModifyReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
