import io from './io';
const mock = require('../../data.json');

const isDev = process.env.NODE_ENV === 'development';

export function getSeller(url, params = {}) {
    return isDev ? io.get('/api/seller', params) : getData(mock.seller);
}

export function getGoods(url, params = {}) {
    return isDev ? io.get('/api/goods', params) : getData(mock.goods);
}

export function getRatings(url, params = {}) {
    return isDev ? io.get('/api/ratings', params) : getData(mock.ratings);
}

function getData(data) {
    return new Promise((resolve, _reject) => {
        resolve({
            data: { data, error: 0 }
        });
    });
}
