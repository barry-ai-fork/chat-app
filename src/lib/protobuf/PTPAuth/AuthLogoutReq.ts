import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { AuthLogoutReq_Type } from './types';

export default class AuthLogoutReq extends BaseMsg {
  constructor(msg?: AuthLogoutReq_Type) {
    super('PTP.Auth.AuthLogoutReq', msg);
    this.setCommandId(ActionCommands.CID_AuthLogoutReq);
  }
  getMsg(): AuthLogoutReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): AuthLogoutReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new AuthLogoutReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
