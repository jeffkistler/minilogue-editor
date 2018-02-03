/**
 * Current program actions.
 */
import {
  encodeSysexData,
  buildMessage,
  CURRENT_PROGRAM_DATA_DUMP_REQUEST,
  CURRENT_PROGRAM_DATA_DUMP,
} from '../minilogue/sysex';
import { encodeProgram } from '../minilogue/program';
import { parameterToMessage, PARAMETER_TO_CODE } from '../minilogue/midi';

export const PARAMETER_SET = 'PARAMETER_SET';
export const PANEL_PARAMETER_SET = 'PANEL_PARAMETER_SET';
export const CURRENT_PROGRAM_SET = 'CURRENT_PROGRAM_SET';
export const CURRENT_PROGRAM_REQUESTED = 'CURRENT_PROGRAM_REQUESTED';
export const CURRENT_PROGRAM_SENT = 'CURRENT_PROGRAM_SENT';

const has = Object.prototype.hasOwnProperty;

/**
 * Create an action to set the given parameter to the given value.
 * @param {number} parameter - The parameter ID to set.
 * @param {number} value - The value of the parameter.
 */
export const setParameter = (parameter, value) => (
  { type: PARAMETER_SET, payload: { parameter, value } }
);

/**
 * Create an action to set the given parameter to the given value, sending a MIDI message to the
 * configured device when appropriate.
 * @param {number} parameter - The parameter ID to set.
 * @param {number} value - The value of the parameter.
 */
export const setPanelParameter = (parameter, value) => (
  (dispatch, getState) => {
    dispatch({ type: PANEL_PARAMETER_SET, payload: { parameter, value } });
    const { configuration, midi } = getState();
    if (
      (configuration.midiOutput != null) &&
      configuration.midiSend &&
      has.call(PARAMETER_TO_CODE, parameter)
    ) {
      let message = parameterToMessage(parameter, value);
      message = [
        0xB0 ^ configuration.midiOutputChannel, // eslint-disable-line no-bitwise
        ...message,
      ];
      const output = midi.access.outputs.get(configuration.midiOutput);
      output.send(message);
    }
  }
);

/**
 * Create an action to set the current displayed program on the panel.
 * @param {Object} program - The program datastructure.
 */
export const setCurrentProgram = program => ({ type: CURRENT_PROGRAM_SET, payload: program });

/**
 * Create an action to request the current program from the configured Minilogue device.
 */
export const requestCurrentProgram = () => (
  (dispatch, getState) => {
    const { configuration, midi } = getState();
    if ((configuration.midiInput != null) && (configuration.midiOutput != null)) {
      const output = midi.access.outputs.get(configuration.midiOutput);
      const channel = configuration.midiOutputChannel;
      const message = buildMessage(channel, CURRENT_PROGRAM_DATA_DUMP_REQUEST);
      output.send(message);
      dispatch({ type: CURRENT_PROGRAM_REQUESTED, payload: true });
    }
  }
);

/**
 * Create an action to send the app's current program to the configured Minilogue device.
 */
export const sendCurrentProgram = () => (
  (dispatch, getState) => {
    const { configuration, midi, currentProgram } = getState();
    if (configuration.midiOutput) {
      const output = midi.access.outputs.get(configuration.midiOutput);
      const channel = configuration.midiOutputChannel;
      const encodedProgram = encodeProgram(currentProgram);
      const encoded = encodeSysexData(encodedProgram);
      const message = buildMessage(channel, CURRENT_PROGRAM_DATA_DUMP, encoded);
      output.send(message);
      dispatch({ type: CURRENT_PROGRAM_SENT });
    }
  }
);
