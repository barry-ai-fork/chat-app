// DO NOT EDIT
import BaseMsg from '../BaseMsg';
import type { Pdu } from '../Pdu';

export enum BuddyModifyAction {
  BuddyModifyAction_nickname = 1,
  BuddyModifyAction_avatar = 2,
  BuddyModifyAction_sign_info = 3,
  BuddyModifyAction_user_name = 4,
  BuddyModifyAction_first_name = 5,
  BuddyModifyAction_last_name = 6,
}

export enum ClientType {
  CLIENT_TYPE_WEB = 1,
  CLIENT_TYPE_PC = 2,
  CLIENT_TYPE_MAC = 3,
  CLIENT_TYPE_IOS = 17,
  CLIENT_TYPE_ANDROID = 18,
}

export enum ERR {
  NO_ERROR = 0,
  E_SYSTEM = 1,
  E_GROUP_CREATE_PAIR_GROUP_MEMBER_SIE_INVALID = 2,
  E_GROUP_CREATE_PAIR_GROUP_NO_REG_USER = 3,
  E_GROUP_HAS_CREATED = 4,
  E_REASON_NO_ROUTE_SERVER = 5,
  E_REASON_NO_LOGIN_SERVER = 6,
  E_REASON_NO_DB_SERVER = 7,
  E_LOGIN_ERROR = 8,
  E_PB_PARSE_ERROR = 9,
  E_SWITCH_USER_NO_ONLINE = 10,
  E_USERNAME_EXISTS = 11,
  E_USERNAME_INVALID = 12,
  E_CLIENT = 1003,
  E_CLIENT_TIMEOUT = 1004,
  E_SERVER_NOT_FOUND = 404,
}

export enum GroupMemberModifyAction {
  GroupMemberModifyAction_DEL = 1,
  GroupMemberModifyAction_ADD = 2,
}

export enum GroupMemberStatus {
  GROUP_MEMBER_STATUS_NORMAL = 1,
}

export enum GroupModifyAction {
  GroupModifyAction_name = 1,
  GroupModifyAction_avatar = 2,
}

export enum GroupType {
  GROUP_TYPE_PAIR = 1,
  GROUP_TYPE_MULTI = 2,
}

export enum MsgType {
  MSG_TYPE_TEXT = 1,
  MSG_TYPE_AUDIO = 2,
}

export enum SessionStat {
  SESSION_STAT_OK = 0,
  SESSION_STAT_DELETE = 1,
}

export enum ShieldStatus {
  SHIELD_STATUS_OK = 0,
  SHIELD_STATUS_DELETE = 1,
}

export enum SwitchType {
  SwitchType_Apply = 1,
  SwitchType_Offer = 2,
  SwitchType_Answer = 3,
  SwitchType_Candidate = 4,
  SwitchType_Ready = 5,
  SwitchType_Bye = 6,
}

export enum UserStat {
  USER_STAT_ONLINE = 1,
  USER_STAT_OFFLINE = 2,
  USER_STAT_LEAVE = 3,
}

export interface BuddyQueryParam_Type {
  addressList?: string[];
  usernameList?: string[];
}

export class BuddyQueryParam extends BaseMsg {
  constructor(msg?: BuddyQueryParam_Type) {
    super('PTP.Common.BuddyQueryParam', msg);
  }
  getMsg(): BuddyQueryParam_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): BuddyQueryParam_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new BuddyQueryParam().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface DevicesInfo_Type {
  client_type: ClientType;
  client_version: string;
  login_time: number;
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  is_intel: boolean;
  uid: number;
  client_id: string;
}

export class DevicesInfo extends BaseMsg {
  constructor(msg?: DevicesInfo_Type) {
    super('PTP.Common.DevicesInfo', msg);
  }
  getMsg(): DevicesInfo_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): DevicesInfo_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new DevicesInfo().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface GroupInfo_Type {
  group_adr: string;
  name: string;
  avatar: string;
  owner_uid: number;
  pair_uid?: number;
  group_type: GroupType;
  group_idx: number;
  created_time: number;
  group_id: number;
}

export class GroupInfo extends BaseMsg {
  constructor(msg?: GroupInfo_Type) {
    super('PTP.Common.GroupInfo', msg);
  }
  getMsg(): GroupInfo_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupInfo_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupInfo().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface GroupMember_Type {
  uid: number;
  member_status: GroupMemberStatus;
}

export class GroupMember extends BaseMsg {
  constructor(msg?: GroupMember_Type) {
    super('PTP.Common.GroupMember', msg);
  }
  getMsg(): GroupMember_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupMember_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupMember().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface GroupRecord_Type {
  name: string;
  avatar: string;
  group_adr: string;
  group_type: GroupType;
  pair_uid?: number;
  owner_uid?: number;
  group_id: number;
  unReadCnt: number;
  lastMsgId?: number;
  msgUpTime: number;
  memberUpTime: number;
}

export class GroupRecord extends BaseMsg {
  constructor(msg?: GroupRecord_Type) {
    super('PTP.Common.GroupRecord', msg);
  }
  getMsg(): GroupRecord_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): GroupRecord_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new GroupRecord().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface InputPhoneContact_Type {
  client_id: number;
  phone?: string;
  first_name?: string;
  last_name?: string;
}

export class InputPhoneContact extends BaseMsg {
  constructor(msg?: InputPhoneContact_Type) {
    super('PTP.Common.InputPhoneContact', msg);
  }
  getMsg(): InputPhoneContact_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): InputPhoneContact_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new InputPhoneContact().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface IpAddress_Type {
  ip: string;
  port: number;
}

export class IpAddress extends BaseMsg {
  constructor(msg?: IpAddress_Type) {
    super('PTP.Common.IpAddress', msg);
  }
  getMsg(): IpAddress_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): IpAddress_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new IpAddress().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface MsgInfo_Type {
  group_id: number;
  from_uid: number;
  sent_at: number;
  msg_id: number;
  msg_type: MsgType;
  msg_data: string;
}

export class MsgInfo extends BaseMsg {
  constructor(msg?: MsgInfo_Type) {
    super('PTP.Common.MsgInfo', msg);
  }
  getMsg(): MsgInfo_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgInfo_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgInfo().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface MsgInfoList_Type {
  msg_id: number;
  from_uid: number;
  group_id?: number;
  sent_at: number;
  msg_type: MsgType;
  msg_data: string;
}

export class MsgInfoList extends BaseMsg {
  constructor(msg?: MsgInfoList_Type) {
    super('PTP.Common.MsgInfoList', msg);
  }
  getMsg(): MsgInfoList_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): MsgInfoList_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new MsgInfoList().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface UserInfo_Type {
  address: string;
  pub_key: Buffer;
  avatar: string;
  status: number;
  user_name?: string;
  nick_name?: string;
  sign_info?: string;
  uid: number;
  first_name?: string;
  last_name?: string;
  login_time?: number;
  is_online?: boolean;
}

export class UserInfo extends BaseMsg {
  constructor(msg?: UserInfo_Type) {
    super('PTP.Common.UserInfo', msg);
  }
  getMsg(): UserInfo_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): UserInfo_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new UserInfo().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
export interface UserStatInfo_Type {
  uid: number;
  status: UserStat;
}

export class UserStatInfo extends BaseMsg {
  constructor(msg?: UserStatInfo_Type) {
    super('PTP.Common.UserStatInfo', msg);
  }
  getMsg(): UserStatInfo_Type {
    return this.__getMsg();
  }
  decode(data: Uint8Array): UserStatInfo_Type {
    return this.__D(data);
  }
  pack(): Pdu {
    return this.__pack();
  }
  
  static parseMsg(pdu : Pdu) {
    return new UserStatInfo().decode(pdu.getPbBody());
  }
  
  static async run(accountId : number) {}
}
