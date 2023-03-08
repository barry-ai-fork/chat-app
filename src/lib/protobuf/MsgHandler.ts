import type { Pdu } from './Pdu';
import { ActionCommands,getActionCommandsName } from './ActionCommands'
import {
  AuthCaptchaRes,
  AuthLoginRes,
  AuthLogoutRes,
} from './PTPAuth';
import {
  BuddyGetALLRes,
  BuddyGetListRes,
  BuddyGetStatRes,
  BuddyImportContactsRes,
  BuddyModifyNotify,
  BuddyModifyRes,
  BuddyQueryListRes,
  BuddyStatNotify,
} from './PTPBuddy';
import {
  FileImgDownloadRes,
  FileImgUploadRes,
} from './PTPFile';
import {
  GroupChangeMemberNotify,
  GroupChangeMemberRes,
  GroupCreateRes,
  GroupGetListRes,
  GroupGetMembersListRes,
  GroupModifyNotify,
  GroupModifyRes,
  GroupPreCreateRes,
  GroupUnreadMsgRes,
} from './PTPGroup';
import {
  MsgGetByIdsRes,
  MsgNotify,
  MsgReadNotify,
  MsgRes,
} from './PTPMsg';
import {
  HeartBeatNotify,
} from './PTPOther';
import {
  ServerLoginRes,
} from './PTPServer';
import {
  SwitchDevicesNotify,
  SwitchPtpNotify,
  SwitchPtpRes,
} from './PTPSwitch';


const handlerMap:Record<number, any> = {
  [ActionCommands.CID_AuthCaptchaRes] : AuthCaptchaRes,
  [ActionCommands.CID_AuthLoginRes] : AuthLoginRes,
  [ActionCommands.CID_AuthLogoutRes] : AuthLogoutRes,
  [ActionCommands.CID_BuddyGetALLRes] : BuddyGetALLRes,
  [ActionCommands.CID_BuddyGetListRes] : BuddyGetListRes,
  [ActionCommands.CID_BuddyGetStatRes] : BuddyGetStatRes,
  [ActionCommands.CID_BuddyImportContactsRes] : BuddyImportContactsRes,
  [ActionCommands.CID_BuddyModifyNotify] : BuddyModifyNotify,
  [ActionCommands.CID_BuddyModifyRes] : BuddyModifyRes,
  [ActionCommands.CID_BuddyQueryListRes] : BuddyQueryListRes,
  [ActionCommands.CID_BuddyStatNotify] : BuddyStatNotify,
  [ActionCommands.CID_FileImgDownloadRes] : FileImgDownloadRes,
  [ActionCommands.CID_FileImgUploadRes] : FileImgUploadRes,
  [ActionCommands.CID_GroupChangeMemberNotify] : GroupChangeMemberNotify,
  [ActionCommands.CID_GroupChangeMemberRes] : GroupChangeMemberRes,
  [ActionCommands.CID_GroupCreateRes] : GroupCreateRes,
  [ActionCommands.CID_GroupGetListRes] : GroupGetListRes,
  [ActionCommands.CID_GroupGetMembersListRes] : GroupGetMembersListRes,
  [ActionCommands.CID_GroupModifyNotify] : GroupModifyNotify,
  [ActionCommands.CID_GroupModifyRes] : GroupModifyRes,
  [ActionCommands.CID_GroupPreCreateRes] : GroupPreCreateRes,
  [ActionCommands.CID_GroupUnreadMsgRes] : GroupUnreadMsgRes,
  [ActionCommands.CID_MsgGetByIdsRes] : MsgGetByIdsRes,
  [ActionCommands.CID_MsgNotify] : MsgNotify,
  [ActionCommands.CID_MsgReadNotify] : MsgReadNotify,
  [ActionCommands.CID_MsgRes] : MsgRes,
  [ActionCommands.CID_HeartBeatNotify] : HeartBeatNotify,
  [ActionCommands.CID_ServerLoginRes] : ServerLoginRes,
  [ActionCommands.CID_SwitchDevicesNotify] : SwitchDevicesNotify,
  [ActionCommands.CID_SwitchPtpNotify] : SwitchPtpNotify,
  [ActionCommands.CID_SwitchPtpRes] : SwitchPtpRes,

}
export class MsgHandler {
  static handlePdu(pdu: Pdu, accountId : number): any {
    const cid = getActionCommandsName(pdu.getCommandId());
    console.log(`parse: ${cid} => ${cid},aId:${accountId}`);
    if(handlerMap[pdu.getCommandId()]){
      return handlerMap[pdu.getCommandId()].parseMsg(pdu);
    }else{
      return null;
    }
  }
}
