import React from 'react';
import Paypal from './Paypal.jsx';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 1
    }
    this.transactionError = this.transactionError.bind(this);
    this.transactionCanceled = this.transactionCanceled.bind(this);
    this.transactionSuccess = this.transactionSuccess.bind(this);
  }
  transactionError () {

}

  transactionCanceled () {
  }

  transactionSuccess () {
      /*
      {
        "paid":true,
        "cancelled":false,
        "payerID":"DC2AY9HYPXY8A",
        "paymentID":"PAYID-LTPOB6I8J968237W3765963K",
        "paymentToken":"EC-9R9400535G091950A",
        "returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAYID-LTPOB6I8J968237W3765963K&token=EC-9R9400535G091950A&PayerID=DC2AY9HYPXY8A",
        "address":{
            "recipient_name":"Yidah Curiel",
            "line1":"Calle Juarez 1",
            "city":"Miguel Hidalgo",
            "state":"Ciudad de Mexico",
            "postal_code":"11580",
            "country_code":"MX"
        },
        "email":"fashion4women@gmail.com"
      }
  */
  }

  render () {
    return (  
      <div>I am the Cart component
          <Paypal 
            toPay={this.state.total}
            transactionError={(data)=>this.transactionError(data)}
            transactionCanceled={(data)=>this.transactionCanceled(data)}
            onSuccess={(data)=>this.transactionSuccess(data)}
          />
      </div>
    )
  }
}
export default Cart;
