import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import { faFacebookSquare, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                Narzisse
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2 className="titles">Informes</h2>
                    </div> 
                    <div className="left">
                        <h2 className="titles subscribe">Suscríbete</h2>
                    </div>      
                </div>             
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
                            <div className="tag">
                                <FontAwesomeIcon icon={faInstagram} className="icon" />
                                <div className="nfo">
                                    <div>Instagram</div>
                                    <div>todoparaserunica</div>
                                         
                                </div>    
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                                <div className="nfo">
                                    <div>Whatsapp</div>
                                    <div>55-4046-8187</div>
                                         
                                </div>    
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon icon={faFacebookSquare} className="icon" />
                                <div className="nfo">
                                    <div>Facebook</div>
                                    <div>facebook.com/fashion4women</div>
                                         
                                </div>    
                            </div>
                        </div>    
                    </div>
                   
        </footer>
    );
};

export default Footer;