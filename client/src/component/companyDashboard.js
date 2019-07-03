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
        const {job, count} = this.props.jobpost.job;
        const {loading} = this.props.jobpost
        console.log('job ', job)
        console.log('count', count)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Company Dashboard</h2>
                </div>
                <div className="sixteen wide column">
                    <div className="ui three column grid">
                        <div className="column">
                            <div className="ui segment">
                                <h3>Wellcome: <span>{user.userName}</span></h3>
                                <Link to={'/post_newjob/'+user.userId} className="ui orange mini icon labeled button"><i className="plus icon"></i> Post new Job</Link>
                            </div>
                         </div>
                        <div className="column">
                            <div className="ui segment">
                                <h4>{count}</h4>
                                <p>Total job posted</p>
                                <Link to={`/posted_job_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui segment">
                                <h4>4</h4>
                                <p>No of Applications</p>
                                <Link to={`/application_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="sixteen wide column">
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
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob})(CompanyDashboard)