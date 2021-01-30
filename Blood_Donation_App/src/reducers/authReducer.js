import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP} from '../constants';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  home: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload.token,
        home: action.payload.home,
        isLoading: false,
      };
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        isSignout: false,
        isLoading: false,
        userToken: action.payload.token,
        home: action.payload.home,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        home: null,
      };
    default:
      return state;
  }
};

export default authReducer;
