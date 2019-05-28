import React from 'react';
import Login from '../Login.jsx';
import Logout from '../Logout.jsx';
import Register from '../Register.jsx';

class Header extends React.Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div  className="left">
                  <div className="dropdown">
  <button className="dropbtn">Dropdown</button>
  <div className="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
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