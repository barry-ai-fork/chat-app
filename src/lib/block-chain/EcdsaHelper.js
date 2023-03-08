var sigUtil = require('eth-sig-util')
var ethUtil = require('ethereumjs-util')

const {createHash} = require('crypto')

class EcdsaHelper {
    constructor({pubKey, prvKey}) {
        this.pubKey = pubKey ? EcdsaHelper.arrayBufferToBuffer(pubKey) : null
        this.prvKey = prvKey ? EcdsaHelper.arrayBufferToBuffer(prvKey) : null
    }

    signByMetamask(message) {
        return new Promise((resolve, reject) => {
            window.ethereum.enable().then(r => {
                const fromAddress = r[0]
                const msg = ethUtil.bufferToHex(Buffer.from(message))
                const params = [msg, fromAddress]
                const method = 'personal_sign'
                window.web3.currentProvider.sendAsync({
                    method,
                    params,
                    from: fromAddress,
                }, function (err, result) {
                    if (err) return reject(err)
                    if (result.error) return reject(result.error)
                    resolve(result.result)
                })
            })

        })
    }

    static arrayBufferToBuffer(ab) {
        const buf = new Buffer(ab.byteLength);
        const view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    }

    sign(messageArrayBuffer) {
        const sig = sigUtil.personalSign(this.prvKey, {
            data: messageArrayBuffer
        })
        return {sig, data: messageArrayBuffer}
    }

    static recoverAddress({sig, data}) {
        return sigUtil.recoverPersonalSignature({
            sig, data
        })
    }

    static createHash(message, algorithm = "sha256") {
        return createHash(algorithm).update(Buffer.from(message, 'utf8')).digest()
    }
}

export default EcdsaHelper
