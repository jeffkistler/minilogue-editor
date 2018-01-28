/**
 * Translate MIDI sysex messages and port events related to Minilogue devices.
 */
import { MIDI_MESSAGE_RECEIVED, MIDI_PORT_CONNECTED } from '../actions/midi';
import { receiveMinilogueSearchReply, initiateMinilogueSearchRequest } from '../actions/discovery';
import { isSearchDeviceReply } from '../minilogue/sysex';


const minilogueDiscoveryMiddleware = ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case MIDI_MESSAGE_RECEIVED:
      if (isSearchDeviceReply(action.payload.data)) {
        const { payload } = action;
        const { data, target } = payload;
        const { discovery } = getState();
        const { pendingSearchRequests } = discovery;
        const echoBackId = data[5];
        if (Object.prototype.hasOwnProperty.call(pendingSearchRequests, echoBackId)) {
          const output = pendingSearchRequests[echoBackId];
          const input = target;
          const channel = data[4] & 0x0f; // eslint-disable-line no-bitwise
          dispatch(receiveMinilogueSearchReply(input, output, channel));
        }
      }
      break;
    case MIDI_PORT_CONNECTED: {
      const { type: newPortType, id: newPortId } = action.payload;
      const { configuration } = getState();
      // Search for a device if there is not one configured
      if ((newPortType === 'output') && (configuration.midiInput == null)) {
        dispatch(initiateMinilogueSearchRequest(newPortId));
      }
      break;
    }
    default:
      break;
  }
};

export default minilogueDiscoveryMiddleware;
