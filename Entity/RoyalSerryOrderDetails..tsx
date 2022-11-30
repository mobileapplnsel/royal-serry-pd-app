export interface RoyalSerryOrderDetails{
    order_details: OrderDetail[];
    order_from_details: OrderFromDetail[];
    order_to_details: OrderToDetail[];
    order_item_details: OrderItemDetail[];
    order_status: OrderStatu[];
    
    order_price_details: OrderPriceDetail[];
}
export interface OrderDetail {
  
 

    id: string;
    shipment_no: string;
    quotation_id: string;
    parent_id: string;
    customer_id: string;
    shipment_type: string;
    location_type: string;
    transport_type: string;
    delivery_mode_id: string;
    road: string;
    rail: string;
    air: string;
    ship: string;
    status: string;
    platform: string;
    created_by: string;
    created_date: string;
    payment_mode: string;
    payment_status: string;
    is_invoice: string;
}
export interface OrderPriceDetail {
    id: string;
    shipment_id: string;
    subtotal: string;
    discount: string;
    ga_percentage: string;
    ga_tax_amt: string;
    ra_percentage: string;
    ra_tax_amt: string;
    additional_charge_gross: string;
    grand_total: string;
}

export interface OrderFromDetail {
    id: string;
    shipment_id: string;
    quotation_id: string;
    customer_id: string;
    firstname: string;
    lastname: string;
    address: string;
    address2: string;
    company_name: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    email: string;
    telephone: string;
    address_type: string;
    country_name: string;
    state_name: string;
    city_name: string;
}

export interface OrderToDetail {
    id: string;
    shipment_id: string;
    quotation_id: string;
    customer_id: string;
    firstname: string;
    lastname: string;
    address: string;
    address2: string;
    company_name: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    email: string;
    telephone: string;
    address_type: string;
    country_name: string;
    state_name: string;
    city_name: string;
}

export interface OrderItemDetail {
    id: string;
    shipment_id: string;
    shipment_no: string;
    quotation_id: string;
    category_id: string;
    subcategory_id: string;
    item_id: string;
    desc: string;
    value_shipment: string;
    quantity: string;
    rate?: any;
    insur: string;
    line_total: string;
    other_details_parcel: string;
    referance_parcel?: any;
    length?: any;
    length_dimen?: any;
    height?: any;
    height_dimen?: any;
    weight?: any;
    weight_dimen?: any;
    breadth?: any;
    breadth_dimen?: any;
    protect_parcel?: any;
    additional_charge_comment?: any;
    additional_charge?: any;
    category_name: string;
    item_name: string;
    document: string;
    package: string;
    type: string;
    subcategory_name: string;
    road?: any;
    rail?: any;
    air?: any;
    ship?: any;

  
    item_total: number;
    barcode_img: string;
}

export interface OrderStatu {
    id: string;
    shipment_id: string;
    status_id: string;
    branch_id: string;
    status_text: string;
    created_by: string;
    created_date: string;
    status_name: string;
}
export interface order_price_details {
    id: string;
    shipment_id: string;
    subtotal: string;
    discount: string;
    ga_percentage: string;
    ga_tax_amt: string;
    ra_percentage: string;
    ra_tax_amt: string;
    additional_charge_gross: string;
    grand_total: string;
}


export enum OrderType {
    All  = 'All',
    Pickup = 'Pickup',
    Delivery = 'Delivery'
}
export enum OrderHistoryType {

    Pickup = 'Picked Up',
    Delivery = 'Delivered'
}