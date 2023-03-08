import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { BuddyGetALLReq_Type } from './types';
import AccountController from "../../client/AccountController";
import MsgConn from "../../client/MsgConn";

export default class BuddyGetALLReq extends BaseMsg {
  static running = false;
  constructor(msg?: BuddyGetALLReq_Type) {
    super('PTP.Buddy.BuddyGetALLReq', msg);
    this.setCommandId(ActionCommands.CID_BuddyGetALLReq);
  }
  getMsg(): BuddyGetALLReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyGetALLReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }

  static parseMsg(pdu : Pdu) {
    return new BuddyGetALLReq().decode(pdu.getPbBody());
  }

  static async run(accountId : number) {
    if (!BuddyGetALLReq.running) {
      BuddyGetALLReq.running = true;
      const group_members_updated_time =
        AccountController.getInstance(accountId).getBuddyUpdatedTime();
      return MsgConn.getInstance(accountId)?.SendPduWithCallback(
        new BuddyGetALLReq({
          buddy_updated_time: group_members_updated_time,
        }).pack()
      );
    } else {
      return null;
    }
  }
}
