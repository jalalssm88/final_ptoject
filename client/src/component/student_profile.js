import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getApplyjobStudent, getRejectedJob, getShortlistedJob} from '../actions/postAction';
import {addSummary, getSummary, addExperience, getExperience, addEducation, getEducation} from '../actions/profileAction';

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            summary_show:false,
            experience_show:false,
            education_show:false,

            summary:'',

            job_name:'',
            company_name:'',
            country_name:'',
            city_name:'',
            from_date:'',
            to_date:'',

            degree_title:'',
            study_field:'',
            edu_country:'',
            edu_city:'',
            completion_year:''

        }
    }
    componentDidMount(){
        const { user } = this.props.auth;
        this.props.getApplyjobStudent(this.props.auth.user.userId);
        this.props.getRejectedJob(this.props.auth.user.userId);
        this.props.getShortlistedJob(this.props.auth.user.userId)

        this.props.getSummary(this.props.auth.user.userId);


    }

    //summary show and hide
    show_summary = (e)=>{
        this.setState({
            summary_show:true
        })
    }
    hide_summary = (e)=>{
        this.setState({
            summary_show:false
        })
    }

    //experience show and hide
    show_experience = (e)=>{
        this.setState({
            experience_show:true
        })
    }
    hide_experience = (e)=>{
        this.setState({
            experience_show:false
        })
    }

    //education show and hide
    show_education = (e)=>{
        this.setState({
            education_show:true
        })
    }
    hide_education = (e)=>{
        this.setState({
            education_show:false
        })
    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitSummary = (e) =>{
        e.preventDefault();
        var submit_dict = {}
        submit_dict['summary'] = this.state.summary
        submit_dict['user'] = this.props.auth.user.userId
        this.props.addSummary(submit_dict);
    }

    submitExperience = (e)=>{
        e.preventDefault();
        var submit_dict2 = {}
        submit_dict2['job_name'] = this.state.job_name
        submit_dict2['company_name'] = this.state.company_name
        submit_dict2['country_name'] = this.state.country_name
        submit_dict2['city_name'] = this.state.city_name
        submit_dict2['from_date'] = this.state.from_date
        submit_dict2['to_date'] = this.state.to_date
        this.props.addExperience(submit_dict2)
    }

    submitEducation = (e)=>{
        e.preventDefault();
        var submit_dict3 = {}
        submit_dict3['degree_title'] = this.state.degree_title
        submit_dict3['study_field'] = this.state.study_field
        submit_dict3['edu_country'] = this.state.edu_country
        submit_dict3['edu_city'] = this.state.edu_city
        submit_dict3['completion_year'] = this.state.completion_year
        this.props.addExperience(submit_dict3)
    }

    render() {
        const { user } = this.props.auth;
        const {count} = this.props.applyjob.apply_student_job;
        const {reject_counts} = this.props.applyjob.get_rejected_job;
        const {shortlist_counts} = this.props.applyjob.get_shortlisted_job
        const {data} = this.props.getProfile.summary
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
                                    <div className="ui form" style={this.state.summary_show===true?{display:'block'}:{display:'none'}}>
                                        <div className="field">
                                            <textarea name="summary" onChange={this.changeHandler} value={this.state.summary}></textarea>
                                        </div>
                                        <div className="field">
                                            <div onClick={this.submitSummary} className="ui mini blue button">Save</div>
                                            <div onClick={this.hide_summary} className="ui mini red button">cancel</div>
                                        </div>
                                    </div>
                                    <div className="summary_result">
                                        <h3>Summary</h3>
                                        <p>{data !== undefined || data != null? data[0].summary:''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="one wide column">
                                <Link style={data == undefined || data == null? {display:'block'}:{display:'none'}} onClick={this.show_summary} className="ui mini icon button"><i className="plus icon"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="ui segment">
                        <div className="ui grid">
                            <div className="fifteen wide column">
                                <div className="experience_container">
                                    <div className="ui form" style={this.state.experience_show===true?{display:'block'}:{display:'none'}}>
                                        <div className="field">
                                            <label>Job Title</label>
                                            <input type="text" name="job_name" />
                                        </div>
                                        <div className="field">
                                            <label>Company</label>
                                            <input type="text" name="company_name" />
                                        </div>
                                        <div className="two fields">
                                            <div className="field">
                                                <label>Country</label>
                                                <input type="text" name="country_name"/>
                                            </div>
                                            <div className="field">
                                                <label>City</label>
                                                <input type="text" name="city_name"/>
                                            </div>
                                        </div>
                                        <div className="two fields">
                                            <div className="field" >
                                                <label>From</label>
                                                <input type="date" name="from_date"/>
                                            </div>
                                            <div className="field">
                                                <label>To</label>
                                                <input type="date" name="to_date"/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui mini blue button">Save</div>
                                            <div onClick={this.hide_experience} className="ui mini red button">cancel</div>
                                        </div>
                                    </div>
                                    <div className="experience_result">
                                        <h2>Experience</h2>
                                        <div className="ui divider"></div>
                                        <h3>Front-end developer</h3>
                                        <strong>Bits Wits</strong>
                                        <p><span>Mar 2018 - Aug 2018</span> | <span>Karachi, pakistan</span></p>
                                        <div className="ui divider"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="one wide column">
                                <Link onClick={this.show_experience} className="ui mini icon button"><i className="plus icon"></i></Link>
                            </div>
                        </div>
                    </div>

                    <div className="ui segment">
                        <div className="ui grid">
                            <div className="fifteen wide column">
                                <div className="education_container">
                                    <div className="ui form" style={this.state.education_show===true?{display:'block'}:{display:'none'}}>
                                        <div className="field">
                                            <label>Degree Title</label>
                                            <input type="text" name="degree_title" />
                                        </div>
                                        <div className="field">
                                            <label>Field of study</label>
                                            <input type="text" name="study_field" />
                                        </div>
                                        <div className="two fields">
                                            <div className="field">
                                                <label>Country</label>
                                                <input type="text" name="edu_country"/>
                                            </div>
                                            <div className="field">
                                                <label>City</label>
                                                <input type="text" name="edu_city"/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>year of completion</label>
                                            <input type="text" name="completion_year" />
                                        </div>
                                        <div className="field">
                                            <div className="ui mini blue button">Save</div>
                                            <div onClick={this.hide_education} className="ui mini red button">cancel</div>
                                        </div>
                                    </div>
                                    <div className="education_output">
                                        <h2>Education</h2>
                                        <div className="ui divider"></div>
                                        <h3>Preston University <span>karachi</span></h3>
                                        <h4>Bachlor in Science</h4>
                                        <p>Computer Science <span>(2018)</span></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="one wide column">
                                <Link onClick={this.show_education} className="ui mini icon button"><i className="plus icon"></i></Link>
                            </div>
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
    applyjob: state.getapply_job,
    getProfile: state.profile
});
export default connect(mapStateToProps, { getApplyjobStudent, getRejectedJob, getShortlistedJob, addSummary, getSummary, addExperience, getExperience, addEducation, getEducation })(StudentProfile)