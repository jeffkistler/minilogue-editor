/**
 * A middleware to dispatch WebMIDI device events.
 */
/* eslint-disable no-param-reassign */
import {
  grantMIDIAccess,
  connectMIDIPort,
  disconnectMIDIPort,
  receiveMIDIMessage,
} from '../actions/midi';

let accessRequest;

if (navigator.requestMIDIAccess) {
  accessRequest = navigator.requestMIDIAccess({ sysex: true });
} else {
  accessRequest = Promise.reject(new Error('WebMIDI access not available'));
}

const midiMiddleware = ({ dispatch }, accessPromise = accessRequest) => {
  accessPromise.then((access) => {
    const handleMessage = (event) => {
      // Ignore clock messages for now.
      const { data, timeStamp, target } = event;
      const copy = { data: [...data], timeStamp, target: target.id };
      if (data[0] !== 248) {
        dispatch(receiveMIDIMessage(copy));
      }
    };

    // Send access granted message
    dispatch(grantMIDIAccess(access));

    // Send connected messages for all accessible MIDI ports
    [...access.inputs.values()].forEach((input) => {
      const {
        id, name, manufacturer, state, type,
      } = input;
      dispatch(connectMIDIPort({
        id, name, manufacturer, state, type,
      }));
      input.onmidimessage = handleMessage;
    });

    [...access.outputs.values()].forEach((output) => {
      const {
        id, name, manufacturer, state, type,
      } = output;
      dispatch(connectMIDIPort({
        id, name, manufacturer, state, type,
      }));
    });

    // Attach a listener that will dispatch connected or disconnected messages
    // for any MIDI port changes
    access.onstatechange = (event) => {
      const {
        id, name, manufacturer, state, type,
      } = event.port;
      const copy = {
        id, name, manufacturer, state, type,
      };
      if (copy.state === 'disconnected') {
        dispatch(disconnectMIDIPort({
          id, name, manufacturer, state, type,
        }));
      } else if (copy.state === 'connected') {
        dispatch(connectMIDIPort({
          id, name, manufacturer, state, type,
        }));
        if (type === 'input') {
          event.port.onmidimessage = handleMessage;
        }
      }
    };
  });
  return next => action => next(action);
};

export default midiMiddleware;
