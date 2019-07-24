import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getApplyjobStudent, getRejectedJob, getShortlistedJob} from '../actions/postAction';



class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            summary_show:false
        }
    }
    componentDidMount(){
        const { user } = this.props.auth;
        this.props.getApplyjobStudent(this.props.auth.user.userId);
        this.props.getRejectedJob(this.props.auth.user.userId);
        this.props.getShortlistedJob(this.props.auth.user.userId)

    }
    show_summary = (e)=>{
        this.setState({
            summary_show:true
        })
    }
    render() {
        const { user } = this.props.auth;
        const {count} = this.props.applyjob.apply_student_job;
        const {reject_counts} = this.props.applyjob.get_rejected_job;
        const {shortlist_counts} = this.props.applyjob.get_shortlisted_job
        console.log('props', this.props)
        
        return (
            <div className="ui grid">
                <div className="eleven wide column">
                    <div className="ui segment" >
                        <div className="info_container" style={{"textAlign":"center"}}>
                            <h3>{user.userName}</h3>
                            <p>jalal.ssm88@gmail.com</p>
                            <p>799879879987</p>
                        </div>
                    </div> 
                    <div className="ui segment">
                        <div className="ui grid">
                            <div className="fifteen wide column">
                                <div className="summary_container">
                                    <div className="ui form" style={this.state.summary_show==true?{'display':'show'}:{'display':'none'}}>
                                        <div className="field">
                                            <textarea></textarea>
                                        </div>
                                    </div>
                                    <h3>Summary</h3>
                                    <p>I am Front end Web and Application developer, building websites
                                        and applications with Html, Css and java Script . With my creative
                                        technical skill i can design and develop user-friendly and responsive 
                                        sites as well as writing clean and efficient code to make the program
                                        best performance. i always trying to write generic scripts and function
                                        that can save time and improve code readability. 
                                        One year of professional experience as a front end Web and Application 
                                        developer i learnt to work on JavaScript's libraries like Jquery, react-js
                                        and other plugins.</p>
                                </div>
                            </div>
                            <div className="one wide column">
                                <Link onClick={this.show_summary} className="ui mini icon button"><i className="plus icon"></i></Link>
                            </div>

                        </div>
                        

                    </div>
                    <div className="ui segment">
                        <div className="experience_container">
                            <h3>Experience</h3>
                            <h2>Front-end developer</h2>
                            <p>karachi pakistan</p>
                        </div>
                    </div>
                    
                        
                        
                </div>
                <div className="five wide column">
                    <div className="ui one column grid">
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{count}</h4>
                                <p>Total Jobs Applied</p>
                                <Link to={`/applied_job_list/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{shortlist_counts}</h4>
                                <p>Shortlisted Jobs</p>
                                <Link to={`/student_shortlisted_job/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui segment counts_segment">
                                <h4>{reject_counts}</h4>
                                <p>Rejected Jobs</p>
                                <Link to={`/student_rejected_job/${user.userId}`} className="ui mini blue button">view all</Link> 
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    application_detail:state.getapply_job,
    applyjob: state.getapply_job
});
export default connect(mapStateToProps, { getApplyjobStudent, getRejectedJob, getShortlistedJob })(StudentProfile)