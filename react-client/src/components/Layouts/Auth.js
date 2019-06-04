import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedClass,reload,adminRoute = null){
    class AuthCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response =>{
                let user = this.props.user.userData;
                console.log(user);

                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/')
                    }
                } else{hentication
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    } else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
                this.setState({loading:false})
            })
        }


        render() {
            if(this.state.loading){
                return (
                    <div>
                        Insert Loader Here
                    </div>
                )
            }
            return (
               <ComposedClass {...this.props} user={this.props.user}/>
            );
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthCheck)
}