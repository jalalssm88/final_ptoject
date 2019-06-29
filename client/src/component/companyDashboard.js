import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob} from '../actions/postAction';
import { join } from 'path';


class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getsingleJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        const {job, loading} = this.props.job;
        console.log('jonnnnn====', job)
        console.log('porpss', this.props.job)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Posted Job List View</h2>
                    <Link to={'/post_newjob/'+user.userId} className="ui orange icon labeled right floated button"><i className="plus icon"></i> Post new Job</Link>
                </div>
                <div className="sixteen wide column">
                    {
                        job == null || loading ? <div className="ui loader active"></div>:
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
                                
                                job.map(job=>(
                                    <tr key={job._id}>
                                        <td>{job.name}</td>
                                        <td>{job.job_title}</td>
                                        <td>{job.location}</td>
                                        <td>{job.website}</td>
                                        <td>{job.address}</td>
                                    </tr>



                                ))
                            }
                        </tbody>
                    </table>
                    }
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