import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../components/signup/SignUp';
import Error from '../components/error/Error';
import SignIn from '../components/signin/SignIn';
import Landingpage from '../components/landingpage/Landingpage';
export default class PublicRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Landingpage} />
        <Route exact path='/SignUp' component={SignUp} />
        <Route exact path='/SignIn' component={SignIn} />
        <Route component={Error} />
      </Switch>
    );
  }
}
