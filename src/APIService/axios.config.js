import axios from "axios";

const instance = axios.create({
    baseURL:'https://newsapi.org/v2',
    responseType: 'json',
    timeout: 6000
});

export default instance