interface PayuProps {
    amount: string;
    txnId: string;
    productName: string;
    firstName: string;
    email: string;
    phone: string;
    merchantId: string;
    key: string;
    successUrl: string;
    failedUrl: string;
    hash: string;
    isDebug?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    udf4?: string;
    udf5?: string;
    udf6?: string;
    udf7?: string;
    udf8?: string;
    udf9?: string;
    udf10?: string;
    salt?: string;
}
declare const DefaultValue: {
    isDebug: boolean;
    udf1: string;
    udf2: string;
    udf3: string;
    udf4: string;
    udf5: string;
    udf6: string;
    udf7: string;
    udf8: string;
    udf9: string;
    udf10: string;
};
interface ValidatorInterface {
    amount: string;
    txnId: string;
    productName: string;
    firstName: string;
    email: string;
    key: string;
    salt: string;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    udf4?: string;
    udf5?: string;
    udf6?: string;
    udf7?: string;
    udf8?: string;
    udf9?: string;
    udf10?: string;
}
export { DefaultValue, PayuProps, ValidatorInterface };
