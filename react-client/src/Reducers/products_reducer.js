import { deepObjectCopy } from '../utils/formlogic.js'
 

export default function(state={},action){
    const newState = deepObjectCopy(state);    
    switch(action.type){
        case 'get_products_by_sales':
            return { newState, bySell: action.payload }
        case 'get_products_by_arrival':
            return { newState, byArrival:  action.payload }    
        default:
            return state;
    }
}