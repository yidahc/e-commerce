import React from 'react';
// import UserLayout from './Layouts/UserLayout.jsx';
// import Ybutton from '../utils/button.js';

const UserDashboard = ({user}) => {
    return (
            <div>
                <div className="user_nfo_panel">
                    <h2 className="componentTitles">Datos de Usuario</h2>
                    { user.userData ? (
                    <div className="userDetails">                
                        <div className="userTitles">Nombre</div>
                        <div>{user.userData.name}</div>
                        <div className="userTitles">Apellido</div>
                        <div>{user.userData.lastname}</div>
                        <div className="userTitles">Correo Electrónico</div>
                        <div>{user.userData.email}</div>
                    </div>
                    )
                    : null
                    }

                </div>

                <div className="user_nfo_panel">
                    <h2 className="componentTitles">Historial de Compras</h2>
                    <div className="user_product_block_wrapper">
                            <span className="userDetails">Historial</span>
                    </div>            
                </div>
            </div>        
    );
};

export default UserDashboard;

/*                    <Ybutton
                        type="default"
                        title="Editar datos de usuario"
                        linkTo="/UserProfile"
                    />
                    */