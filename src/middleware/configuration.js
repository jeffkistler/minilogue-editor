/**
 * Translate MIDI port and device discovery events to configuration actions.
 */
import { MIDI_PORT_CONNECTED } from '../actions/midi';
import { MINILOGUE_SEARCH_REPLY_RECEIVED } from '../actions/discovery';
import {
  selectMIDIInput,
  selectMIDIOutput,
  selectMIDIInputChannel,
  selectMIDIOutputChannel,
} from '../actions/configuration';


const configurationMiddleware = ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    // Handle preferred ports
    case MIDI_PORT_CONNECTED: {
      const newPort = action.payload;
      const portKey = newPort.type === 'input' ? 'midiInput' : 'midiOutput';
      const preferredKey = newPort.type === 'input' ? 'preferredInput' : 'preferredOutput';
      const { configuration } = getState();
      if (
        (configuration[portKey] == null) && (configuration[preferredKey] === newPort.id)
      ) {
        const selectPort = newPort.type === 'input' ? selectMIDIInput : selectMIDIOutput;
        dispatch(selectPort(newPort.id));
      }
      break;
    }
    // Handle minilogue discovery replies
    case MINILOGUE_SEARCH_REPLY_RECEIVED: {
      const { input, output, channel } = action.payload;
      const { configuration } = getState();
      if (configuration.midiInput == null) {
        dispatch(selectMIDIInput(input));
        dispatch(selectMIDIInputChannel(channel));
      }
      if (configuration.midiOutput == null) {
        dispatch(selectMIDIOutput(output));
        dispatch(selectMIDIOutputChannel(channel));
      }
      break;
    }
    default:
      break;
  }
};

export default configurationMiddleware;
