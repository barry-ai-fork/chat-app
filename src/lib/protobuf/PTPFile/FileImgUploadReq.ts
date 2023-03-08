import BaseMsg from '../BaseMsg';
import { ActionCommands } from '../ActionCommands';
import type { Pdu } from '../Pdu';
import type { FileImgUploadReq_Type } from './types';

export default class FileImgUploadReq extends BaseMsg {
  constructor(msg?: FileImgUploadReq_Type) {
    super('PTP.File.FileImgUploadReq', msg);
    this.setCommandId(ActionCommands.CID_FileImgUploadReq);
  }
  getMsg(): FileImgUploadReq_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): FileImgUploadReq_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new FileImgUploadReq().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
