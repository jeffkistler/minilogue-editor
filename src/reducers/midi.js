/**
 * Handle MIDI port actions to keep track of connected MIDI ports by ID.
 */
import {
  MIDI_ACCESS_GRANTED,
  MIDI_PORT_CONNECTED,
  MIDI_PORT_DISCONNECTED,
} from '../actions/midi';

const has = Object.prototype.hasOwnProperty;

const initialState = {
  ports: {},
  access: null,
};

const storeAccess = (state = initialState, access) => (
  { ...state, access }
);

const addPort = (state = initialState, port) => {
  let { ports } = state;
  if (!has.call(ports, port.id)) {
    ports = { ...ports };
    ports[port.id] = port;
  }
  return { ...state, ports };
};

const removePort = (state = initialState, port) => {
  const removedPorts = { ...state.ports };
  delete removedPorts[port.id];
  return { ...state, ports: removedPorts };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MIDI_ACCESS_GRANTED:
      return storeAccess(state, action.payload);
    case MIDI_PORT_CONNECTED:
      return addPort(state, action.payload);
    case MIDI_PORT_DISCONNECTED:
      return removePort(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
