import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getApplicationDetail, createRejectJob} from '../actions/postAction';
import DynamicTable from '../component/dynamic_table'
import {Link} from 'react-router-dom';


class ApplicationsView extends Component {
    componentDidMount(){
        this.props.getApplicationDetail(this.props.match.params.id)
    }
    shortlist = (e)=>{
        console.log('shortlisted', e)
    }
    reject = (e)=>{
        console.log('rejected', e)
        this.props.createRejectJob(e)
    }
    render() {
     const {data, counts} = this.props.application_detail.get_application_detail
     var message = "Total Application for this job is :"
     const {loading} = this.props.jobpost
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2 style={{'float':'left'}}>Application Detail view</h2>
                </div>
                <div className="sixteen wide column">
                    {
                        (data=== undefined || data ===null)?
                        <div className="ui active loader"></div>:
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(data[0]).map((header, index)=>{
                                            return (
                                                ( (header.split('_')[1] != 'id')
                                                    ?
                                                        <th key={index} style={{"textTransform":"capitalize"}}>{header.replace(/_/g, ' ')}</th>
                                                    : ''
                                                )
                                            )
                                        })
                                    }
                                    <th>Short List</th>
                                    <th>Reject</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index)=>{
                                        return <tr key={index} data-id={row['_id']}>
                                            {
                                                Object.keys(row).map((col_key, index) => {
                                                    var dataList = row[col_key].split('.')
                                                    return (
                                                        ( (col_key.split('_')[1] != 'id')
                                                        ? <td key={index}>
                                                                {
                                                                    ( ( dataList.indexOf('xlsx') != -1 || dataList.indexOf('doc') != -1 || dataList.indexOf('docx') != -1  )
                                                                        ?
                                                                            <Link to={'/download_cv/'+row['_id']} className="ui mini orange button" src={row[col_key]} alt="image">Download CV</Link>
                                                                        :
                                                                            row[col_key]
                                                                    )
                                                                }
                                                        </td>
                                                        : ''
                                                        )
                                                    )
                                                })
                                            }
                                            <td>
                                                <Link onClick={this.shortlist.bind(this,{job_id:row['_id'], student_id:row['student_id']})} className="ui green icon button mini"><i className="icon check"></i></Link>
                                            </td>
                                            <td>
                                                <Link onClick={this.reject.bind(this,{job_id:row['_id'], student_id:row['student_id']})} className="ui red icon button mini"><i className="icon close"></i></Link>
                                            </td>
                                            
                                        </tr>
                                    })
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
    application_detail:state.getapply_job,
    jobpost:state.jobpost
});
export default connect(mapStateToProps, { getApplicationDetail, createRejectJob})(ApplicationsView)