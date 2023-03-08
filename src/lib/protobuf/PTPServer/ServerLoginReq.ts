import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { ServerLoginReq_Type } from './types';

export default class ServerLoginReq extends BaseMsg {
  constructor(msg?: ServerLoginReq_Type) {
    super('PTP.Server.ServerLoginReq', msg);
    this.setCommandId(ActionCommands.CID_ServerLoginReq);
  }
  getMsg(): ServerLoginReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): ServerLoginReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new ServerLoginReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
