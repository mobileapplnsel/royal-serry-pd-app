export interface DutyAllowcation {
    id: string;
    shift_name: string;
    shift_type: string;
    time_from: string;
    time_to: string;
    status: string;
    is_deleted: string;
    day: string;
    from_date: string;
    to_date: string;

  
}
export interface dutyAreaList {
    id: string;
    country_code: string;
    postal_code: string;
    place_name: string;
    state_name: string;
    state_code: string;
    county_name: string;
    county_code: string;
    community_name: string;
    community_code: string;
    latitude: string;
    longitude: string;
    accuracy: string;
}
