"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashGenerator = void 0;
const react_native_1 = require("react-native");
const hashGenerator_1 = require("./hashGenerator");
exports.HashGenerator = hashGenerator_1.default;
const interfaces_1 = require("./interfaces");
const RNPayumoney = react_native_1.NativeModules.RNPayumoney;
const RNEvent = new react_native_1.NativeEventEmitter(RNPayumoney);
const removeSubscriptions = () => {
    RNEvent.removeAllListeners('PAYU_PAYMENT_SUCCESS');
    RNEvent.removeAllListeners('PAYU_PAYMENT_FAILED');
};
const Payumoney = (paymentData) => {
    paymentData = Object.assign(Object.assign({}, interfaces_1.DefaultValue), paymentData);
    if (paymentData.isDebug) {
        console.log(paymentData);
    }
    return new Promise((resolve, reject) => {
        RNEvent.addListener('PAYU_PAYMENT_SUCCESS', (data) => {
            if (typeof data !== 'object') {
                data = JSON.parse(data);
            }
            resolve(Object.assign(Object.assign({}, data), { success: true }));
            removeSubscriptions();
        });
        RNEvent.addListener('PAYU_PAYMENT_FAILED', (data) => {
            if (typeof data !== 'object') {
                data = JSON.parse(data);
            }
            reject(data);
            removeSubscriptions();
        });
        RNPayumoney.pay(JSON.stringify(paymentData));
    });
};
exports.default = Payumoney;
//# sourceMappingURL=index.js.map