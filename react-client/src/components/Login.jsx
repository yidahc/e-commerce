import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        email: '',
        password: '',
        showForm: false
      };
      this.handleInput = this.handleInput.bind(this);
      this.postData = this.postData.bind(this);
      this.openForm = this.openForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    openForm() { this.setState ({ showForm: !this.state.showForm }) };
    
    postData (url= '', data= {}) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {console.log(response) })
      .catch(err => console.error(err));
    }

    handleSubmit(e) {
      e.preventDefault();
      const { email, password } = this.state;
      this.postData('./api/users/login', {
        email: email,
        password: password,
    });
      
      this.setState({
        email: '',
        password: '',
      });
    };

    handleInput(event) {
      const {target} = event;
      const {name, value} = target;
    
      this.setState({
        [name]:value
      }); // name and value are in target
    }

   
    render () {
      const { email, password } = this.state;
        return (
          <span>      
          <button className="open-button" onClick={this.openForm}>Iniciar Sesion</button>
          <div className="form-popup" id="myForm" style={{display: this.state.showForm ? 'inline' : 'none' }}>
          <form action="/action_page.php" className="form-container">
          <h1>Login</h1>
            <label><b>Email</b></label>
              <input 
                type="text" 
                placeholder="Enter Email" 
                name="email" 
                value={email} 
                onChange={this.handleInput}
                required
              />
            <label><b>Password</b></label>
              <input 
                type="password" 
                placeholder="Enter Password" 
                name="password" 
                value={password} 
                onChange={this.handleInput}
                required
              />
            <button type="submit" className="btn" onClick={this.handleSubmit}>Login</button>
          <button type="button" className="btn cancel" onClick={this.openForm}>Close</button>
        </form>
        </div>
        </span>
        )
    }
}

export default Login;