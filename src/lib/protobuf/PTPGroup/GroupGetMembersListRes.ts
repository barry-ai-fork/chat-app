import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { GroupGetMembersListRes_Type } from './types';

export default class GroupGetMembersListRes extends BaseMsg {
  constructor(msg?: GroupGetMembersListRes_Type) {
    super('PTP.Group.GroupGetMembersListRes', msg);
  }
  getMsg(): GroupGetMembersListRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupGetMembersListRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupGetMembersListRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
