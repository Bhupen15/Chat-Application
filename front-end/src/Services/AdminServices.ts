import axios from 'axios';

export const base_url = () => {
    return ("http://localhost:5001/");
}

export const fetchChat = async () => {

    return axios.get(base_url() + "api/chat");
}
export const register = async (data:any, config:any) => {

    return axios.post(base_url() + "api/user", data, config);
}
export const login = async (data:any, config:any) => {

    return axios.post(base_url() + "api/user/login", data, config);
}
