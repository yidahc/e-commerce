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
        case 'add_to_cart':
            let teehee = newState;
            teehee.userData.cart = action.payload;
            return teehee;
        case 'get_cart_items':
            newState.cartDetail = action.payload
            let newCart = []
            for (let i in newState.userData.cart) {
                newCart.push(newState.userData.cart[i])
            }
            newState.userData.cart = newCart;
            return newState;
        case 'remove_cart_item':
        let result = newState;
        result.cartDetail = action.payload.cartDetail;
        result.userData.cart = action.payload.cart;
        return result;
        case 'on_success_buy':
        let successBought = newState;
        successBought.user = newState.userData;
        successBought.user.successBuy = action.payload.success;
        successBought.userData.cart = action.payload.cart;
        successBought.cartDetail = action.payload.cartDetail;
        return successBought;
            /* return {
                newState,
                successBuy: action.payload.success,
                userData:{
        //            newState.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
             }
             */
        default:
            return state;
    }
}
