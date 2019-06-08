import React from 'react';
// import UserLayout from './Layouts/UserLayout.jsx';
import Ybutton from '../utils/button.js';

const UserDashboard = ({user}) => {
    return (
            <div>
                <div className="user_nfo_panel">
                    <h2 className="formTitles">Datos de Usuario</h2>
                    { user.userData ? (
                    <div>
                        <div>{user.userData.name}</div>
                        <div>{user.userData.lastname}</div>
                        <div>{user.userData.email}</div>
                    </div>
                    )
                    : null
                    }
                    <Ybutton
                        type="default"
                        title="Editar datos de usuario"
                        linkTo="/UserProfile"
                    />
                </div>

                <div className="user_nfo_panel">
                    <h2 className="formTitles">Historial de Compras</h2>
                    <div className="user_product_block_wrapper">
                            Historial
                    </div>            
                </div>
            </div>        
    );
};

export default UserDashboard;