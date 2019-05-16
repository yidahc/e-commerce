import React from 'react';
import { NavLink} from 'react-router-dom';
//import Products from './Products.jsx';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    }
  }
  render () {
    return (  
      <div>I am the Products component
        <NavLink to="/payment"><button>payment</button></NavLink>
      </div>
    )
  }
}
export default Products;