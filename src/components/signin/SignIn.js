import React, { Component, useContext } from 'react';
import '../../assets/css/signin.css';
import { SignInUser } from '../../services/Authentication';
import { withRouter } from 'react-router-dom';
import logo from '.././../assets/img/logo.png';

import '../../assets/css/util.css';
import '../../assets/css/signin.css';
import { StoreContext } from '../context/Store';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitText: 'SignIn',
      errors: {
        email: null,
        password: null,
        form: null,
      },
    };

    this.login = this.login.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  static contextType = StoreContext;

  changeState(stateInfo) {
    this.setState(stateInfo);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  isValid() {
    const { email, password, errors } = this.state;
    if (!email || !password) {
      this.setState({
        errors: {
          ...errors,
          form: 'Please fill out required fields',
        },
      });
      return false;
    }
    if (!this.validateEmail(email)) {
      this.setState({
        errors: {
          ...errors,
          form: 'Invalid email Format',
        },
      });
      return false;
    }

    return true;
  }

  login(e) {
    const [store, updateStore] = this.context;
    console.log(store);
    e.preventDefault();
    this.setState({
      submitText: 'Loading',
    });
    if (this.isValid()) {
      const userInfo = {
        email: this.state.email,
        password: this.state.password,
      };
      SignInUser(userInfo, {
        changeState: this.changeState,
        updateStore,
        store,
      });
    }
  }
  onChange(e) {
    const { name, value } = e.target;
    // console.log('name', name, 'val', value);
    this.setState({ [name]: value });
    // console.log(this.state);
  }

  componentDidMount() {}
  render() {
    return (
      <div className='row  ml-0 mr-0 w-100'>
        <div className='text-white logo'>
          <img src={logo} className='ml-5 pl-3 ' alt='calendly' />
          Healthbeat
        </div>
        <div class='login100-more back col-lg-7 d-none d-lg-block'>
          <div className='row m-auto w-100' style={{ height: '100%' }}>
            <div className='mt-auto mb-auto p-5'>
              <div className='welcome-text '>Welcome to Healthbeat</div>
              <div className='wel-description w-75'>
                We keep your health on track .It's not a diet but eating
                healthy, and when you start to become aware and enjoy the foods
                you eat, you will find amazing returns on your investment
                unfolding before you realize.
                <br />
              </div>
            </div>
          </div>
        </div>
        <form
          autoComplete='none'
          class='login100-form validate-form col-lg-5 pt-0 pb-0  pl-md-5 pr-md-5 d-flex '
          onSubmit={this.login}>
          <span class='login100-form-title p-b-34'>Account Login</span>

          <div className='error text-center mb-3'>{this.state.errors.form}</div>
          <div className=''>
            <div
              class='wrap-input100 rs1-wrap-input100 validate-input m-b-20'
              data-validate='Type user name'>
              <input
                autoComplete='none'
                id='email'
                class='input100'
                type='email'
                name='email'
                placeholder='Email Address'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
            <div
              class='wrap-input100 rs2-wrap-input100 validate-input m-b-20'
              data-validate='Type password'>
              <input
                autoComplete='new-password'
                class='input100'
                type='password'
                name='password'
                placeholder='Password'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
          </div>
          <div class='container-login100-form-btn'>
            <button type='submit' class='login100-form-btn'>
              {this.state.submitText}
            </button>
          </div>

          <div class='w-full text-center p-t-27 p-b-10 cur-pointer'>
            <span class='txt1'>Forgot&nbsp;</span>

            <a href='#' class='txt2'>
              password?
            </a>
          </div>

          <div class='w-full text-center txt1'>
            New User ? &nbsp;
            <span
              onClick={() => {
                console.log(this.props);
                this.props.updateWidget({ widgetName: 'SIGNUP' });
              }}
              class='txt3 cur-pointer'>
              Sign Up
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SignIn);
