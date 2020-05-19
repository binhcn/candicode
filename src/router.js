import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Home from './pages/home/Home';
import UserPlan from './pages/user-plan/UserPlan';
import Code from './pages/code/Code';
import MainService from './layout/MainService';
import Challenges from './pages/challenges/Challenges';
import Management from './pages/management/Management';
import Profile from './pages/profile/Profile';
import NotFound from './commons/NotFound';
import Demo from './demo/Demo';
import PrivateRoute from './commons/PrivateRoute';
import {
  getCurrentUser,
} from "./actions/actions.creator";

function Router(props) {
  props.getCurrentUser();
  return (
    <BrowserRouter>
      <MainService>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/code-editor' component={Code} />
          <Route path="/challenges/language-proficiency" component={Challenges} />
          <Route path="/user-plans" component={UserPlan} />
          <Route path="/demo" component={Demo} />
          <PrivateRoute exact authenticated={props.isAuthenticated} path="/profile" component={Profile} />
          <PrivateRoute authenticated={props.isAuthenticated} path="/management" component={Management} />
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
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
