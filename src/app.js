import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import midiMiddleware from './middleware/midi';
import configurationMiddleware from './middleware/configuration';
import controlCodeMiddleware from './middleware/controlcode';
import minilogueDiscoveryMiddleware from './middleware/discovery';
import programMiddleware from './middleware/program';
import rootReducer from './reducers/app';
import App from './components/App.jsx';
import './app.css';

let middleware = [
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
