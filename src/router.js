import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Home from './pages/home/Home';
import UserPlan from './pages/user-plan/UserPlan';
import Code from './pages/code/Code';
import MainService from './layout/MainService';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Challenges from './pages/challenges/Challenges';
import NewChallenge from './pages/new-project/NewChallenge';
import NotFound from './commons/NotFound';
import PrivateRoute from './commons/PrivateRoute';

function Router(props) {
  return (
    <BrowserRouter>
      <MainService>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/code-editor' component={Code} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/challenges/language-proficiency" component={Challenges} />
          <Route path="/user-plans" component={UserPlan} />
          <PrivateRoute exact authenticated={props.isAuthenticated} path="/new-challenge" component={NewChallenge} />
          <Route component={NotFound} />
        </Switch>
      </MainService>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
