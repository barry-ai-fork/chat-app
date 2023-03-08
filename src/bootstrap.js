import {getActions, getGlobal, setGlobal} from "./global";
import {selectChat} from "./global/selectors";
import {setMessageBuilderCurrentUserId} from "./api/gramjs/apiBuilders/messages";
import {requestAccounts} from "./lib/block-chain/metamask";

let currentAccountAddress = null;
let currentUserId = null;
async function loginWithSign() {
  if(currentAccountAddress && isConnected){
    const auth = localStorage.getItem("__auth")
    let authObj;
    if(!auth || !JSON.parse(auth).access_token){
      const siteName  = "App"
      let msg = "Click to sign in and use "+siteName+".\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n$$account$$\n\nNonce:\n$$timestamp$$"
      msg = msg.replace("$$account$$",currentAccountAddress)
      msg = msg.replace("$$timestamp$$",String(+(new Date())))
      const msgHex = `0x${Buffer.from(msg, 'utf8').toString('hex')}`;
      const sig = await ethereum.request({
        method: 'personal_sign',
        params: [msgHex, currentAccountAddress],
      });
      const reply = await clientSendAction("loginWithSign", {sig,msg})
      setMessageBuilderCurrentUserId(reply.body.user.user_id)
      localStorage.setItem("__auth",JSON.stringify(reply.body))
      authObj = reply.body
    }else{
      authObj = JSON.parse(auth)
      setMessageBuilderCurrentUserId(authObj.user.user_id)
    }
    const reply = await clientSendAction("initApp",{
      access_token:authObj.access_token
    })
    if(reply.err === 401){
      setTimeout(()=>{
        delete authObj['access_token']
        localStorage.setItem("__auth",JSON.stringify(authObj))
        loginWithSign()
      },1000)
    }else{
      currentUserId = authObj.user.user_id;
    }
  }
}
export class ImMsgReply {
  constructor({
                err, err_msg, action, model, reply_id, request_id, body,
              }) {
    this.err = err;
    this.body = body;
    this.action = action;
    this.model = model;
    this.request_id = request_id;
    this.reply_id = reply_id;
    this.err_msg = err_msg;
  }
}


export class ImRequest {
  constructor({
                action, pk, model, body,
              }) {
    this.action = action;
    this.body = body;
    this.model = model;
    this.request_id = new Date().getTime();
    this.pk = pk;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export const client = new WebSocket("ws://localhost:8000/apiws");
let isConnected = false;
client.onopen = (e)=>{
  isConnected = true;
  setGlobal({
    ...getGlobal(),
    connectionState:"connectionStateReady",
  });
  if(currentAccountAddress){
    loginWithSign()
  }
}
const callback = {}
client.onmessage = (e)=>{
  const reply = new ImMsgReply({ ...JSON.parse(e.data) });
  console.log({reply});
  if(callback[reply.request_id]){
    callback[reply.request_id](reply)
    delete callback[reply.request_id]
  }
  switch (reply.model){
    case "ImMessage":
      switch (reply.action){
        case "create":
          const chatId = `-${reply.body.group_id}`
          if(reply.body.from_user_id !== currentUserId){
            const fromPackage = reply.body.fromPackage
            let text;
            let photo;
            const getMsgPhoto = ({doc_id})=>{
              debugger
              const t = doc_id.split("_")
              return {
                size:{
                  width:parseInt(t[5]),
                  height:parseInt(t[6]),
                }
              }
            }
            if(fromPackage.indexOf("{") === 0){
              const t = JSON.parse(fromPackage)
              text = t.text
              photo = t.photo ? getMsgPhoto(t.photo) : undefined;
            }else{
              text = fromPackage
            }
            getActions().apiUpdate({
              '@type':'newMessage',
              chatId,
              id:reply.body.id,
              message:{
                id: reply.body.id,
                chatId,
                chat:selectChat(getGlobal(),chatId),
                isOutgoing: false,
                content: {
                  text: { text },
                  photo
                },
                date: +(new Date()) / 1000,
                senderId: reply.body.from_user_id,
                isFromScheduled: false,
                replyToMessageId: 0,
                replyToTopMessageId: 0,
              },
              shouldForceReply:false,
            })
          }
          break
        default:
          break
      }
      break
    default:
      break
  }

}

client.onclose = (e)=>{
  isConnected = false;
}

client.onerror = (e)=>{

}

export function clientSendAction(action,body){
  return new Promise(resolve => {
    const req = new ImRequest({
      action,
      body:body||{},
    })
    callback[req.request_id] = resolve
    client.send(req.toString())
  })
}

export const getAuthBear = ()=>{
  const access_token = getAuthAccessToken();
  return access_token ?  "Bearer "+access_token: ""
}


export const getAuthAccessToken = ()=>{
  const auth = localStorage.getItem("__auth")
  return auth ? JSON.parse(auth)['access_token'] : undefined
}


export function clientUpload(action,body){
  return new Promise(resolve => {
    const req = new ImRequest({
      action,
      body:body||{},
    })
    callback[req.request_id] = resolve
    client.send(req.toString())
  })
}

if(window.ethereum){
  requestAccounts({
    accountsChanged: (connectedAddress) => {
      console.log("metamask accountsChanged")
      currentAccountAddress = connectedAddress
      if(isConnected){
        loginWithSign()
      }
    }
  }).then((connectedAddress) => {
    console.log("metamask connectedAddress");
    currentAccountAddress = connectedAddress

    if(isConnected){
      loginWithSign()
    }
  });
}
