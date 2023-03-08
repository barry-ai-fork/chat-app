import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { MsgRes_Type } from './types';

export default class MsgRes extends BaseMsg {
  constructor(msg?: MsgRes_Type) {
    super('PTP.Msg.MsgRes', msg);
  }
  getMsg(): MsgRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
