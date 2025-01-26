import axios from "axios"
import { myUser } from "../models"
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: true
  });

api.defaults.headers['Content-Type'] = 'application/json';
api.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/login", 
            { email, password }, 
        );        
        if (!response.data.access_token) {
            throw new Error('Invalid server response format');
        }
        return response.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}

export const get_all_users = async (token: string) => {
    const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export const register = async (user:Omit<myUser, "user_id" | "role_id">): Promise<string> => {
    const response = await api.post("/register", user)
    return response.data

}

export const updet_user_by_token = async (
    token: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    newpasswors: string) => {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    const response = await api.put(`/users/${userId}`,{userId, first_name, last_name, email, password, newpasswors}, {headers: { Authorization: `Bearer ${token}`}});
    return response.data;
};

export const updet_user_by_id = async (
    id: number, 
    token: string,
    first_name: string,
    last_name: string,
    email: string
) => {
    const response = await api.put(`/management/users/${id}`, {email, first_name, last_name}, {headers: { Authorization: `Bearer ${token}`}});
    return response.data;
}

export const get_user_by_token = async (token: string) => {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    const response = await api.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
}