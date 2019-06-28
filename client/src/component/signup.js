import React, { Component } from 'react'
import {connect} from 'react-redux';
import {createUser} from '../actions/authAction'
import { withRouter } from 'react-router-dom';
import {Link}  from 'react-router-dom'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            role:''
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler = (e) =>{
        e.preventDefault();
        this.props.createUser(this.state, this.props.history)
    }
    render() {
        return (
            <div className="ui grid stackable">
                <div className="four wide column" style={{'height':'1px'}}></div>
                <div className="eight wide column">
                    <div className="ui segment form_segment">
                        <h2 style={{'marginBottom':'2px'}}>Create and Account</h2>
                        <span><Link to="/login">already have account</Link></span>
                        <form onSubmit={this.submitHandler}>
                            <div className="ui form signup_form">
                                <div className="field">
                                    <label>Name</label>
                                    <div className="ui left icon input">
                                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler} />
                                        <i className="user icon"></i>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Email</label>
                                    <div className="ui left icon input">
                                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
                                        <i className="envelope icon"></i>
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
                                    <label>Role</label>
                                    <select name="role" onChange={this.changeHandler}>
                                        <option>-----------</option>
                                        <option value="company">Company</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>submit </label>
                                    <button className="ui blue fluid button">Create</button>
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

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps, { createUser  })(withRouter(Signup));