import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class Layout extends React.Component {
  render() {
      return (
          <div>
              <Header />
              <div className="page_container">
                  {this.props.children}
              </div>
              <Footer />                    
          </div>
      );
  }
}

export default Layout;