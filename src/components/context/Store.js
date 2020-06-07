import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  //make it persistance by default data is not persistant
  const user = JSON.parse(localStorage.getItem('user')) || {
    isAuthenticated: false,
    token: null,
  };
  const [store, updateStore] = useState({
    user,
  });

  return (
    <StoreContext.Provider value={[store, updateStore]}>
      {props.children}
    </StoreContext.Provider>
  );
};
