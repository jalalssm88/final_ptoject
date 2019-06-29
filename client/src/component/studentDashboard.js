import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {getJobpost} from '../actions/postAction';

class StudentDashboard extends Component {
    componentDidMount(){
        this.props.getJobpost();
    }
    render() {
        const { user } = this.props.auth;
        const { jobs } = this.props.jobpost.jobs
        console.log('props in std ddash', this.props.jobpost.jobs)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
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
    jobpost: state.jobpost
});

export default connect(mapStateToProps, {getJobpost})(StudentDashboard)