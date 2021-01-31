/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import rootReducer from './src/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const RNRedux = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
