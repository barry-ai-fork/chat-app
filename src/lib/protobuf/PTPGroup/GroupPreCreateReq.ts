import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { GroupPreCreateReq_Type } from './types';

export default class GroupPreCreateReq extends BaseMsg {
  constructor(msg?: GroupPreCreateReq_Type) {
    super('PTP.Group.GroupPreCreateReq', msg);
    this.setCommandId(ActionCommands.CID_GroupPreCreateReq);
  }
  getMsg(): GroupPreCreateReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupPreCreateReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupPreCreateReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
