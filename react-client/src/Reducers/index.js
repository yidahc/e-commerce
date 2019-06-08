import { combineReducers } from 'redux';
import user  from './user_reducer.js';
import products from './products_reducer.js';
const rootReducer = combineReducers({
    user, 
    products,
});

export default rootReducer;