import { deepObjectCopy } from '../utils/formlogic.js'


export default function(state={}, action){
    const newState = deepObjectCopy(state);
    switch(action.type){
        case 'register_user':
            return { newState, register: action.payload }
        case 'login_user':
            return { newState, loginSuccess: action.payload }
        case 'auth_user':
            return { newState, userData: action.payload }
        case 'logout_user':
            return { newState }
            /*
        case 'add_to_cart':
            return { newState, userData:{
                newState.userData,
                cart: action.payload
            }}
        case 'get_cart_items':
            return { newState,cartDetail: action.payload  }
        case 'remove_cart_item':
            return { 
                newState,
                cartDetail: action.payload.cartDetail,
                userData:{
                    newState.userData,
                    cart: action.payload.cart
                }
             }
        case 'on_success_buy':
             return {
                newState,
                successBuy: action.payload.success,
                userData:{
                    newState.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
             }
             */
        default:
            return state;
    }
}
