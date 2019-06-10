import React from 'react';
import Carousel, { Dots }  from '@brainhubeu/react-carousel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import '@brainhubeu/react-carousel/lib/style.css';
let Image1 = './images/slide10.jpg'; let alt1 = '';
let Image2 = './images/slide20.jpg'; let alt2 = '';
let Image3 = './images/slide30.jpg'; let alt3 = '';
let Image4 = './images/slide40.jpg';
let Image5 = './images/slide50.jpg';
let Image6 = './images/slide60.jpg';
let Image7 = './images/slide70.jpg';

class MainCarousel extends React.Component {
    constructor() {
      super()
      this.state = { 
        value: 0, 
      };
      this.onChange = this.onChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }
  
    handleKeyPress (event) {
      console.log('Hello')
      if(event.keyCode == 39){
        console.log("wut");
        this.onChange()
      }
    }

    onChange(value) {
      this.setState({ value });
    }
    render() {
        return (
    <div  className="mainCarousel">
    <Carousel 
     value={this.state.value}
     onChange={this.onChange}
     slides={[
       (<img src={Image1} alt= {alt1} />),
       (<img src={Image2} alt= {alt1} />),
       (<img src={Image3} alt= {alt1} />),
       (<img src={Image4} alt= {alt1} />),
       (<img src={Image5} alt= {alt1} />),
       (<img src={Image6} alt= {alt1} />),
       (<img src={Image7} alt= {alt1} />),
     ]}
     arrowLeft={<FontAwesomeIcon icon={faAngleDoubleLeft} className="icon-example" name="arrow-left" />}
     arrowRight={<FontAwesomeIcon icon={faAngleDoubleRight} className="icon-example" name="arrow-right" />}
     addArrowClickHandler
     clickToChange
     centered
     autoPlay={2500}
     animationSpeed={1000}  
     infinite
     onKeyDown={(e) => this.handleKeyPress(e)}
     />
    
    <Dots Dots value={this.state.value} onChange={this.onChange} number={3} />
  </div>
    );
    }
}

export default MainCarousel;

