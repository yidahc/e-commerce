import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const links = [
    {
        name: 'Mi Cuenta',
        linkTo: '/user/dashboard'
    },
    {
        name: 'Datos de Usuario',
        linkTo: '/user/user_profile'
    },
    {
        name: 'Carrito de compras',
        linkTo: '/user/cart'
    },
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item,i)=>(
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )


    return (
<div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>Mi Cuenta</h2>
                    <div className="links">
                        { generateLinks(links)}
                    </div>
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);