import React, { Component } from 'react'
import { connect } from 'react-redux';


class Apply extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            contact:'',
            qualification:'',
            address:'',
            Skills:''
        }
    }
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler = (e) =>{
        // e.preventDefault();
        // this.props.loginUser(this.state,  this.props.history)
        // this.setState({
        //     email:'',
        //     password:''
        // })
        // this.setState({
        //     email:'',
        //     password:''
        // })
    }
    render() {
        console.log('user in apply form', user)
        console.log('prpssss',this.props)
        return (
            <div className="ui grid">
               <div className="sixteen wide column">
                   <div className="ui segment">
                        <form className="ui form" onSubmit={this.submitHandler}>
                            <div className="field">
                                <label>Name</label>
                                <input type="text" onChange={this.changeHandler} name="name" value={this.state.name} />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="text" onChange={this.changeHandler} name="email" value={this.state.email} />
                            </div>
                            <div className="field">
                                <label>Contact</label>
                                <input type="text" onChange={this.changeHandler} name="contact" value={this.state.contact} />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" onChange={this.changeHandler} name="address" value={this.state.address} />
                            </div>
                            <div className="field">
                                <label>Qualification</label>
                                <input type="text" onChange={this.changeHandler} name="qualification" value={this.state.qualification} />
                            </div>
                            <div className="field">
                                <label>Skills</label>
                                <input type="text" onChange={this.changeHandler} name="skills" value={this.state.skills} />
                            </div>
                            <div className="field">
                                <label>&nbsp;</label>
                                <button className="ui blue button">submit</button>
                            </div>
                        </form>
                   </div>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Apply)