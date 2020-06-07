import React, { Component } from 'react';

import SignIn from '../signin/SignIn';
import SignUp from '../signup/SignUp';
class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetName: 'SIGNIN',
    };
    this.updateWidget = this.updateWidget.bind(this);
  }
  updateWidget(widget) {
    this.setState(widget);
  }
  render() {
    console.log(this.state);
    switch (this.state.widgetName) {
      case 'SIGNIN':
        return <SignIn updateWidget={this.updateWidget} />;
        break;
      case 'SIGNUP':
        return <SignUp updateWidget={this.updateWidget} />;
        break;

      default:
        return <div>Error</div>;
        break;
    }
  }
}

export default class Landingpage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div class='limiter '>
        <div class='container-fluid vh-100 '>
          <div class='row vh-100'>
            <Widget />
          </div>
        </div>
      </div>
    );
  }
}
