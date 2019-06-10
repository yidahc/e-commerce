import React from 'react';
import Paypal from '../utils/Paypal.jsx';
import { connect } from 'react-redux';
// import UserLayout from '../components/Layouts/UserLayout.jsx';
import CartProductBlock from '../utils/cartproductblock';
import { getCartItems, removeCartItem ,onSuccessBuy} from '../actions/user_actions.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      total: 50,
      showTotal: false,
      showSuccess: false,
      discount: '',
      discountApplied: false,
      discountError: false,
    }
    this.transactionError = this.transactionError.bind(this);
    this.transactionCanceled = this.transactionCanceled.bind(this);
    this.transactionSuccess = this.transactionSuccess.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.showNoItemMessage = this.showNoItemMessage.bind(this);
  }

  componentDidMount(){
    let cartItems = [];
    let user = this.props.user;

    if(user.userData.cart){
        if(user.userData.cart.length > 0){
            user.userData.cart.forEach(item=>{
                cartItems.push(item.id)
            });
            this.props.dispatch(getCartItems(cartItems,user.userData.cart))
            .then(()=>{
                if(this.props.user.cartDetail.length > 0){
                    this.calculateTotal(this.props.user.cartDetail);
                } 
            })
        }
    }
}

calculateTotal (cartDetail) {
  let total = 0;

  cartDetail.forEach(item=>{
      total += parseInt(item.price, 10) * item.quantity
  });

  this.setState({
      total,
      showTotal: true
  });
}

removeFromCart (id) {
  this.props.dispatch(removeCartItem(id))
  .then(()=>{
      if(this.props.user.cartDetail.length <= 0){
          this.setState({
              showTotal: false
          })
      } else{
          this.calculateTotal(this.props.user.cartDetail)
      }
  })
}

showNoItemMessage () {
  return (
  <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown}/>
      <div>
          Carrito vacio
      </div>
  </div>
)
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
 <div>
                    <h1 className="componentTitles">Mi Carrito</h1>
                    <div className="cartCard">
                        <CartProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                        />
                    <div className= "cartBottom">
                        { this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Cantidad Total: $ {this.state.total}
                                    </div>
                                </div>
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
                             <button className="fancyButton2"
                               onClick={this.handleSubmit}
                             >Agregar</button>
                             </form>
                                      {discountApplied ? <p className= "error"> "Descuento ha sido aplicado" </p>: null }
                                      {discountError ? <p className= "error"> "Cupón inválido" </p> : null }
                            </div>                            
                        :
                            this.state.showSuccess ?
                                <div className="cart_success">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        Gracias, su pago fue procesado
                                    </div>
                                    <div>
                                        Favor de revisar su cuenta de paypal para confirmar
                                    </div>
                                </div>
                            :
                            this.showNoItemMessage()
                        }
                    </div>
                    <div className= "cartBottom">
                    {
                        this.state.showTotal ?


          <Paypal 
            toPay={this.state.total}
            transactionError={(data)=>this.transactionError(data)}
            transactionCanceled={(data)=>this.transactionCanceled(data)}
            onSuccess={(data)=>this.transactionSuccess(data)}
          />
          : null 
                    }
                    </div>
                    </div>
                    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps) (Cart);
