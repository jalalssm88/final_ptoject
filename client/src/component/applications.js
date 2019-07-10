import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getApplication} from '../actions/postAction';


class CompanyDashboard extends Component {
    componentDidMount(){
        this.props.getApplication(this.props.auth.user.userId)
    }
    render() {
        const {data} = this.props.getapply_job.get_application_count
        console.log('data', data)
        // var my_data = []
        // if(data !== undefined || data!== null){
        //     my_data.push(data)
        // }
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Applications List view</h2>
                </div>
                <div className="sixteen wide column">
                    <div className="ui three column grid">
                        {
                            data == undefined || data == null || data.length ==0?<div className="ui active loader"></div>:
                            data.map(item=>(
                                <div key={item.id} className="column">
                                    <div className="ui segment" style={{"height":"120px"}}>
                                        <h3>{item.name}</h3>
                                        <div className="ui divider"></div>
                                        <div>
                                            <p style={{"float":"left","fontSize":"20px"}}>Total count: <span style={{"fontSize":"22px"}}>{item.count}</span></p>
                                            <Link to={"/application_view/"+item.id} className='ui mini green button right floated'>view applications</Link>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                            
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost:state.jobpost,
    getapply_job:state.getapply_job
});

export default connect(mapStateToProps, { getApplication})(CompanyDashboard)