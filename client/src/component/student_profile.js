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
            completion_year:'',
            institude:''

        }
    }
    componentDidMount(){
        const { user } = this.props.auth;
        // this.props.getApplyjobStudent(this.props.auth.user.userId);
        // this.props.getRejectedJob(this.props.auth.user.userId);
        // this.props.getShortlistedJob(this.props.auth.user.userId)

        this.props.getSummary(this.props.auth.user.userId);
        this.props.getExperience(this.props.auth.user.userId)
        this.props.getEducation(this.props.auth.user.userId)



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
        console.log('=====', e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitSummary = (e) =>{
        e.preventDefault();
        var submit_dict = {}
        submit_dict['summary'] = this.state.summary
        submit_dict['user'] = this.props.auth.user.userId
        this.props.addSummary(submit_dict)
        this.setState({
            summary:'',
            summary_show:false
        })
    }

    submitExperience = (e)=>{
        e.preventDefault();
        var submit_dict2 = {}
        submit_dict2['user'] = this.props.auth.user.userId
        submit_dict2['job_name'] = this.state.job_name
        submit_dict2['company_name'] = this.state.company_name
        submit_dict2['country_name'] = this.state.country_name
        submit_dict2['city_name'] = this.state.city_name
        submit_dict2['from_date'] = this.state.from_date
        submit_dict2['to_date'] = this.state.to_date

        this.props.addExperience(submit_dict2)
        this.setState({
            job_name:'',
            company_name:'',
            country_name:'',
            city_name:'',
            from_date:'',
            to_date:'',
            experience_show:false
        })
    }

    submitEducation = (e)=>{
        e.preventDefault();
        var submit_dict3 = {}
        submit_dict3['user'] = this.props.auth.user.userId
        submit_dict3['degree_title'] = this.state.degree_title
        submit_dict3['study_field'] = this.state.study_field
        submit_dict3['edu_country'] = this.state.edu_country
        submit_dict3['edu_city'] = this.state.edu_city
        submit_dict3['completion_year'] = this.state.completion_year
        submit_dict3['institude'] = this.state.institude
        this.props.addEducation(submit_dict3)
        this.setState({
            degree_title:'',
            study_field:'',
            edu_country:'',
            edu_city:'',
            completion_year:'',
            institude:'',
            education_show:false
        })
    }

    render() {
        const { user } = this.props.auth;
        const {count} = this.props.applyjob.apply_student_job;
        const {reject_counts} = this.props.applyjob.get_rejected_job;
        const {shortlist_counts} = this.props.applyjob.get_shortlisted_job
        const {data} = this.props.getProfile.summary
        console.log('experience', this.props.getProfile.experience)
        console.log('education', this.props.getProfile.education)
        console.log('propsssss', this.props.getProfile)
        var {loading} = this.props.getProfile;

        console.log('loading', loading)

        
        return (
            
            <div className="ui grid">
                {
                    
                    // user===null || count === null || reject_counts === null || shortlist_counts == null ||
                    data == undefined?
                    <div className="ui loader active"></div>:
                    <React.Fragment>
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
                                                <p>{ data.length === 0?'add summary': data[0].summary}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="one wide column">
                                        <div style={data === undefined || data.length ===0 ?{display:'block'}:{display:'none'}} onClick={this.show_summary} className="ui mini icon button add_item_button"><i className="plus icon"></i></div>
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
                                                    <input type="text" name="job_name" value={this.state.job_name} onChange={this.changeHandler} />
                                                </div>
                                                <div className="field">
                                                    <label>Company</label>
                                                    <input type="text" name="company_name" value={this.state.company_name} onChange={this.changeHandler} />
                                                </div>
                                                <div className="two fields">
                                                    <div className="field">
                                                        <label>Country</label>
                                                        <input type="text" name="country_name" value={this.state.country_name} onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="field">
                                                        <label>City</label>
                                                        <input type="text" name="city_name" value={this.state.city_name} onChange={this.changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="two fields">
                                                    <div className="field" >
                                                        <label>From</label>
                                                        <input type="date" name="from_date" value={this.state.from_date} onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="field">
                                                        <label>To</label>
                                                        <input type="date" name="to_date" value={this.state.to_date} onChange={this.changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div onClick={this.submitExperience} className="ui mini blue button">Save</div>
                                                    <div onClick={this.hide_experience} className="ui mini red button">cancel</div>
                                                </div>
                                            </div>
                                            <div className="experience_result">
                                                <h2>Experience</h2>
                                                <div className="ui divider"></div>
                                                {   
                                                    this.props.getProfile.experience.length ===0? 'Add Experience':
                                                    this.props.getProfile.experience.map(item=>(
                                                        <React.Fragment key={item._id}>
                                                            <h3>{item.job_name}</h3>
                                                            <strong>{item.company_name}</strong>
                                                            <p><span>{item.from_date} - {item.to_date} </span><span> | {item.city_name}, {item.country_name}</span></p>
                                                            <div className="ui divider"></div>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="one wide column">
                                        <div onClick={this.show_experience} className="ui mini icon button"><i className="plus icon"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui segment">
                                <div className="ui grid">
                                    <div className="fifteen wide column">
                                        <div className="education_container">
                                            <div className="ui form" style={this.state.education_show===true?{display:'block'}:{display:'none'}}>
                                                <div className="two fields">
                                                   <div className="field">
                                                        <label>Degree Title</label>
                                                        <input type="text" name="degree_title" value={this.state.degree_title} onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="field">
                                                        <label>Institude Name</label>
                                                        <input type="text" name="institude" value={this.state.institude} onChange={this.changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label>Field of study</label>
                                                    <input type="text" name="study_field" value={this.state.study_field} onChange={this.changeHandler} />
                                                </div>
                                                <div className="two fields">
                                                    <div className="field">
                                                        <label>Country</label>
                                                        <input type="text" name="edu_country" value={this.state.edu_country} onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="field">
                                                        <label>City</label>
                                                        <input type="text" name="edu_city" value={this.state.edu_city} onChange={this.changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label>year of completion</label>
                                                    <input type="text" name="completion_year" value={this.state.completion_year} onChange={this.changeHandler} />
                                                </div>
                                                <div className="field">
                                                    <div onClick={this.submitEducation} className="ui mini blue button">Save</div>
                                                    <div onClick={this.hide_education} className="ui mini red button">cancel</div>
                                                </div>
                                            </div>
                                            <div className="education_output">
                                                <h2>Education</h2>
                                                <div className="ui divider"></div>
                                                {
                                                    this.props.getProfile.education.length == 0?'Add education':
                                                    this.props.getProfile.education.map(item=>(
                                                        <React.Fragment key={item._id}>
                                                            <h3>{item.institude} | <span>{item.edu_city} {item.edu_country}</span></h3>
                                                            <h4>{item.degree_title}</h4>
                                                            <p>{item.study_field}<span>({item.completion_year})</span></p>
                                                            <div className="ui divider"></div>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="one wide column">
                                        <div onClick={this.show_education} className="ui mini icon button"><i className="plus icon"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="five wide column">
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
                        </div> */}
                    </React.Fragment>
                    }
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