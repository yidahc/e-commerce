import React from 'react';
import { NavLink} from 'react-router-dom';
//import Products from './Products.jsx';

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
        <NavLink to="/products"><button>products</button></NavLink>
      </div>
    );
  }
}
export default Home;