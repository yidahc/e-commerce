import axios from 'axios';

export function getProductsBySales(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get('/api/product/articles?sortBy=sold&order=desc&limit=10&skip=5')
                    .then(response => response.data);

    return {
        type: 'get_products_by_sales',
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get('/api/product/articles?sortBy=createdAt&order=desc&limit=5')
    .then(response => response.data);

    return {
        type: 'get_products_by_arrival',
        payload: request
    }
}