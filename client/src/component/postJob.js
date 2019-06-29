import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createJobpost} from '../actions/postAction';


class PostJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            job_title:'',
            description:'',
            location:'',
            address:'',
            website:'',
        }
    }
    
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })  
    }
    submitHandler = (e) =>{
        e.preventDefault();
        const postJobData = {
            company_id:this.props.auth.user.userId,
            name:this.props.auth.user.userName,
            job_title:this.state.job_title,
            description:this.state.description,
            location:this.state.location,
            address:this.state.address,
            website:this.state.website
        }
        this.props.createJobpost(postJobData,  this.props.history)
        this.setState({
            job_title:'',
            description:'',
            location:'',
            address:'',
            website:'',
        })
    }
    render() {
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2>Post a New Job</h2>
                </div>
                <div className="sixteen wide column">
                   <div className="ui segment">
                        <form className="ui form" onSubmit={this.submitHandler}>
                            <div className="field">
                                <label>Job Title</label>
                                <input type="text" onChange={this.changeHandler} name="job_title" value={this.state.job_title} />
                            </div>
                            <div className="field">
                                <label>Description</label>
                                <input type="text" onChange={this.changeHandler} name="description" value={this.state.description} />
                            </div>
                            <div className="field">
                                <label>Location</label>
                                <input type="text" onChange={this.changeHandler} name="location" value={this.state.location} />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" onChange={this.changeHandler} name="address" value={this.state.address} />
                            </div>
                            <div className="field">
                                <label>Website</label>
                                <input type="text" onChange={this.changeHandler} name="website" value={this.state.website} />
                            </div>
                            <div className="field" style={{"textAlign":"center"}}>
                                <label>&nbsp;</label>
                                <button className="ui small labeled icon blue button"><i className="right arrow icon"></i> submit</button>
                            </div>
                        </form>
                   </div>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth:state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {createJobpost})(PostJob)