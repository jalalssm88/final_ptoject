import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob, getApplication} from '../actions/postAction';

class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getsingleJob(this.props.auth.user.userId)
        this.props.getApplication(this.props.auth.user.userId)
    }

    render() {
        const { user } = this.props.auth;
        const {count} = this.props.jobpost.job;
        const {counts} = this.props.getapply_job.get_application_count
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Company Dashboard</h2>
                </div>
                {
                    ((count === undefined || counts === undefined)?
                        <div className="ui active loader"></div>:
                        <div className="sixteen wide column">
                            <div className="ui three column grid">
                                <div className="column">
                                    <div className="ui segment" style={{"height":"126px","textAlign":"center"}}>
                                        <h3>Wellcome: <span>{user.userName}</span></h3>
                                        <Link to={'/post_newjob/'+user.userId} className="ui orange mini icon labeled button"><i className="plus icon"></i> Post new Job</Link>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui segment counts_segment">
                                        <h4>{count}</h4>
                                        <p>Total job posted</p>
                                        <Link to={`/posted_job_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui segment counts_segment">
                                        <h4>{counts}</h4>
                                        <p>No of Applications</p>
                                        <Link to={`/application_listview/${user.userId}`} className="ui mini blue button">view all</Link> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost,
    getapply_job:state.getapply_job
});

export default connect(mapStateToProps, {getsingleJob, getApplication})(CompanyDashboard)