import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob} from '../actions/postAction';
import DynamicTable from '../component/dynamic_table'


class PostedJobsView extends Component {
    componentDidMount(){
        this.props.getsingleJob(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        const {job} = this.props.jobpost.job;
        const {loading} = this.props.jobpost
        console.log('job',)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Your Posted Job List View</h2>
                    <Link to={'/post_newjob/'+user.userId} className="ui orange mini right floated icon labeled button"><i className="plus icon"></i> Post new Job</Link>
                </div>
               
                <div className="sixteen wide column">
                    {
                        ((job === undefined || job.length === 0 || job === null)?
                            <div className="ui loader active"></div>:
                            <DynamicTable data={job}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob})(PostedJobsView)