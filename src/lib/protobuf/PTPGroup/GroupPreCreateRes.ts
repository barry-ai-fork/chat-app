import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { GroupPreCreateRes_Type } from './types';

export default class GroupPreCreateRes extends BaseMsg {
  constructor(msg?: GroupPreCreateRes_Type) {
    super('PTP.Group.GroupPreCreateRes', msg);
  }
  getMsg(): GroupPreCreateRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupPreCreateRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupPreCreateRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
