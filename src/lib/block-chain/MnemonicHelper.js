import {
  entropyToMnemonic,
  generateMnemonic,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  setDefaultWordlist,
  validateMnemonic,
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'bip39';

export const LangEnum = {
  en: 'english',
  zh_cn: 'chinese_simplified',
};

/**
 * new Mnemonic()
 *  or
 * new Mnemonic({lang:"en"})
 */
export default class MnemonicHelper {
  constructor(options) {
    const { lang, mnemonicWords } = options || {};
    this.defaultLang = MnemonicHelper.getLang(lang);
    setDefaultWordlist(this.defaultLang);
    if (mnemonicWords) {
      this.mnemonic = mnemonicWords;
    } else {
      this.mnemonic = this.genMnemonic();
    }
  }

  genMnemonic() {
    const r = generateMnemonic();
    // eslint-disable-next-line no-self-compare
    if (r.split(' ').length !== r.split(' ').length) {
      return this.genMnemonic();
    } else {
      return r;
    }
  }

  getMnemonic() {
    return this.mnemonic;
  }

  checkMnemonic() {
    return validateMnemonic(this.mnemonic);
  }

  toSeed(password) {
    return mnemonicToSeedSync(this.mnemonic, password);
  }

  toEntropy() {
    return mnemonicToEntropy(this.mnemonic);
  }

  static getLang(lang) {
    return LangEnum[lang || 'en'];
  }

  static setLang(lang) {
    setDefaultWordlist(MnemonicHelper.getLang(lang));
  }

  static fromEntropy(entropy) {
    return entropyToMnemonic(entropy);
  }
}
