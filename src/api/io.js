import axios from 'axios';
import qs  from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: ''
    // withCredentials: true,
    // headers: {}
});

export function handleError(err) {
    return Promise.reject(err);
}

export default {
    get(url, options = {}) {
        return instance.get(url, options).catch(handleError);
    },
    post(url, options = {}) {
        return instance.post(url, qs.stringify(options)).catch(handleError);
    },
    delete(url, options = {}) {
        return instance.delete(url, options).catch(handleError);
    },
    put(url, options = {}) {
        return instance.put(url, options).catch(handleError);
    }
};
