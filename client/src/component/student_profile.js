import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getApplyjobStudent} from '../actions/postAction';



class StudentProfile extends Component {
    componentDidMount(){
        const { user } = this.props.auth;
        this.props.getApplyjobStudent(this.props.auth.user.userId);
    }
    render() {
        const { user } = this.props.auth;
        const {count} = this.props.applyjob.apply_student_job;
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
               
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    application_detail:state.getapply_job,
    applyjob: state.getapply_job
});
export default connect(mapStateToProps, { getApplyjobStudent })(StudentProfile)