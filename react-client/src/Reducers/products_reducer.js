import { deepObjectCopy } from '../utils/formlogic.js'
 

export default function(state={},action){
   // const stateCopy = deepObjectCopy(state);    
    switch(action.type){
        case 'get_products_by_sales':
            return Object.assign({}, state, { 
                bySales: action.payload 
            })
        case 'get_products_by_arrival':
            return Object.assign({}, state, { 
                byArrival:  action.payload 
            }) 
        case 'get_brands':
            return Object.assign({}, state, { 
                brands: action.payload 
            })
        case 'get_categories':
            return Object.assign({}, state, { 
                categories: action.payload 
            })
        case 'get_products_to_shop':
            return Object.assign({}, state, {
                toShop: action.payload.articles,
                toShopSize: action.payload.size
             })
        default:
            return state;
    }
}