import { deepObjectCopy } from '../utils/formlogic.js'


export default function(state={}, action){
    const newState = deepObjectCopy(state);
    switch(action.type){
        case 'register_user':
            return { newState, register: action.payload }
        case 'login_user':
            return { newState, loginSuccess: action.payload }
    
        default:
            return state;
    }
}
