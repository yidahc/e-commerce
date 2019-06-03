import React from 'react';
import Login from '../Login.jsx';
import Logout from '../Logout.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Register from '../Register.jsx';

class Header extends React.Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div  className="left">
                  <div className="dropdown">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars} className="icon" /></button>
                        <div className="dropdown-content">
                            <a href="/">Volver a Inicio</a>
                            <a href="/Products">Productos</a>
                            <a href="/Cart">Carrito de Compras</a>
                        </div>
                  </div>
                        <div className="log">
                            Yidah 
                        </div>
                    </div>  
                    <div className="right">
                    <Login logged={this.logged}/>
                    <Register />
                    </div>  
                </div> 
            </header>
        );
    }
}

export default Header