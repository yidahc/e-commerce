import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Home from './components/Home.jsx';
import Payment from './components/Payment.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx';
import Layout from './components/Layouts/Layout.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './Reducers';

const createMyStore = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    axios.get('/api/product/brands').then(response => {
      console.log(response)
    })
  }

 /*
  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
*/
  render () {
    return ( 
    <Provider store={createMyStore(Reducer, 
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>     
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Products' render={(props) => <Products {...props} postData={this.postData} />} />
            <Route exact path='/Payment' render={(props) => <Payment {...props} postData={this.postData} />} />
            <Route exact path='/Cart' component={Cart} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));