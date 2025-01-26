export interface myUser {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role_id: number;
}

export interface myCountry {
    id: number;
    name: string;
}

export interface myVacation {
    vacation_id: number;
    country_id: number;
    vacation_description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_url: string;
}

export interface myUsers {
    user_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role_name: string
    is_admin: boolean

}
export interface myToken {
    user_id: number
    is_admin: boolean
}