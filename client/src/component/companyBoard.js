import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"

class CompanyDashboard extends Component {
  
    render() {
        const { user } = this.props.auth;
        console.log('user in dashboard', user)
        console.log('prpssss',this.props)
        return (
            <div className="ui grid">
               <div className="sixteen wide column">
                  <h2 style={{'float':'left'}}>Posted Job List View</h2>
                  <Link to={'/post_job/'+user.userId} className="ui orange icon labeled right floated button"><i className="plus icon"></i> Post Job</Link>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(CompanyDashboard)