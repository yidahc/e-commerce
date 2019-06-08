import React from 'react';
import Login from '../Login.jsx';
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
        linkClicked: false,
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
    this.defaultLink = this.defaultLink.bind(this);
    this.showLinks = this.showLinks.bind(this);
  }
  
  handleClick () {
    this.setState ({ linkClicked: !this.state.linkClicked })
  }

  logoutHandler () {
    this.props.dispatch(logoutUser()).then(response =>{
            this.props.history.push('/')
        }
    ) .catch (err => {
        this.props.history.push('/')
    })
  }


    defaultLink (item,i) { return (
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )
    };

    showLinks () {
        let list = [];

        if(this.props.user.userData){
            this.state.links.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    }
                } else{
                        list.push(item)
                    }
            });
        } else {
            this.state.links.forEach((item)=>{
                if(item.public === true){
                    list.push(item)
                }
            })
        }

        return list.map((item,i)=>{
                return this.defaultLink(item,i)
        })
    };


    
    render() {
        return (
            <div>
            <header className='PageTitle'>
                  <span className="dropdown headerSections">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars} className="icon" /></button>
                        <span className="dropdown-content">
                            {this.showLinks(this.state.links)} 
                        </span>
                  </span>
                 <span id='TitleName' className="headerSections">
                <a href="/"> Narzisse</a>
                 </span>
                    <span>
                         { !this.props.user.userData ||!this.props.user.userData.isAuth ?
                            <span className="headerSections2 loginRegister" >
                            <div>
                            <Login />
                            </div>
                            <div>
                            <Register />
                            </div>
                            </span>
                            : 
                          <span className="headerSections2 loginRegister">
                            <div>
                             <button className="dropbtn" onClick={()=> this.logoutHandler()}> Cerrar Session </button>
                             </div>
                             <span className="headerSections2 loginRegister" >
                            <div>
                             <span  style={{color:"#b46875"}}>{this.props.user.userData.cart ? this.props.user.userData.cart.length:0}</span>
                              <Link className="link" to='/Cart'>
                             Carrito de Compras
                             </Link>
                            </div>
                             </span>
                          </span>
                         }   
                    </span>
                    </header>
                         </div>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));


//kualneskayotl:
// ki’ichpanil
// Guendasicarú