export default interface  Quotion {
    quote_no: string;
    customer_id: string;
    shipment_type: string;
    location_type: string;
    transport_type: string;
    status: string;
    platform: string;
    quote_type: string;
    created_by: string;
    delivery_mode_id: string;
    created_date: string;
    quotation_id: string;

    id: string;
  
    user_id: string;
    order_type: string;
 
    parent_id: string;

    road: string;
    rail: string;
    air: string;
    ship: string;

    order_created: string;
    order_created_dtime?: any;


    
    from_firstname: string;
    from_lastname: string;
    from_address: string;
    from_address2: string;
    from_telephone: string;
    country_name: string;
    state_name: string;
    city_name: string;
    from_zip: string;
    latitude: string;
    longitude: string;
    
}