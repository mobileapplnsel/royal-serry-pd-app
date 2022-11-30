export interface Coupon{
    CouponId: string;
    Code: string;
    MinEligibleOrderAmout: number;
    MaxEligibleOrderAmout: number;
    DiscountType: CouponDiscountType;
    DiscountValue: number;
    OfferStartDate: Date;
    OfferEndDate: Date;
    TotalQuantityCount: number;
    CreateBy: string;
    CreateDate: Date;
    ModifyBy: string;
    ModifyDate: Date;
    CouponDiscountAmount:number;
}

export enum CouponDiscountType{
    Percentage='Percentage',
    Amount= 'Amount'
}