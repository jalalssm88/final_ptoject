import React from 'react';
import './App.css';
import store from './store';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//import components
import Menu from './component/menu'
import Landing from './component/landing';
import Signup from './component/signup'
import Login from './component/login'

import CompanyDashboard from './component/companyDashboard';
import StudentDashboard from './component/studentDashboard';
import PostJob from './component/postJob';
import ApplyJob from './component/applyJob';
import PostedJobsView from './component/postedjonView';
import StudentApplyJob from './component/student_applyJob';
import Applications from './component/applications';
import ApplicationsView from './component/Applications_view';
import StudentProfile from './component/student_profile';


import setAuthToken from '../../client/src/utils/setAuthToken';
import {setCurrentUser} from './actions/authAction'


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  // // Logout user
  // store.dispatch(logoutUser());
  // // Clear current Profile
  // store.dispatch(clearCurrentProfile());
  // // Redirect to login
  // window.location.href = "/login";
  // }
  }

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Router>
          <div className="ui container fluid">
            <Menu />
            <Route exact path="/" component={Landing} />
          </div>
          <div className="ui container">
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/company_dashboard" component={CompanyDashboard} />
              <Route path="/student_dashboard" component={StudentDashboard} />
              <Route path="/post_newjob/:id" component={PostJob} />
              <Route path="/apply_job/:id" component={ApplyJob} />
              <Route path="/posted_job_listview/:id" component={PostedJobsView} />
              <Route path="/applied_job_list/:id" component={StudentApplyJob}/>
              <Route path="/application_listview/:id" component={Applications} />
              <Route path="/application_view/:id" component={ApplicationsView} />
              <Route path="/profile/:id" component={StudentProfile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
