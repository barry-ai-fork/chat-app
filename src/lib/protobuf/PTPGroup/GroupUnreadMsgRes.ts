import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { GroupUnreadMsgRes_Type } from './types';

export default class GroupUnreadMsgRes extends BaseMsg {
  constructor(msg?: GroupUnreadMsgRes_Type) {
    super('PTP.Group.GroupUnreadMsgRes', msg);
  }
  getMsg(): GroupUnreadMsgRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupUnreadMsgRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupUnreadMsgRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
