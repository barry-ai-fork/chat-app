import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { FileImgUploadRes_Type } from './types';

export default class FileImgUploadRes extends BaseMsg {
  constructor(msg?: FileImgUploadRes_Type) {
    super('PTP.File.FileImgUploadRes', msg);
  }
  getMsg(): FileImgUploadRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): FileImgUploadRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new FileImgUploadRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
