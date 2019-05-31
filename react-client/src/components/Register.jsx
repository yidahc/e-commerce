import React from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/form.js';
import { update, generateData, isFormValid } from '../utils/formlogic.js';
import { loginUser } from '../actions/user_actions.js';
import { withRouter } from 'react-router-dom';


class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        email: '',
        password: '',
        name: '',
        lastname: '',
        showForm: false
      };
      this.handleInput = this.handleInput.bind(this);
      this.postData = this.postData.bind(this);
      this.openForm = this.openForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    openForm() { this.setState ({ showForm: !this.state.showForm }) };
    
    handleInput(event) {
      const {target} = event;
      const {name, value} = target;
    
      this.setState({
        [name]:value
      }); // name and value are in target
    }

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
      const { email, password, name, lastname } = this.state;
      this.postData('./api/users/register', {
        email: email,
        password: password,
        name: name,
        lastname: lastname,
    });
  
      this.setState({
        email: '',
        password: '',
        name: '',
        lastname: '',
      });
    };

    render () {
      const { email, password, name, lastname } = this.state;
        return (
        <span>   
          <button className="open-button" onClick={this.openForm}>Crea Una Cuenta</button>
          <div className="form-popup" id="myForm" style={{display: this.state.showForm ? 'inline' : 'none' }}>
          <form action="/action_page.php" className="form-container">
          <h1>Register</h1>
            <label><b>Nombre</b></label>
              <input 
                type="text" 
                placeholder="Nombre" 
                name="name" 
                value={name} 
                onChange={this.handleInput}
                required
              />
            <label><b>Apellido</b></label>
              <input 
                type="text" 
                placeholder="Apellido" 
                name="lastname" 
                value={lastname} 
                onChange={this.handleInput}
                required
              />
            <label><b>Email</b></label>
              <input 
                type="text" 
                placeholder="Email" 
                name="email" 
                value={email} 
                onChange={this.handleInput}
                required
              />
            <label><b>Contraseña</b></label>
              <input 
                type="password" 
                placeholder="Contraseña" 
                name="password" 
                value={password} 
                onChange={this.handleInput}
                required
              />
            <button type="submit" className="btn" onClick={this.handleSubmit}>Crear Cuenta</button>
          <button type="button" className="btn cancel" onClick={this.openForm}>Cerrar</button>
        </form>
        </div>
        </span>
        )
    }
}

export default connect()(withRouter(Register));