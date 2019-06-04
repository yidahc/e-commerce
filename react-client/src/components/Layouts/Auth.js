import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions/user_actions.js';


export default function(ComposedClass,reload,adminRoute = null){
    class AuthCheck extends React.Component {
      constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
        componentDidMount(){
            this.props.dispatch(auth()).then(response =>{
                let user = this.props.user.userData;
                console.log(user);

                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/')
                    }
                } else{
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/UserDashboard')
                   /* } else{
                        if(reload === false){
                            this.props.history.push('/UserDashboard')
                        }*/
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