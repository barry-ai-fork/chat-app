import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { SwitchPtpNotify_Type } from './types';

export default class SwitchPtpNotify extends BaseMsg {
  constructor(msg?: SwitchPtpNotify_Type) {
    super('PTP.Switch.SwitchPtpNotify', msg);
    this.setCommandId(ActionCommands.CID_SwitchPtpNotify);
  }
  getMsg(): SwitchPtpNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): SwitchPtpNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new SwitchPtpNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
