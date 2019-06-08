import React from 'react';
import { NavLink} from 'react-router-dom';
import $ from 'jquery';
import MainCarousel from '../components/MainCarousel.jsx'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false
    }
    this.logged = this.logged.bind(this);
  }


  logged () {this.setState({ loggedIn: !this.state.loggedIn })}

  render () {
    return (  
      <div>
     <MainCarousel />
      </div>
    );
  }
}
export default Home;