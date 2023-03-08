import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyModifyUpdatePairNotify_Type } from './types';

export default class BuddyModifyUpdatePairNotify extends BaseMsg {
  constructor(msg?: BuddyModifyUpdatePairNotify_Type) {
    super('PTP.Buddy.BuddyModifyUpdatePairNotify', msg);
    this.setCommandId(ActionCommands.CID_BuddyModifyUpdatePairNotify);
  }
  getMsg(): BuddyModifyUpdatePairNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyModifyUpdatePairNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  static handlePdu(pdu: Pdu) {
    const msg = new BuddyModifyUpdatePairNotify().decode(pdu.getPbBody());
    return msg;
  }
}
