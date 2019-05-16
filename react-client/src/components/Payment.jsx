import React from 'react';

//import Products from './Products.jsx';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    }
  }

  render () {
    return (  
      <div>I am the payment component
      </div>
    )
  }
}
export default Payment;
