import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getApplicationDetail} from '../actions/postAction';
import DynamicTable from '../component/dynamic_table'


class ApplicationsView extends Component {
    componentDidMount(){
        this.props.getApplicationDetail(this.props.match.params.id)
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
                        <DynamicTable data={data} count={counts} message={message} button={'button.view'}/>
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
export default connect(mapStateToProps, { getApplicationDetail})(ApplicationsView)