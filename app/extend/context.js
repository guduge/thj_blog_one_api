'use strict';

module.exports = {
  get isIos() {
    const iosReg = /iphone|ipad|ipad/i;
    return iosReg.test(this.get('user-agent'));
  },
  get getUA() {
    return this.get('user-agent');
  },
};
