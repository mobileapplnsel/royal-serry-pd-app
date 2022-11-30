export default interface RoyalSerryPickedOrder {
    id: string;
    shipment_id: string;
    user_id: string;
    order_type: string;
    status: string;
    created_date: string;
    shipment_no: string;
    shipment_date: string;
    from_firstname: string;
    from_lastname: string;
    from_address: string;
    from_address2: string;
    from_telephone: string;
    country_name: string;
    state_name: string;
    city_name: string;
    from_zip: string;
    latlong: Latlong;
}
export interface Latlong {
    lat: number;
    long: number;
}
export interface MapOrder {
    shipment_no: string;
    from_address: string;
    from_address2: string;
    country_name: string;
    state_name: string;
    city_name: string;
    from_zip: string;
    latlong: Latlong;
}