import React from 'react';
import { NavLink} from 'react-router-dom';
import MainCarousel from './MainCarousel.jsx';
import Login from './Login.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    }
  }
  render () {
    return (  
      <div>
        <MainCarousel />
        <NavLink to="/products"><button>products</button></NavLink>
        <Login />
      </div>
    );
  }
}
export default Home;