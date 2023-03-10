import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { AuthCaptchaRes_Type } from './types';

export default class AuthCaptchaRes extends BaseMsg {
  constructor(msg?: AuthCaptchaRes_Type) {
    super('PTP.Auth.AuthCaptchaRes', msg);
  }
  getMsg(): AuthCaptchaRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): AuthCaptchaRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new AuthCaptchaRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
