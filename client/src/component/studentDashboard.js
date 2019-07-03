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
        console.log('')
        return (
            
            <div className="ui grid">
                {
                    (((jobs == undefined || jobs.length==0 || jobs == null) && (count == undefined || count.length==0 || count == null))?
                    <div className="ui active loader"></div>:
                        <React.Fragment>
                            <div className="sixteen wide column">
                                <div className="ui four column grid">
                                    <div className="column">
                                        <div className="ui segment" style={{"height":"124px","paddingTop": "49px", "textAlign":"center"}}>
                                            <h3>Welcome: <span>{user.userName}</span></h3>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui segment counts_segment">
                                            <h4>{count}</h4>
                                            <p>No of Job Applied</p>
                                            <Link to={`/applied_job_list/${user.userId}`} className="ui mini blue button">view all</Link> 
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui segment counts_segment">
                                            <h4>5</h4>
                                            <p>No of Job Aproved</p>
                                            <Link to={`/posted_job_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui segment counts_segment">
                                            <h4>5</h4>
                                            <p>No of Job Rejected</p>
                                            <Link to={`/posted_job_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sixteen wide column">
                                <div className="ui stackable two column centered grid">
                                    {
                                        jobs.map(newjob=>(
                                            <div className="column" key={newjob._id}>
                                                <div className="ui segment">
                                                    <h3>{newjob.name}</h3>
                                                    <h5>{newjob.job_title}</h5>
                                                    <p>{newjob.description}</p>
                                                    <h6>Location: <span>{newjob.location}</span></h6>
                                                    <h6>Address: <span>{newjob.address}</span></h6>
                                                    <h6>Visit website: <span>{newjob.website}</span></h6>
                                                    <Link to={'/apply_job/'+newjob._id} className="ui small green button">Apply now</Link>
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