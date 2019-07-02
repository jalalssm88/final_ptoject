import React, { Component } from 'react';
import { connect } from 'react-redux';
import {applyJobpost, getApplyjobStudent} from '../actions/postAction';

class StudentApplyJob extends Component {
    componentDidMount(){
        this.props.getApplyjobStudent(this.props.auth.user.userId)
    }
    render() {
        const {datas} = this.props.applyjob.apply_student_job;
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 id="main_header"> Your Applied Job List View</h2>
                    <hr style={{"width":"10%", "float":"left"}}/>
                </div>
               <div className="sixteen wide column">
                    {datas == null? <div className="ui loader active"></div>:
                    <table className="ui celled table">
                        <thead>
                            <tr>
                            {
                                datas == null?console.log('load'):Object.keys(datas[0]).map((header, index)=>(
                                    <th key={index}>{header}</th>
                                ))                           
                            }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                datas.map((item, index)=>(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.experience}</td>
                                        <td>{item.company}</td>
                                        <td>{item.apply_for}</td>


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    }
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    applyjob: state.getapply_job

});

export default connect(mapStateToProps, {applyJobpost, getApplyjobStudent})(StudentApplyJob)