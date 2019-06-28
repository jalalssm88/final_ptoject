import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/authAction';
import {Link}  from 'react-router-dom';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
        }
    }
    // componentDidMount() {
    //     console.log('componentdidmount', this.props.auth)
    //     if (this.props.auth.isAuthenticated) {
    //       this.props.history.push('/dashboard');
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated && nextProps.auth.user.role == "student"){
            this.props.history.push('/student_dashboard');
        }else if(nextProps.auth.isAuthenticated && nextProps.auth.user.role == "company"){
            this.props.history.push('/company_dashboard')
        }
    }
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler = (e) =>{
        e.preventDefault();
        this.props.loginUser(this.state,  this.props.history)
        this.setState({
            email:'',
            password:''
        })
    }
    render() {
        return (
            <div className="ui grid stackable">
                <div className="four wide column" style={{'height':'1px'}}></div>
                <div className="eight wide column">
                    <div className="ui segment form_segment">
                        <h2 style={{'marginBottom':'2px'}}>Sign into your Account</h2>
                        <span><Link to="/signup">create account</Link></span>
                        <form onSubmit={this.submitHandler}>
                            <div className="ui form login_form">
                                <div className="field">
                                    <label>Email</label>
                                    <div className="ui left icon input">
                                        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
                                        <i className="user icon"></i>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <div className="ui left icon input">
                                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} />
                                        <i className="lock icon"></i>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>submit </label>
                                    <button className="ui blue fluid button">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="four wide column" style={{'height':'1px'}}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps,{loginUser})(Login);