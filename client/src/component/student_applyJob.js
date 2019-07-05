import React, { Component } from 'react';
import { connect } from 'react-redux';
import {applyJobpost, getApplyjobStudent} from '../actions/postAction';
import DynamicTable from './dynamic_table'

class StudentApplyJob extends Component {
    componentDidMount(){
        this.props.getApplyjobStudent(this.props.auth.user.userId)
    }
    render() {
        const {datas} = this.props.applyjob.apply_student_job;
        console.log('datassssssss in std dashboard', datas)
        console.log('type of datas', typeof(datas))
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 id="main_header"> Your Applied Job List View</h2>
                    <hr style={{"width":"10%", "float":"left"}}/>
                </div>
               <div className="sixteen wide column">
                    {
                        ( (datas == undefined || datas.length == 0)? <div>No Data found</div>:
                            ( ( datas == null  )?<div className="ui loader active"></div>
                                :
                                <DynamicTable data = {datas} />
                            )
                        )
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