import {describe, expect} from '@jest/globals';
import AccountController from "../src/lib/client/AccountController";
import {GroupGetListRes} from "../src/lib/protobuf/PTPGroup";
import {ERR, GroupInfo, GroupInfo_Type, GroupType} from "../src/lib/protobuf/PTPCommon";
import MsgConn, {MsgClientState, MsgConnNotify} from "../src/lib/client/MsgConn";


describe('MsgConn', () => {
  it('upload', async () => {

    const blob = new Blob(["sssss"]);
    const file = new File([blob], 'values.img', {
      type: 'image/jpg',
    });

    function readFile(file) {
      return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader()

        // Register event listeners
        reader.addEventListener("loadend", e => resolve(e.target.result))
        reader.addEventListener("error", reject)

        // Read file
        reader.readAsBinaryString(file)
      })
    }
    var fileBuffer = await readFile(file)
    await MsgConn.uploadFile()
    expect(1).toEqual(1);
  });
});
