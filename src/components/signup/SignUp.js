import React, { Component, isValidElement } from 'react';
import '../../assets/css/signin.css';
import { CreateUser } from '../../services/Authentication';
import logo from '.././../assets/img/logo.png';
import { withRouter } from 'react-router-dom';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confpassword: '',
      username: '',
      submitText: 'SIGNUP',
      errors: {
        email: null,
        password: null,
        confpassword: null,
        username: null,
        form: null,
      },
    };
    this.SubmitForm = this.SubmitForm.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  isValid() {
    const { email, password, confpassword, username, errors } = this.state;
    if (!email || !password || !username) {
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
    if (password != confpassword) {
      this.setState({
        errors: {
          ...errors,
          form: 'Password not matched',
        },
      });
      return false;
    }

    return true;
  }

  changeState(stateInfo) {
    this.setState(stateInfo);
  }

  async SubmitForm(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        submitText: 'Loading',
      });
      console.log('call to signup api which will return promise');
      const userInfo = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confpassword: this.state.confpassword,
      };

      var response = await CreateUser(userInfo, {
        changeState: this.changeState,
        props: this.props,
      });

      // console.log(response);
      // var that = this;
      // response
      //   .then(() => {
      //     response.json();
      //   })
      //   .then((data) => {
      //     that.setState({
      //       submitText: 'SignUp',
      //     });
      //     console.log('reponse is resolved ', data);
      //     alert('User Registered Successfully');
      //     that.props.history.push('/');
      //   })
      //   .catch((error) => {
      //     // Handle Errors here.
      //     var errMsg = error.message;
      //     this.setState({
      //       submitText: 'SignUp',
      //     });
      //     this.setState({ errors: { form: errMsg } });
      //     //   console.log('state ', this.state);
      //   });
    }
  }
  onChange(e) {
    const { name, value } = e.target;
    // console.log('name', name, 'val', value);
    this.setState({ [name]: value });
    // console.log(this.state);
  }
  render() {
    return (
      <div className='row vw-100 ml-0 mr-0'>
        <div className='text-white logo'>
          <img src={logo} className='ml-5 pl-3 ' alt='calendly' />
          HEALTHBEAT
        </div>
        <div class='login100-more back col-lg-7 d-none d-lg-block'>
          <div className='row m-auto' style={{ height: '100%' }}>
            <div className='mt-auto  mb-auto p-5'>
              <div className='welcome-text '>
                Ready for a Change
                <span className='text-warning'>&nbsp;?</span>
              </div>
              <div className='wel-description'>
                {/* #we keep you on track */}
                Maintain your daily diet plan .Stay healthy , Stay safe.
              </div>
            </div>
          </div>
        </div>

        <form
          noValidate
          autoComplete='none'
          class='login100-form validate-form col-lg-5 pt-0 pb-0  pl-md-5 pr-md-5 d-flex '
          onSubmit={this.SubmitForm}>
          <span class='login100-form-title p-b-34'>Create Account</span>

          <div className='error text-center mb-3'>{this.state.errors.form}</div>
          <div className=''>
            <div
              class='wrap-input100 rs1-wrap-input100 validate-input m-b-20'
              data-validate='Type user name'>
              <input
                autoComplete='none'
                id='username'
                class='input100'
                type='text'
                name='username'
                placeholder='Username'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
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
            <div
              class='wrap-input100 rs2-wrap-input100 validate-input m-b-20'
              data-validate='Type password'>
              <input
                autoComplete='new-password'
                class='input100'
                type='password'
                name='confpassword'
                placeholder='Confirm password'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
          </div>
          <div class='container-login100-form-btn'>
            <input
              type='submit'
              class='login100-form-btn'
              value={this.state.submitText}
            />
          </div>

          <div class='w-full text-center mt-5 txt1'>
            Already Have an Account ?&nbsp;
            <span
              onClick={() => {
                console.log(this.props);
                this.props.updateWidget({ widgetName: 'SIGNIN' });
              }}
              class='txt3 cur-pointer'>
              Sign In
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SignUp);
