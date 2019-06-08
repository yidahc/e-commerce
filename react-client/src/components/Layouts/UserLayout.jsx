import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const links = [
    {
        name: 'Mi Cuenta',
        linkTo: '/UserDashboard'
    },
    {
        name: 'Datos de Usuario',
        linkTo: '/UserProfile'
    },
    {
        name: 'Carrito de compras',
        linkTo: '/Cart'
    },
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item,i)=>(
            <div>
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
            </div>
        ))
    )


    return (
<div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <div className="links">
                        { generateLinks(links)}
                    </div>
                </div>
                <div>
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