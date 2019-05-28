import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
// import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Yidah
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Informes</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon icon={faClock} className="icon" />
                                <div className="nfo">
                                    <div>Horario de Servicio</div>
                                    <div>Lunes-Viernes/ 10am - 5pm</div>
                                         
                                </div>    
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>fashion4women@gmail.com</div>
                                         
                                </div>    
                            </div>
                        </div>    
                    </div>
                    <div className="left">
                        <h1>
                        Síguenos
                        </h1>
                        <div>
                            <div>
                                Suscríbete al newsletter 
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </footer>
    );
};

export default Footer;