import React, { Component } from 'react'
import {connect} from 'react-redux';
import {loginUser} from '../actions/authAction'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    // componentDidMount() {
    //     if (this.props.auth.isAuthenticated) {
    //       this.props.history.push('/dashboard');
    //     }
    // }
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
        this.setState({
            email:'',
            password:''
        })
    }
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column"></div>
                <div className="eight wide column">
                    <div className="ui segment" style={{"marginTop":"40px"}}>
                        <form onSubmit={this.submitHandler} className="ui form">
                            <div className="field">
                                <label>Email</label>
                                <input type="text" name="email" value={this.state.email} onChange={this.changeHandler} />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                            </div>
                            <div className="field">
                                <label>&nbsp;</label>
                                <button className="ui blue fluid button">Login up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="four wide column"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps,{loginUser})(Login);