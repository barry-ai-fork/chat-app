import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';
import type { FileImgDownloadRes_Type } from './types';

export default class FileImgDownloadRes extends BaseMsg {
  constructor(msg?: FileImgDownloadRes_Type) {
    super('PTP.File.FileImgDownloadRes', msg);
  }
  getMsg(): FileImgDownloadRes_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): FileImgDownloadRes_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new FileImgDownloadRes().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
