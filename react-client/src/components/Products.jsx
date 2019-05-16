import React from 'react';

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
      <div>I am the Products component</div>
    )
  }
}
export default Products;