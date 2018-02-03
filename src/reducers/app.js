import { combineReducers } from 'redux';
import programReducer from './program';
import libraryReducer from './library';
import midiReducer from './midi';
import configurationReducer from './configuration';
import discoveryReducer from './discovery';
import displayReducer from './display';

export const reducers = {
  configuration: configurationReducer,
  library: libraryReducer,
  currentProgram: programReducer,
  midi: midiReducer,
  discovery: discoveryReducer,
  display: displayReducer,
};

const rootReducer = combineReducers({
  configuration: configurationReducer,
  library: libraryReducer,
  currentProgram: programReducer,
  midi: midiReducer,
  discovery: discoveryReducer,
  display: displayReducer,
});

export default rootReducer;
