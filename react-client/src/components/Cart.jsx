import React from 'react';
import Paypal from '../utils/Paypal.jsx';
import { connect } from 'react-redux';
import PageTop from '../utils/pagetop.js';
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
      total: total,
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

  transactionSuccess (data) {
   // this.props.dispatch(onSuccessBuy({
    //  cartDetail: this.props.user.cartDetail,
     // paymentData: data
 // })).then(()=>{
   //   if(this.props.user.successBuy){
          this.setState({
              showTotal: false,
              showSuccess: true
          })
      }
  //)
//}


  render () {
    const { total, discount, discountApplied, discountError } = this.state;
    return (  
 <div>
                     <PageTop
          title="Mi Carrito"
      />
      { this.state.showSuccess! ?
                    <div className="cartCard">
                        <CartProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                        />
                        :null
                        }

                    <div className= "cartBottom">
                      { this.state.showTotal && total > 200 ?
                          <div className="payDisclaimer">Ingrese dirección de envío al pagar por PayPal para válidar garantía de entrega.</div>
                          : 
                          this.state.showTotal && total < 200 ?
                            <div>Agregue más de $200 a su carrito para poder pagar con PayPal y recibir envío gratis</div>
                            : null }
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

          <div>
          <Paypal 
            toPay={this.state.total}
            transactionError={(data)=>this.transactionError(data)}
            transactionCanceled={(data)=>this.transactionCanceled(data)}
            onSuccess={(data)=>this.transactionSuccess(data)}
          />
          <span>Compras 100% protegidas por PayPal</span>
          </div>
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
