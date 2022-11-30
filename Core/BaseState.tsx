export default class BaseState<U>
{
    Model: U;
    loan:Boolean;
    protect_parcel_document:boolean;
    protect_parcel_package:boolean;
    constructor(Model: U) {
        this.Model = Model;
        this.loan=false;
        this.protect_parcel_document=false;
        this.protect_parcel_package=false
    }
}