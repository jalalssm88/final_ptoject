import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getsingleJob} from '../actions/postAction';


class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getApplication(this.props.auth.user.userId)
    }
    render() {
        const { user } = this.props.auth;
        const {job, count} = this.props.jobpost.job;
        // const {loading} = this.props.jobpost
        // console.log('job ', job)
        // console.log('count', count)
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Applications List view</h2>
                </div>
                <div className="sixteen wide column">
                    <div className="ui segment">
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost
});

export default connect(mapStateToProps, {getsingleJob})(CompanyDashboard)