import React from 'react';
import Paypal from './Paypal.jsx';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 50,
      discount: '',
      discountApplied: false,
      discountError: false,
    }
    this.transactionError = this.transactionError.bind(this);
    this.transactionCanceled = this.transactionCanceled.bind(this);
    this.transactionSuccess = this.transactionSuccess.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput(event) {
    const {target} = event;
    const {name, value} = target;
  
    this.setState({
      [name]:value
    }); // name and value are in target
  }

  handleSubmit(e) {
    e.preventDefault();
    const { discount, total, discountApplied } = this.state;
    if (discount === "yidah10" && !discountApplied) {
      this.setState ({
        total: total-(total*.10),
        discount: '',
        discountApplied: true,
        discountError: false,
      })
    } else if (discount === "yidah10" && discountApplied) {
      this.setState({discount: ''});
      setTimeout("alert('Cupón ya fue aplicado');", 1);
      } else {
        this.setState({
          discount: '',
          discountError: true,
        });
      };
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
    const { total, discount, discountApplied, discountError } = this.state;
    return (  
      <div>I am the Cart component
        <h3>Total a pagar: {`$${total}`}</h3>
        <form>
        <label>
        Descuento: {' '}
        <input
          type="string"
          name= "discount"
          value= {discount}
          placeholder= {"Ingresa cupón de descuento"}
          onChange={this.handleInput}
        />
        </label>
        <button style={{textAlign: "center"}}
          onClick={this.handleSubmit}
        >Agregar</button>
        </form>
        <p>{discountApplied ? "Descuento ha sido aplicado" : null }
           {discountError ? "Cupón inválido" : null }
        </p>
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
