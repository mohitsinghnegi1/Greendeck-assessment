import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/homepage/Home';
import Error from '../components/error/Error';
import Header from '../components/homepage/Header';
export default class PrivateRoutes extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route component={Error} />
        </Switch>
      </React.Fragment>
    );
  }
}
