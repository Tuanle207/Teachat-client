import axios from 'axios';
import cookie from 'js-cookie';

const url = process.env.REACT_APP_API_HOST;

export const getAbsUrl = relativeUrl => url + relativeUrl;

const teachatAPI = axios.create({
    baseURL: process.env.REACT_APP_API_HOST
});

teachatAPI.interceptors.request.use((req) => {
    req.headers.Authorization = 'Bearer ' + cookie.get('jwt')
    return req;
});

export default teachatAPI;
