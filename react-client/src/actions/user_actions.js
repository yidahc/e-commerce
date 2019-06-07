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

export function addToCart(_id){

  const request = axios.post( `/api/users/addToCart?productId=${_id}`)
  .then(response => response.data)

  return {
      type: 'add_to_cart',
      payload: request
  }
}

export function getCartItems(cartItems, userCart){

  const request = axios.get(`/api/product/articles_by_id?id=${cartItems}&type=array`)
                  .then(response => {
   
                      userCart.forEach(item=>{
                          response.data.forEach((k,i)=>{
                              if(item.id === k._id){
                                  response.data[i].quantity = item.quantity;
                              }
                          })
                      })
                      return response.data;
                  })
               

  return {
      type: 'get_cart_items',
      payload: request
  }

}


export function removeCartItem(id){

  const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
                  .then(response => {

                      response.data.cart.forEach(item=>{
                          response.data.cartDetail.forEach((k,i)=>{
                              if(item.id === k._id){
                                  response.data.cartDetail[i].quantity = item.quantity;
                              }
                          })
                      })
                          return response.data;
                  })

  return {
      type: 'remove_cart_item',
      payload: request
  }

}



export function onSuccessBuy(data){ 
  const request = axios.post('/api/users/successBuy', data)
                  .then(response => response.data);

  return {
      type: 'on_success_buy',
      payload: request
  }
}