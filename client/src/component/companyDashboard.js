import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob} from '../actions/postAction';


class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getsingleJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        const {job, loading} = this.props.job;
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Posted Job List View</h2>
                    <Link to={'/post_newjob/'+user.userId} className="ui orange icon labeled right floated button"><i className="plus icon"></i> Post new Job</Link>
                </div>
                <div className="sixteen wide column">
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Job Title</th>
                                <th>Location</th>
                                <th>Website</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                job == null || loading?<div className="ui loader active">loading</div>:
                            
                                job.map(jobss=>(
                                    <tr>hello</tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    job:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob})(CompanyDashboard)