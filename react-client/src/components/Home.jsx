import React from 'react';
import { NavLink} from 'react-router-dom';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Register from './Register.jsx';
import $ from 'jquery';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: ['1', '2', '3', '4'],
      loggedIn: false
    }
    this.logged = this.logged.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleKeyPress (event) {
    console.log("sdsd")
    if(event.keyCode == 39){
      console.log("wut")
      $(".bx-next").click();
    }
  }

  logged () {this.setState({ loggedIn: !this.state.loggedIn })}

  render () {
    return (  
      <div>
        <Login logged={this.logged}/>
        <Register />
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/slide1.jpg" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/slide2.jpg" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/slide3.jpg" alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
<NavLink to="/products"><button>Productos</button></NavLink>
      </div>
    );
  }
}
export default Home;