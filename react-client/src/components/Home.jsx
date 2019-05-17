import React from 'react';
import { NavLink} from 'react-router-dom';
import MainCarousel from './MainCarousel.jsx';

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
      </div>
    );
  }
}
export default Home;