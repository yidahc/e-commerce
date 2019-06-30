import React from 'react';
import MainCarousel from '../components/MainCarousel.jsx';
import CardBlock from '../utils/cardBlock.js'

import { getProductsBySales, getProductsByArrival } from '../actions/product_actions.js';
import { connect } from 'react-redux';


class Home extends React.Component {

  componentDidMount(){
    this.props.dispatch(getProductsBySales());
    this.props.dispatch(getProductsByArrival());
}


  render () {
    return (  
      <div>
        <MainCarousel />
        <CardBlock
                    list={this.props.products.bySales}
                    title="Los Mas Deseados"
                />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      products: state.products
  }
}

export default connect(mapStateToProps)(Home);