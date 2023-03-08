import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyGetListReq_Type } from './types';

export default class BuddyGetListReq extends BaseMsg {
  constructor(msg?: BuddyGetListReq_Type) {
    super('PTP.Buddy.BuddyGetListReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyGetListReq);
  }
  getMsg(): BuddyGetListReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyGetListReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyGetListReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
