import {ProductItems } from "./ProductItems";




export interface OrderItem {
  OrderItemId: string;
  OrderId: string;
  ProductItemId: string;
  Quantity: number;
  Price: number;
  DiscountAmount: number;
  GstAmount: number;
  GrossAmount: number;
  NetAmount: number;
  CreateBy: string;
  CreateDate: Date;
  ModifyBy: string;
  ModifyDate: Date;
  ProductItem: ProductItems;
  SoldPrice: number;
}

export default interface Order {
  OrderId: string;
  InvoiceNo: string;
  InvoiceDate: Date;
  TotalQuantity: number;
  Status: OrderStatus;
  DeliveryTimeSlot: string;
  ExpectedDeliveryDate: Date;
  PaymentMode: string;
  CustomerId: string;
  StoreId: string;
  TotalGrossAmount: number;
  TotalDiscountAmount: number;
  TotalGstAmount: number;
  NetAmount: number;
  DeliveryBoyId: string;
  DeliveredDate: Date;
  IsIncentiveCalcualted: boolean;
  CustomerRating: number;
  CustomerFeedback: string;
  OrderItems: OrderItem[];
  CreateBy: string;
  CreateDate: Date;
  ModifyBy: string;
  ModifyDate: Date;
  // CustomerAddress: CustomerAddress;
  // Customer: Customer;
  StatusForCustomer: string;
  CouponCode: string;
  CouponDiscountAmount: number;
}

export enum CustomerDeliveryTimeSlot {
  FirstSlot = 'FirstSlot',
  SecondSlot = 'SecondSlot',
  ThirdSlot = 'ThirdSlot',
}
export enum CustomerPaymentMode {
  CashOnDelivery = 'CashOnDelivery',
  Card = 'Card',
  Paytm = 'Paytm',
  Wallet = 'Wallet',
  PayUMoney = 'PayUMoney',
}

export enum OrderStatus {
  PlacedByCustomer='PlacedByCustomer',
  ConfirmedByAdmin='ConfirmedByAdmin',
  WaitingForDeliveryBoyConfirm='WaitingForDeliveryBoyConfirm',
  ConfirmedByVendor= 'ConfirmedByVendor',
  ReadyForDelivery='ReadyForDelivery',
  OnTheWayToDeliver='OnTheWayToDeliver',
  Delivered='Delivered',
  CancelledByCustomer='CancelledByCustomer',
  CancelledByAdmin='CancelledByAdmin',
  DraftByCustomer= 'DraftByCustomer',
}
