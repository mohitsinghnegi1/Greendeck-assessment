import React, { Component, useContext } from 'react';
import { StoreContext } from '../context/Store';
import logo from '../../assets/img/logo.png';
import '../../assets/css/header.css';

import { Logout } from '../../services/Authentication';

export default function Header() {
  const [store, setStore] = useContext(StoreContext);
  console.log(store);
  const signOut = () => {
    Logout(store, setStore);
  };
  return (
    <header className='header d-flex justify-content-between'>
      <div className='pull-left pl-4'>
        <a href='/'>
          <img src={logo} className='logo1 ' alt='logo' />

          <span>
            <span className='health'>Health</span>
            <span className='beat'>Beat</span>
          </span>
        </a>
      </div>
      <div className='d-flex pr-4'>
        <div className='username text-white mt-auto mb-auto mr-4 text-capitalize d-none d-md-block'>
          Welcome &nbsp;{store.user.userInfo.username}
        </div>
        <div className='logout-btn' onClick={signOut}>
          Sign Out
        </div>
      </div>
    </header>
  );
}
