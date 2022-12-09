"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha512_1 = require("js-sha512");
exports.default = ({ key, amount, email, txnId, productName, firstName, salt, udf1 = "", udf2 = "", udf3 = "", udf4 = "", udf5 = "", udf6 = "", udf7 = "", udf8 = "", udf9 = "", udf10 = "" }) => {
    const hashString = `${key}|${txnId}|${amount}|${productName}|${firstName}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}|${udf6}|${udf7}|${udf8}|${udf9}|${udf10}|${salt}`;
    return js_sha512_1.sha512(hashString);
};
//# sourceMappingURL=hashGenerator.js.map