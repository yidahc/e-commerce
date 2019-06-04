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
        default:
            return state;
    }
}
