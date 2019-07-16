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
        const {count} = this.props.applyjob.apply_student_job;
        return (
            
            <div className="ui grid">
                {
                    (((jobs == undefined || jobs.length==0 || jobs == null) && (count == undefined || count.length==0 || count == null))?
                    <div className="ui active loader"></div>:
                        <React.Fragment>
                            <div className="sixteen wide column">
                                <div className="ui stackable two column stretched grid">
                                    {
                                        jobs.map(newjob=>(
                                            <div className="column" key={newjob._id}>
                                                <div className="ui segment">
                                                    <div className="ui grid">
                                                        <div className="eleven wide column">
                                                            <span style={{'fontWeight':"bold","fontSize":"20px"}}>Job Title: <span style={{"fontWeight":"lighter"}}>{newjob.job_title}</span></span>
                                                            <p style={{"fontWeight":"bold", "marginBottom":"3px"}}>Company: <span style={{"fontWeight":"lighter"}}>{newjob.name}</span></p>
                                                            <p>{newjob.description}</p>
                                                            <div className="ui divider"></div>
                                                            <address>Address: <span>{newjob.address}</span></address>
                                                        </div>
                                                        <div className="five wide column" style={{"borderLeft":"1px solid #ccb7b7", "textAlign":"center"}}>
                                                            <h5 style={{"marginBottom":"0px"}}>location <label className="ui gray label">{newjob.location}</label></h5>
                                                            <label>Visit : <Link>{newjob.website}</Link></label>
                                                            <div>
                                                                <Link style={{'marginTop':"34px"}} to={'/apply_job/'+newjob._id+'/'+newjob.company_id} className="ui mini green button">Apply now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
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