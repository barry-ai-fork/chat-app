import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { FileImgDownloadReq_Type } from './types';

export default class FileImgDownloadReq extends BaseMsg {
  constructor(msg?: FileImgDownloadReq_Type) {
    super('PTP.File.FileImgDownloadReq', msg);
    this.setCommandId(ActionCommands.CID_FileImgDownloadReq);
  }
  getMsg(): FileImgDownloadReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): FileImgDownloadReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new FileImgDownloadReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
