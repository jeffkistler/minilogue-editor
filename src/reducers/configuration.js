/**
 * MIDI configuration state updates.
 */
import {
  MIDI_INPUT_SELECTED,
  MIDI_INPUT_CHANNEL_SELECTED,
  MIDI_OUTPUT_SELECTED,
  MIDI_OUTPUT_CHANNEL_SELECTED,
  MIDI_SEND_SET,
  MIDI_RECEIVE_SET,
} from '../actions/configuration';
import { MIDI_PORT_DISCONNECTED } from '../actions/midi';

const initialState = {
  midiInput: null,
  midiInputChannel: 0,
  preferredInput: null,
  midiOutput: null,
  midiOutputChannel: 0,
  preferredOutput: null,
  midiSend: false,
  midiReceive: false,
};

export default function configurationReducer(configurationState = initialState, action) {
  switch (action.type) {
    case MIDI_INPUT_SELECTED: {
      const midiInput = action.payload;
      return { ...configurationState, midiInput, preferredInput: midiInput };
    }
    case MIDI_INPUT_CHANNEL_SELECTED: {
      const midiInputChannel = action.payload;
      return { ...configurationState, midiInputChannel };
    }
    case MIDI_OUTPUT_SELECTED: {
      const midiOutput = action.payload;
      return { ...configurationState, midiOutput, preferredOutput: midiOutput };
    }
    case MIDI_OUTPUT_CHANNEL_SELECTED: {
      const midiOutputChannel = action.payload;
      return { ...configurationState, midiOutputChannel };
    }
    case MIDI_SEND_SET: {
      const midiSend = action.payload;
      return { ...configurationState, midiSend };
    }
    case MIDI_RECEIVE_SET: {
      const midiReceive = action.payload;
      return { ...configurationState, midiReceive };
    }
    case MIDI_PORT_DISCONNECTED: {
      const disconnectedPort = action.payload;
      if (configurationState.midiInput === disconnectedPort.id) {
        return { ...configurationState, midiInput: null };
      } else if (configurationState.midiOutput === disconnectedPort.id) {
        return { ...configurationState, midiOutput: null };
      }
      return configurationState;
    }
    default:
      return configurationState;
  }
}
