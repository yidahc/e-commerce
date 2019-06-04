import React from 'react';
import Login from '../Login.jsx';
import Logout from '../Logout.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Register from '../Register.jsx';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user_actions.js';
import { Link, withRouter} from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        links:[
            {
                name:'Volver a Inicio',
                linkTo:'/',
                public: true
            },
            {
                name:'Productos',
                linkTo:'/Products',
                public: true
            },
            {
                name:'Carrito de Compras',
                linkTo:'/Cart',
                public: false
            },
            {
                name:'Mi Cuenta',
                linkTo:'/UserDashboard',
                public: false
            },
        ]
    }
    this.logoutHandler = this.logoutHandler.bind(this);
    this.cartLink = this.cartLink.bind(this);
    this.defaultLink = this.defaultLink.bind(this);
    this.showLinks = this.showLinks.bind(this);
  }

  logoutHandler () {
    this.props.dispatch(logoutUser()).then(response =>{
        if(response.payload.success){
            this.props.history.push('/')
        }
    })
  }

    cartLink (item,i) {
        const user = this.props.user.userData;

        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length:0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink (item,i) { return (
        item.name === 'Log out' ?
            <div
                onClick={()=> this.logoutHandler()}
            >
                Cerrar Session
            </div>

        :
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )
    };

    showLinks (type) {
        let list = [];

        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    }
                } else{
                    if(item.name !== 'Log in'){
                        list.push(item)
                    }
                }
            });
        };

        return list.map((item,i)=>{
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            } else {
                return this.cartLink(item,i)
            }
            
        })
    };

    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div  className="left">
                  <div className="dropdown">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars} className="icon" /></button>
                        <div className="dropdown-content">
                            {this.showLinks(this.state.links)} 
                        </div>
                  </div>
                        <div className="log">
                            Yidah 
                        </div>
                    </div>  
                {!this.props.user.userData ?
                   <div>
                   <Login />
                   <Register /> 
                   </div>
                   :
                      <div onClick={()=> this.logoutHandler()}>
                Cerrar Session
            </div>

                } 
                     
                </div> 
            </header>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));