import React, { Component } from 'react'
import {connect} from 'react-redux';
import {createUser} from '../actions/authAction'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:''
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
            <div className="ui grid">
                <div className="four wide column"></div>
                <div className="eight wide column">
                    <div className="ui segment" style={{"marginTop":"40px"}}>
                        <form onSubmit={this.submitHandler} className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} />
                            </div>
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
                                <button className="ui blue fluid button">Sign up</button>
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
    user:state.user
})

export default connect(mapStateToProps,{createUser})(Signup);