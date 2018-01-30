import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import history from './history';
import midiMiddleware from './middleware/midi';
import configurationMiddleware from './middleware/configuration';
import controlCodeMiddleware from './middleware/controlcode';
import minilogueDiscoveryMiddleware from './middleware/discovery';
import programMiddleware from './middleware/program';
import { reducers } from './reducers/app';
import App from './components/App.jsx';
import './app.css';

let middleware = [
  routerMiddleware(history),
  midiMiddleware,
  configurationMiddleware,
  controlCodeMiddleware,
  programMiddleware,
  minilogueDiscoveryMiddleware,
  thunkMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

const rootReducer = combineReducers({
  ...reducers,
  routerReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
