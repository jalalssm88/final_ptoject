import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getShortlistedJob} from '../actions/postAction';
import DynamicTable from '../component/dynamic_table'


class StudentShortlistedJob extends Component {
    componentDidMount(){
        this.props.getShortlistedJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        // const {job} = this.props.jobpost.job;
       const {data} = this.props.applyjob.get_shortlisted_job
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Shortlisted Job Lists</h2>
                    {/* <Link to={'/post_newjob/'+user.userId} className="ui orange mini right floated icon labeled button"><i className="plus icon"></i> Post new Job</Link> */}
                </div>
               
                <div className="sixteen wide column">
                    {
                        ((data === undefined || data.length === 0 || data === null)?
                            <div className="ui loader active"></div>:
                            <DynamicTable data={data}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost,
    applyjob: state.getapply_job
});

export default connect(mapStateToProps, {getShortlistedJob})(StudentShortlistedJob)