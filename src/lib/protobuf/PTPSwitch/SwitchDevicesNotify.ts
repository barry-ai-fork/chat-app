import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { SwitchDevicesNotify_Type } from './types';

export default class SwitchDevicesNotify extends BaseMsg {
  constructor(msg?: SwitchDevicesNotify_Type) {
    super('PTP.Switch.SwitchDevicesNotify', msg);
    this.setCommandId(ActionCommands.CID_SwitchDevicesNotify);
  }
  getMsg(): SwitchDevicesNotify_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): SwitchDevicesNotify_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new SwitchDevicesNotify().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
