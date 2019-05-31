import axios from 'axios';

import { USER_SERVER } from '../utils/misc.js';
import { LOGIN_USER } from './types.js';


export function loginUser (dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
                  .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}