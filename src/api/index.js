import io from './io';

export function getSeller(url, params = {}) {
    return io.get('/api/seller', params);
}

export function getGoods(url, params = {}) {
    return io.get('/api/goods', params);
}

export function getRatings(url, params = {}) {
    return io.get('/api/ratings', params);
}
