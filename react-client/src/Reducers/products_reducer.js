import { deepObjectCopy } from '../utils/formlogic.js'
 

export default function(state={},action){
    const stateCopy = deepObjectCopy(state);    
    switch(action.type){
        case 'get_products_by_sales':
            return { stateCopy, bySell: action.payload }
        case 'get_products_by_arrival':
            return { stateCopy, byArrival:  action.payload } 
        case 'get_brands':
            return { stateCopy, brands: action.payload }
        case 'get_categories':
            return { stateCopy, categories: action.payload }
        case 'get_products_to_shop':
            return { 
                stateCopy,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
             }
        default:
            return state;
    }
}