import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { CaptchaReq_Type } from './types';

export default class CaptchaReq extends BaseMsg {
  constructor(msg?: CaptchaReq_Type) {
    super('PTP.Other.CaptchaReq', msg);
    this.setCommandId(ActionCommands.CID_CaptchaReq);
  }
  getMsg(): CaptchaReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): CaptchaReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new CaptchaReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
