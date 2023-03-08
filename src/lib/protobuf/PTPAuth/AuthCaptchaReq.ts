import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { AuthCaptchaReq_Type } from './types';

export default class AuthCaptchaReq extends BaseMsg {
  constructor(msg?: AuthCaptchaReq_Type) {
    super('PTP.Auth.AuthCaptchaReq', msg);
    this.setCommandId(ActionCommands.CID_AuthCaptchaReq);
  }
  getMsg(): AuthCaptchaReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): AuthCaptchaReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new AuthCaptchaReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
