import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        email: '',
        password: '',
        showForm: false
      };
    //  this.onChange=this.onChange.bind(this);
      this.openForm = this.openForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    openForm() { this.setState ({ showForm: !this.state.showForm }) };
    
    handleSubmit(e) {
      e.preventDefault();
      const { email, password } = this.state;
      this.props.addItems('./api/users/login', {
        email: email,
        password: password,
    });
  
      this.setState({
        email: '',
        password: '',
      });
    };

    render () {
        return (
        <span>   
          Hello   
          <button className="open-button" onClick={this.openForm}>Open Form</button>
          <div className="form-popup" id="myForm" style={{display: this.state.showForm ? 'inline' : 'none' }}>
          <form action="/action_page.php" className="form-container">
          <h1>Login</h1>
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required/>
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
        <button type="submit" className="btn">Login</button>
        <button type="button" className="btn cancel" onClick={this.openForm}>Close</button>
        </form>
        </div>
        </span>
        )
    }
}

export default Login;