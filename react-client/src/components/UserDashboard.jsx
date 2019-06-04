import React from 'react';
import UserLayout from './Layouts/UserLayout.jsx';
import Ybutton from '../utils/button.js';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                
                <div>
                    <h2>Datos de Usuario</h2>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <Ybutton
                        type="default"
                        title="Editar datos de usuario"
                        linkTo="/UserProfile"
                    />
                </div>

                <div>
                    <h1>Historial de Compras</h1>
                    <div>
                            history
                    </div>            
                </div>
                
            </div>
        </UserLayout>
        
    );
};

export default UserDashboard;