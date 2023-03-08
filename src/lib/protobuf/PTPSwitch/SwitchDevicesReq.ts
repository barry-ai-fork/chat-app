import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { SwitchDevicesReq_Type } from './types';

export default class SwitchDevicesReq extends BaseMsg {
  constructor(msg?: SwitchDevicesReq_Type) {
    super('PTP.Switch.SwitchDevicesReq', msg);
    this.setCommandId(ActionCommands.CID_SwitchDevicesReq);
  }
  getMsg(): SwitchDevicesReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): SwitchDevicesReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new SwitchDevicesReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
