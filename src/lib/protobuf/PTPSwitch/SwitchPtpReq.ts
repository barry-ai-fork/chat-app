import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { SwitchPtpReq_Type } from './types';

export default class SwitchPtpReq extends BaseMsg {
  constructor(msg?: SwitchPtpReq_Type) {
    super('PTP.Switch.SwitchPtpReq', msg);
    this.setCommandId(ActionCommands.CID_SwitchPtpReq);
  }
  getMsg(): SwitchPtpReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): SwitchPtpReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new SwitchPtpReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
