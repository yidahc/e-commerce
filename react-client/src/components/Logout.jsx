import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    }
  }
  render () {
    return (  
      <div>I am the Logout component
      </div>
    )
  }
}
export default Logout;
