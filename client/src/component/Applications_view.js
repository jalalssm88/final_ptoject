import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {getApplicationDetail} from '../actions/postAction';


class ApplicationsView extends Component {
    componentDidMount(){
        this.props.getApplicationDetail(this.props.match.params.id)
    }
    render() {
     const {counts, data} = this.props.application_detail.get_application_detail
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Application Detail view</h2>
                </div>
                {
                    (counts == undefined || counts == null)&&(data== undefined || data ==null)?
                    <div className="ui active loader"></div>:
                    <div className="sixteen wide column">
                        <div className="ui segment">
                            <h4>Total application for this job: <span>{counts}</span></h4>  
                        </div>
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>qualification</th>
                                    <th>experience</th>
                                    <th>Skills</th>
                                    <th>Cv</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(items=>(
                                        <tr key={items._id}>
                                            <td>{items.name}</td>
                                            <td>{items.email}</td>
                                            <td>{items.qualification}</td>
                                            <td>{items.experience}</td>
                                            <td>{items.skills}</td>
                                            <td>{items.file_cv}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    application_detail:state.getapply_job
});

export default connect(mapStateToProps, { getApplicationDetail})(ApplicationsView)