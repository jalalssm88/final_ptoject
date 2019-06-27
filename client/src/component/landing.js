import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import landing_image  from '../static/landing_img.jpg'

class Landing extends Component{
    render(){
        return(
            <div className="ui container fluid" style={{'marginTop':"-20px"}}>
                <div className="ui grid" style={{"height":"612px", "background":"blue"}}>
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="eight wide column">
                                <h1 className="start_header">Job Search application in Express Js and React Js</h1>
                                <p className="start_para">
                                    This application plays three main role: Admin, Company, and Student. Admin will be the superuser
                                    he can have all permission to control Company and Student. Company will post jobs and students can
                                    apply for different job of different company.
                                </p>
                                <Link to="/signup" className="ui massive green button">sign up it is free</Link>
                            </div>
                            <div className="eight wide column">
                                <img style={{"height":"500px", "width":"100%" ,"marginTop":"50px"}} src={landing_image} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;