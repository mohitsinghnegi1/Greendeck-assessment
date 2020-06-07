import config from '../config/config';
import React from 'react';
const CreateUser = async (userInfo, payload) => {
  // call create user api
  console.log('create user called');
  const response = await fetch(config.USER_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      console.log('result ', response);
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      console.log('data ', data);
      var errMsg;
      if (data.hasOwnProperty('error')) {
        if (data.error.code && data.error.code == 11000) {
          errMsg = <div>Email or Username already exist</div>;
        } else {
          errMsg = data.error;
        }
      } else {
        errMsg = (
          <div className='text-success'>User Registered Successfully</div>
        );
        payload.props.history.push('/');
      }
      payload.changeState({
        submitText: 'SignUp',
        errors: { form: errMsg },
      });
    })
    .catch((error) => {
      console.log('error while signup', error);
      // Handle Errors here.
      var errMsg = error.message;
      payload.changeState({
        submitText: 'SignUp',
        errors: { form: errMsg },
      });
    });

  // console.log('response', response);
  return response;
};

const SignInUser = (userInfo, payload) => {
  // sign in user
  console.log('signIn user called');
  fetch(config.USER_BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      console.log('result ', response);
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      console.log('data ', data);
      if (data.hasOwnProperty('message')) {
        var errMsg = <div className='text-success'>{data.message}</div>;
        payload.changeState({
          submitText: 'SingnIn',
          errors: { form: errMsg },
        });

        //instead of storing it in localstorage we can store it in session
        localStorage.setItem(
          'user',
          JSON.stringify({
            isAuthenticated: true,
            token: data.token,
            userInfo: data.userInfo,
          })
        );
        payload.updateStore({
          ...payload.store,
          user: {
            isAuthenticated: true,
            token: data.token,
            userInfo: data.userInfo,
          },
        });
      } else if (data.hasOwnProperty('errorMsg')) {
        var errMsg = data.errorMsg;
        payload.changeState({
          submitText: 'SignIn',
          errors: { form: errMsg },
        });
      }
    })
    .catch((error) => {
      console.log('error while sigining in', error);
      // Handle Errors here.
      var errMsg = error.message;
      payload.changeState({
        submitText: 'SignIn',
        errors: { form: errMsg },
      });
    });
};

const Logout = (prevStore, setStore) => {
  //clear cookie if you implement it using cookie else clear localstorage
  localStorage.removeItem('user');
  setStore({
    ...prevStore,
    user: {
      isAuthenticated: false,
      token: null,
    },
  });
};

export { CreateUser, SignInUser, Logout };
