import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob} from '../actions/postAction';


class PostedJobsView extends Component {
    componentDidMount(){
        this.props.getsingleJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        const {job, count} = this.props.jobpost.job;
        const {loading} = this.props.jobpost
        console.log('job ', job)
        console.log('count', count)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Your Posted Job List View</h2>
                    <Link to={'/post_newjob/'+user.userId} className="ui orange mini right floated icon labeled button"><i className="plus icon"></i> Post new Job</Link>
                </div>
               
                <div className="sixteen wide column">
                    {
                        ((job == undefined || job.length == 0)?
                            <div>No Data found</div>:
                            ((job == null || count == null)?
                                <div className="ui loader active"></div>:
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
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob})(PostedJobsView)