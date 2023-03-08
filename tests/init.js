const nodeCrypto = require('crypto');
const PouchDB = require('pouchdb');
const fetch = require('node-fetch');

jest.setTimeout(10000000);
window.fetch = fetch;
window.PouchDB = PouchDB;
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  }
};
