import React from 'react';
import UserLayout from './Layouts/UserLayout.jsx';
import Ybutton from '../utils/button.js';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                
                <div className="user_nfo_panel">
                    <h2>Datos de Usuario</h2>
                    { user.userData ? (
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
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
                    <h1>Historial de Compras</h1>
                    <div className="user_product_block_wrapper">
                            Historial
                    </div>            
                </div>
                
            </div>
        </UserLayout>
        
    );
};

export default UserDashboard;