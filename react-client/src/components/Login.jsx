import React from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/form.js';
import { update, generateData, isFormValid } from '../utils/formlogic.js';
import { loginUser } from '../actions/user_actions.js';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        formError: false,
        formSuccess: false,
        showForm: false,
        formdata: {
          email: {
            element: 'input',
            value: '',
            config: {
              name: 'email_input',
              type: 'email',
              placeholder: 'Dirección de email',
            },
            validation: {
              required: true,
              email: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
          },
          password: {
            element: 'input',
            value: '',
            config: {
              name: 'password_input',
              type: 'password',
              placeholder: 'Contraseña',
            },
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
          },
        }
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
      let dataToSubmit = generateData(this.state.formdata, 'login');
      let formIsValid = isFormValid(this.state.formdata, 'login')
      if (formIsValid) {
        this.props.dispatch(loginUser(dataToSubmit)).then(response => {
          if (response.payload.loginSuccess) {
            this.setState({
              formError: false,
              formSuccess: true,
              showForm: !this.state.showForm,
            });            
            this.props.history.push('/Products')
          } else {
            this.setState ({
              formError: true
            })
          }
        })
      } else {
        this.setState ({
          formError: true
        })        
      }
    };

    handleInput(element) {
     const newFormData = update(element, this.state.formdata, 'login');
     this.setState({
       formError: false,
       formdata: newFormData
     })
    }

   
    render () {
        return (
          <span>      
          <button className="dropbtn" onClick={this.openForm}>Iniciar Sesion</button>
          <div className="form-popup" id="myForm" style={{display: this.state.showForm ? 'block' : 'none' }}>
          <form onSubmit={(e)=>this.handleSubmit(e)} className="form-container">
          <h1 className="regLogTitle">Iniciar Sesion</h1>
            <div className="formTitles"><label><b>Email</b></label></div>
              <FormField
                id={'email'}
                formdata={this.state.formdata.email}
                change={(element)=> this.handleInput(element)}
                />
            <div className="formTitles"><label><b>Contraseña</b></label></div>
            <FormField
                id={'password'}
                formdata={this.state.formdata.password}
                change={(element)=> this.handleInput(element)}
                />
                {this.state.formError ? 
                  <div className= "error">
                    Correo electrónico o contraseña inválidos.
                  </div>
                  : null
                }
            <button className="fancyButton2" type="submit" onClick={(e)=>this.handleSubmit(e)}>Ingresar</button>
          <button className="fancyButton2" type="button" onClick={this.openForm}>Cerrar</button>
        </form>
        </div>
        </span>
        )
    }
}

export default connect()(withRouter(Login));