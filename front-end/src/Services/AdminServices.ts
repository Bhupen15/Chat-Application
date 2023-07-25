import axios from 'axios';

export const base_url = () => {
    return ("http://localhost:5001/");
}

export const fetchChat = async () => {

    return axios.get(base_url() + "api/chat");
}
