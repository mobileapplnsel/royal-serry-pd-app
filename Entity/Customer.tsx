import BaseApiRequestModel from '../Core/BaseApiRequestModel'
import City from './City';





export default interface Customer {

        user_id: string;
        firstname: string;
        lastname: string;
        email: string;

}

export enum CustomerRegisterStep {
    NewRegister = 'NewRegister',
    OtpVerified = "OtpVerified",
    ProfileCompleted = "ProfileCompleted"
}

export enum CustomerAddressType {
    Home = 'Home',
    Office = 'Office',
    Others = 'Others'
}