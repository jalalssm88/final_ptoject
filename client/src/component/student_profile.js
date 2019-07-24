import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getApplyjobStudent, getRejectedJob, getShortlistedJob} from '../actions/postAction';



class StudentProfile extends Component {
    componentDidMount(){
        const { user } = this.props.auth;
        this.props.getApplyjobStudent(this.props.auth.user.userId);
        this.props.getRejectedJob(this.props.auth.user.userId);
        this.props.getShortlistedJob(this.props.auth.user.userId)

    }
    render() {
        const { user } = this.props.auth;
        const {count} = this.props.applyjob.apply_student_job;
        const {reject_counts} = this.props.applyjob.get_rejected_job;
        const {shortlist_counts} = this.props.applyjob.get_shortlisted_job
        console.log('props', this.props)
        return (
            <div className="ui grid">
                <div className="twelve wide column">
                    <div className="ui segment" style={{"height":"124px","paddingTop": "49px", "textAlign":"center"}}>
                        <h3>Welcome: <span>{user.userName}</span></h3>
                    </div> 
                </div>
                <div className="four wide column">
                    <div className="ui one column grid">
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{count}</h4>
                                <p>Total Jobs Applied</p>
                                <Link to={`/applied_job_list/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{shortlist_counts}</h4>
                                <p>Shortlisted Jobs</p>
                                <Link to={`/student_shortlisted_job/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{reject_counts}</h4>
                                <p>Rejected Jobs</p>
                                <Link to={`/student_rejected_job/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    application_detail:state.getapply_job,
    applyjob: state.getapply_job
});
export default connect(mapStateToProps, { getApplyjobStudent, getRejectedJob, getShortlistedJob })(StudentProfile)