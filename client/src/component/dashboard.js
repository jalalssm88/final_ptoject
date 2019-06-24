import React, { Component } from 'react'
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
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
        const { user } = this.props.auth;
        console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrr', user)
        return (
            <div className="ui grid">
               <div className="sixteen wide column">
                   <div className="ui segment">
                       <h4>Biwits Pvt Ltd</h4>
                       <h5>Job Title: <span>Python Developer</span></h5>
                       <p>Require a python software developer for a Product baseed company in karachi</p>
                       <button className="ui small green button">Apply now</button>
                       {
                           console.log('userrrr', this.props)
                       }
                   </div>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard)