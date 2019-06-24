import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Signup from './component/signup'
import Login from './component/login'

import Menu from './component/menu'

import Dashboard from './component/dashboard'

import {Provider} from 'react-redux';
import store from './store'

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
            </Switch>
          </div>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
