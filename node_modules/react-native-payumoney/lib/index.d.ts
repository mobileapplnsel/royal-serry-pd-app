import HashGenerator from './hashGenerator';
import { PayuProps } from './interfaces';
declare const Payumoney: (paymentData: PayuProps) => Promise<unknown>;
export default Payumoney;
export { HashGenerator };
