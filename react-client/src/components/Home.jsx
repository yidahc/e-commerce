import React from 'react';
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
      <div>I am the home Component</div>
    )
  }
}
export default Home;