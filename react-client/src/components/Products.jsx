import React from 'react';
import { connect } from 'react-redux';

import LoadmoreCards from  '../utils/loadmorecards.js';
import PageTop from  '../utils/pagetop.js';
import CollapseRadio from  '../utils/collapseRadio.js';
import CollapseCheckbox from  '../utils/collapseCheckbox.js';


import { getProductsToShop, getBrands, getCategories } from '../actions/product_actions.js'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';


const price = [
  {
      "_id":0,
      "name":"Cualquiera",
      "array":[]
  },
  {
      "_id":1,
      "name":"$0 a $199",
      "array":[0,199]
  },
  {
      "_id":2,
      "name":"$200 a $399",
      "array":[200,399]
  },
  {
      "_id":3,
      "name":"$400 a $599",
      "array":[400,599]
  },
  {
      "_id":4,
      "name":"$600 a $799",
      "array":[600,799]
  },
  {
      "_id":5,
      "name":"Mas de $800",
      "array":[800,1500000]
  }
]


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      brands: [],
      categories: [],
      toShopSize: 0,
      grid:'',
      limit:20,
      skip:0,
      filters:{
          brand:[],
          category:[],
          price:[]
      }
    }
    this.handlePrice = this.handlePrice.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
    this.showFilteredResults = this.showFilteredResults.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
}

    componentDidMount(){
      this.props.dispatch(getBrands()).then(response =>{
        this.setState ({
            brands: this.props.products.brands
        })
      });
      this.props.dispatch(getCategories()).then(response =>{
        this.setState ({
            categories: this.props.products.categories
        })
      });
      this.props.dispatch(getProductsToShop(
         this.state.skip,
         this.state.limit,
         this.state.filters
     )).then(response =>{
        this.setState ({
            toShopSize: this.props.products.toShopSize,
            toShop: this.props.products.toShop,
            loading: false
        })
      });
  };

 

  handlePrice (value) {
    const data = price;
    let array = [];

    for(let key in data){
        if(data[key]._id === parseInt(value,10)){
            array = data[key].array
        }
    }
    return array;
}

handleFilters (filters,category) {
  const newFilters = this.state.filters
  newFilters[category] = filters;

   if(category === "price"){
       let priceValues = this.handlePrice(filters);
       newFilters[category] = priceValues
   }

  this.showFilteredResults(newFilters)
  this.setState({
      filters: newFilters
  })
}

showFilteredResults (filters) {
   this.props.dispatch(getProductsToShop(
       0,
       this.state.limit,
       filters
   )).then(()=>{
       this.setState({
           skip:0,
           toShop: this.props.products.toShop
       })
   })
}

loadMoreCards () { 
  let skip = this.state.skip + this.state.limit;

  this.props.dispatch(getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.state.toShop
  )).then(()=>{
      this.setState({
          skip: skip,
          toShop: this.props.products.toShop
      })
  })
}

handleGrid () {
  this.setState({
      grid: !this.state.grid ? 'grid_bars':''
  })
}

  render () {
      console.log(this.props.products)
      console.log(this.state)
    return (  
      <div>
      <PageTop
          title="Productos"
      />
      <div className="container">
          <div className="shop_wrapper">
              <div className="left">
              { !this.state.loading ? 
               <div>
                  <CollapseCheckbox
                      initState={true}
                      title="Marcas"
                      list={this.state.brands}
                      handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                  />
                  <CollapseCheckbox
                      initState={false}
                      title="Categorias"
                      list={this.state.categories}
                      handleFilters={(filters)=> this.handleFilters(filters,'category')}
                  />
                   <CollapseRadio
                      initState={true}
                      title="Precio"
                      list={price}
                      handleFilters={(filters)=> this.handleFilters(filters,'price')}
                  />
                  </div>
                : null
              }
              </div>
              <div className="right">
                  <div className="shop_options">
                      <div className="shop_grids clear">
                          <div
                              className={`grid_btn ${this.state.grid?'':'active'}`}
                              onClick={()=> this.handleGrid()}
                          >
                              <FontAwesomeIcon icon={faTh}/>
                          </div>
                          <div
                              className={`grid_btn ${!this.state.grid?'':'active'}`}
                              onClick={()=> this.handleGrid()}
                          >
                              <FontAwesomeIcon icon={faBars}/>
                          </div>
                      </div>
                  </div>
                  <div style={{clear:'both'}}>

    <LoadmoreCards
                          grid={this.state.grid}
                          limit={this.state.limit}
                          size={this.state.toShopSize}
                          products={this.state.toShop}
                          loadMore={()=> this.loadMoreCards()}
                      />
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      products: state.products
  }
}

export default connect(mapStateToProps)(Products);

