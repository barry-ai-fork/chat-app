import MnemonicHelper from "./MnemonicHelper";
import {hdkey as HDKey} from 'ethereumjs-wallet'

export const RootKeyPrefixPath = "m/44'/60'/0'";

export default class WalletHelper {
  constructor(options) {
    let {network, mnemonicWords, entropy, password, lang} = options || {};
    this.network = network || "eth";

    let mnemonic, seed;
    if (!entropy) {
      if (!mnemonicWords) {
        mnemonicWords = new MnemonicHelper().getMnemonic()
      }
    } else {
      mnemonicWords = MnemonicHelper.fromEntropy(Buffer.from(entropy, "hex"))
    }
    mnemonic = new MnemonicHelper({
      mnemonicWords, lang: lang || "en"
    });
    seed = mnemonic.toSeed(password || "");
    this.__entropy = mnemonic.toEntropy()
    this.__masterKey = HDKey.fromMasterSeed(seed);
  }

  getEntropy() {
    return this.__entropy;
  }

  getChild(childIndex, changeIndex = 0, compressed = true) {
    const path = `${RootKeyPrefixPath}/${changeIndex}/${childIndex}`
    const childKey = this.__masterKey.derivePath(path)
    return {
      "prvKey": "0x" + childKey._hdkey.privateKey.toString("hex"),
      "pubKey": compressed ? "0x" + childKey._hdkey.publicKey.toString("hex") : "0x" + childKey.getWallet().getPublicKey().toString("hex"),
      "address": childKey.getWallet().getAddressString()
    }
  }
}
