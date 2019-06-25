import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Signup from './component/signup'
import Login from './component/login'
import Apply from './component/apply'

import Menu from './component/menu'

import Dashboard from './component/dashboard'

import {Provider} from 'react-redux';
import store from './store'
import setAuthToken from '../../client/src/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setCurrentUser} from './actions/authAction'

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
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
            <Route path="/" component={Menu}/>
          </div>
          <div className="ui container">
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/apply" component={Apply} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
