import firebase from '../config/firebase';
import {storeData, removeData} from '../storage/storage';

import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT, GET_DATA, SIGN_UP} from '../constants';
// import {getDataFromFirebase} from '../database/database';

export const singIn = ({email, password}) => {
  let token = 'dummy-auth-token';
  let home;

  if (true) {
    // Acceptor (HomeScreen)
    home = null;
  } else {
    // DonorScreen
    home = 'donor';
    storeData('home', home);
  }

  storeData('userToken', token);

  return {
    type: SIGN_IN,
    payload: {
      token: token,
      home: home,
    },
  };
};

export const signUp = (data, userKind) => {

  console.log("USER DATA", data)
  
  let token = 'dummy-auth-token';
  let home;
  
  if (userKind === 'acceptor'){  // Acceptor (HomeScreen)
    home = null;

  }else if(userKind === 'donor'){  // DonorScreen
    home = 'donor'
    storeData('home', home);
  }
  else{
    alert('Something went wrong')
  }

  storeData('userToken', token);

  return {
    type: SIGN_UP,
    payload: {
      token: token,
      home: home,
    },
  };
};


export const singOut = () => {
  removeData('userToken');
  removeData('home');
  return {type: SIGN_OUT};
};

export const restoreToken = (userToken, home) => {
  return {
    type: RESTORE_TOKEN,
    payload: {
      token: userToken,
      home: home,
    },
  };
};

export const getDonorData = (data) => {
  return {
    type: GET_DATA,
    payload: data,
  };
};
