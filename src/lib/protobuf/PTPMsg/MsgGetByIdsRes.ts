import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { MsgGetByIdsRes_Type } from './types';

export default class MsgGetByIdsRes extends BaseMsg {
  constructor(msg?: MsgGetByIdsRes_Type) {
    super('PTP.Msg.MsgGetByIdsRes', msg);
  }
  getMsg(): MsgGetByIdsRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgGetByIdsRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgGetByIdsRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
