import React from 'react';
import { Link } from 'react-router-dom';

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
        <div>
            <div>
                <div>
                    <h2>Mi Cuenta</h2>
                    <div>
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

export default UserLayout;