import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob, getApplication} from '../actions/postAction';


class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getApplication(this.props.auth.user.userId)
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
                    <h2 style={{'float':'left'}}>Applications List view</h2>
                </div>
                <div className="sixteen wide column">
                    <div className="ui segment">
                        <div className="ui three column grid">
                        {
                            job == undefined || job == null || loading == true ?<div className="ui loader active"></div>:
                            job.map(job=>(
                                <div key={job._id} className="column">
                                    <h3>{job.job_title}</h3>
                                    <Link to={"/application_view/"+job._id} className='ui mini green button'>view applications</Link>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob, getApplication})(CompanyDashboard)