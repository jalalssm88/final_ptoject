import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {getJobpost, getApplyjobStudent} from '../actions/postAction';

class StudentDashboard extends Component {
    componentDidMount(){
        this.props.getJobpost();
        this.props.getApplyjobStudent(this.props.auth.user.userId);
    }
    render() {
        const { user } = this.props.auth;
        const { jobs } = this.props.jobpost.jobs
        console.log('props in std ddash', this.props)
        const {apply_student_job} = this.props.applyjob
        console.log('apply student job', apply_student_job)
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <div className="ui segment">
                        <h1>Applied Jobs</h1>
                    </div>
                    <div className="ui segment">
                        
                    </div>
                </div>
                <div className="twelve wide column">
                    <div className="ui segment">
                        <h1>Latest Jobs</h1>
                    </div>
                    {
                        jobs==undefined?console.log('empy'): jobs.map(newjob=>(
                                <div className="ui segment" key={newjob._id}>
                                    <h3>{newjob.name}</h3>
                                    <h5>{newjob.job_title}</h5>
                                    <p>{newjob.description}</p>
                                    <h6>Location: <span>{newjob.location}</span></h6>
                                    <h6>Address: <span>{newjob.address}</span></h6>
                                    <h6>Visit website: <span>{newjob.website}</span></h6>
                                    <Link to={'/apply_job/'+newjob._id} className="ui small green button">Apply now</Link>
                                </div>
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
    jobpost: state.jobpost,
    applyjob: state.getapply_job
});

export default connect(mapStateToProps, {getJobpost, getApplyjobStudent})(StudentDashboard)