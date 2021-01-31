import firebase from '../config/firebase';
import {storeData, removeData} from '../storage/storage';

import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  GET_DATA,
  SIGN_UP,
} from '../constants';

// SIGN_IN FUNCTION HERE...
export const signIn = ({email, password}) => async (dispatch) => {
  let token = null,
    home = null,
    type = null,
    some = true;

  try {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      token = response.user.uid;
    }
  } catch (e) {
    alert(e.message);
    some = false;
  }

  if (token) {
    try {
      firebase
        .database()
        .ref('users')
        .on('value', (snapshot) => {
          let users = snapshot.val();
          let data = users == null ? {} : users;
          let donor = data.donor;
          let acceptor = data.acceptor;

          if (donor) {
            type = findUserType(donor, email);
          }
          if (type == null) {
            type = findUserType(acceptor, email);
          }
        });
    } catch (e) {
      console.log('ERROR action.js/signIn', e.message);
    }
  }

  if (type) {
    if (type === 'acceptor') {
      home = null;
    } else if (type === 'donor') {
      home = 'donor';
      storeData('home', home);
    }

    storeData('userToken', token);
  } else {
    if (some) alert('Something went wrong, could not sign in.');
    token = null;
  }

  // console.log('token', token, 'Type', type);

  return dispatch({
    type: SIGN_IN,
    payload: {
      token: token,
      home: home,
    },
  });
};

// SIGN_UP FUNCTION HERE...
export const signUp = (data, userType) => async (dispatch) => {
  let token = null,
    home = null,
    path = null,
    some = true;

  // Firebase SignUp Code
  try {
    let response = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        data.credential.email,
        data.credential.password,
      );
    if (response) {
      token = response.user.uid;
    }
  } catch (e) {
    alert(e.message);
    some = false;
  }

  // console.log('USER DATA @ SIGNUP', data);
  if (token) {
    if (userType === 'acceptor') {
      path = 'users/acceptor';
      home = null;
    }
    // DonorScreen
    else if (userType === 'donor') {
      path = '/users/donor';
      home = 'donor';
      storeData('home', home);
    } else {
      alert('Something went wrong');
    }
  }

  if (path) {
    try {
      const id = firebase.database().ref().child(path).push().key;
      const users = {};
      users[`${path}/${id}`] = {...data.profile, id};
      firebase.database().ref().update(users);
      storeData('userToken', token);
    } catch (e) {
      console.log('Error @ SIGNUP', e);
    }
  } else {
    if (some) alert('Something went wrong! could not register.');
    token = null;
  }

  // console.log('token', token, 'path', path);

  return dispatch({
    type: SIGN_UP,
    payload: {
      token: token,
      home: home,
    },
  });
};

export const singOut = () => async (dispatch) => {
  await firebase.auth().signOut();
  removeData('userToken');
  removeData('home');
  return dispatch({type: SIGN_OUT});
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

export const getDonorData = (donor) => {
  console.log('getDonorData', donor);

  return {
    type: GET_DATA,
    payload: donor,
  };
};

// FIND USER IS DONOR OR A ACCEPTOR
const findUserType = (data, email) => {
  let type = null;
  let keys = Object.keys(data);
  if (keys.length) {
    let key = keys.filter((k) => data[k].email == email);
    type = key.length ? data[key[0]].userType : null;
  }
  return type;
};
