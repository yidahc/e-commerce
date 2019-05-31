import { LOGIN_USER } from '../actions/types.js';

import { deepObjectCopy } from '../utils/formlogic.js'

export default function(state={}, action){
    switch(action.type){
        case LOGIN_USER:
            let newState = deepObjectCopy(state);
            return { newState, loginSuccess: action.payload }
        default:
            return state;
    }
}