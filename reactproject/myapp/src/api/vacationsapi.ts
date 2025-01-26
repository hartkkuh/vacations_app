import axios from "axios"

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: true,
  });

export const get_all_vacations = async (token: string) => {
    const response = await api.get("/vacations", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const add_vacation = async (
    token: string,
    country_id: number,
    vacation_description: string,
    start_date: string,
    end_date: string,
    price: number,
    image_url: string
    ) => {
    const response = await api.post("/vacations",{country_id, vacation_description, start_date, end_date, price, image_url}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const update_vacation = async (
    token: string,
    vacation_id: number,
    country_id: number,
    vacation_description: string,
    start_date: string,
    end_date: string,
    price: number,
    image_url: string
    ) => {
    const response = await api.put(`/management/vacations/${vacation_id}`,{country_id, vacation_description, start_date, end_date, price, image_url}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


export const addlikei = async (token: string, vacation_id: number) => {

    const response = await api.post("/likes", {vacation_id}, {
        headers: { 
            Authorization: `Bearer ${token}`,'Content-Type': 'application/json'}})
    return response
}

export const deletelike = async (token: string, vacation_id: number) => {
    const response = await api.delete("/likes", {
        data: { vacation_id },
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response
}

export const get_like_by_user_id = async (token: string) => {
    const response = await api.get("/likes", {
        headers: {Authorization: `Bearer ${token}`}})
        return response
}

export const get_all_countries = async (token: string):Promise<[]> => {
    const respoins = await api.get("/countries", {
        headers: {Authorization: `Bearer ${token}`}})
        return respoins.data.countries
}

export const delete_vacation = async (token: string, vacation_id: number) => {
    const response = await api.delete(`/management/vacations/${vacation_id}`, {
        headers: {Authorization: `Bearer ${token}`}})
        return response.data
    }