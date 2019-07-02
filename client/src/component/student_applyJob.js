import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import {applyJobpost, getApplyjobStudent} from '../actions/postAction';


class StudentApplyJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            contact:'',
            qualification:'',
            experience:'',
            skills:''
        }
    }
    componentDidMount(){
        this.props.getApplyjobStudent(this.props.auth.user.userId)
    }
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        var $form = document.getElementById('apply_job');
        let data = new FormData($form);
        this.props.applyJobpost(data)
    }
    render() {
        const {datas, count} = this.props.applyjob.apply_student_job;
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2>Applied Job List View</h2>
                </div>
               <div className="sixteen wide column">
                    <table className="ui celled table">
                        <tbody>
                            {
                                datas.map(item=>(
                                    <tr>
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