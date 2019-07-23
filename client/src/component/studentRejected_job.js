import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getRejectedJob} from '../actions/postAction';
import DynamicTable from '../component/dynamic_table'


class StudentRejectedJob extends Component {
    componentDidMount(){
        this.props.getRejectedJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        // const {job} = this.props.jobpost.job;
       const {data} = this.props.applyjob.get_rejected_job
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Your Posted Job List View</h2>
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

export default connect(mapStateToProps, {getRejectedJob})(StudentRejectedJob)