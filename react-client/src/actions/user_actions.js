import axios from 'axios';

export function registerUser(dataToSubmit){
  const request = axios.post('/api/users/register',dataToSubmit)
      .then(response => response.data);
  
  return {
      type:'register_user',
      payload: request
  }
}

export function loginUser (dataToSubmit) {
  const request = axios.post('/api/users/login', dataToSubmit)
                  .then(response => response.data);

  return {
    type: 'login_user',
    payload: request
  }
}

export function auth(){

  const request = axios.get('/api/users/auth')
  .then(response => response.data);

  return {
      type: 'auth_user',
      payload: request
  }

}


export function logoutUser(){

  const request = axios.get('/api/users/logout')
  .then(response => response.data);

  return {
      type: 'logout_user',
      payload: request
  }

}