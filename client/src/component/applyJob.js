import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "axios"


class ApplyJob extends Component {
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

    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        var $form = document.getElementById('apply_job');
        let data = new FormData($form);
        axios.post('/products', data)
        .then(res=>{
            console.log('res', res.data.status)
            if(res.data.status == "success"){
                this.props.history.push('/products')
            }
        })
    }
    render() {
        return (
            <div className="ui grid">
                <div className="sixteen wide column">
                    <h2>Apply For Job</h2>
                </div>
                <div className="sixteen wide column">
                    <form className="ui form" id="apply_job" onSubmit={this.submitHandler}>
                        <input type="hidden" value={this.props.match.params.id} name="job_id" />
                        <input type="hidden" value={this.props.auth.user.userId} name="student_id" />
                        <div className="three fields">
                            <div className="field">
                                <label>Name</label>
                                <input type="text" onChange={this.changeHandler} name="name" value={this.state.name} />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="text" onChange={this.changeHandler} name="email" value={this.state.email} />
                            </div>
                            <div className="field">
                                <label>Contact</label>
                                <input type="text" onChange={this.changeHandler} name="contact" value={this.state.contact} />
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label>Qualification</label>
                                <input type="text" onChange={this.changeHandler} name="qualification" value={this.state.qualification} />
                            </div>
                            <div className="field">
                                <label>Experiences</label>
                                <select name="experience">
                                    <option>------------</option>
                                    <option value="fresh">Fresh</option>
                                    <option value="1 year">1 Year</option>
                                    <option value="2 year">2 Year</option>
                                    <option value="3 year">3 Year</option>
                                    <option value="4 year">4 Year</option>
                                    <option value="5 year">5 Year</option>
                                    <option value="5 year plus">5 year plus</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Upload Cv</label>
                                <input type="file" name="file_cv" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Skills</label>
                            <textarea name="skills" value={this.state.Skills} onChange={this.changeHandler}></textarea>
                        </div>
                        <div className="field" style={{"textAlign":"center"}}>
                            <label>&nbsp;</label>
                            <button className="ui small blue labeled icon button"><i className="right arrow icon"></i> submit</button>
                        </div>
                    </form>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(ApplyJob)