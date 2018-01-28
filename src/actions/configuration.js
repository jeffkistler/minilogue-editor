/**
 * MIDI and application configuration actions.
 */
export const MIDI_INPUT_SELECTED = 'MIDI_INPUT_SELECTED';
export const MIDI_INPUT_CHANNEL_SELECTED = 'MIDI_INPUT_CHANNEL_SELECTED';
export const MIDI_OUTPUT_SELECTED = 'MIDI_OUTPUT_SELECTED';
export const MIDI_OUTPUT_CHANNEL_SELECTED = 'MIDI_OUTPUT_CHANNEL_SELECTED';
export const MIDI_SEND_SET = 'MIDI_SEND_SET';
export const MIDI_RECEIVE_SET = 'MIDI_RECEIVE_SET';

/**
 * Create a select MIDI input action.
 * @param {string} midiInput - The ID key of the MIDI input port.
 * @returns {Object}
 */
export const selectMIDIInput = midiInput => (
  {
    type: MIDI_INPUT_SELECTED,
    payload: midiInput,
  }
);

/**
 * Create a select MIDI input channel action.
 * @param {number} midiInputChannel - The MIDI channel to receive messages on.
 * @returns {Object}
 */
export const selectMIDIInputChannel = midiInputChannel => (
  {
    type: MIDI_INPUT_CHANNEL_SELECTED,
    payload: midiInputChannel,
  }
);

/**
 * Create a select MIDI output action.
 * @param {string} midiOutput - The ID key of the output port
 * @returns {Object}
 */
export const selectMIDIOutput = midiOutput => (
  {
    type: MIDI_OUTPUT_SELECTED,
    payload: midiOutput,
  }
);

/**
 * Create a select MIDI output channel action.
 * @param {number} midiOutputChannel - The MIDI channel to send messages on.
 * @returns {Object}
 */
export const selectMIDIOutputChannel = midiOutputChannel => (
  {
    type: MIDI_OUTPUT_CHANNEL_SELECTED,
    payload: midiOutputChannel,
  }
);

/**
 * Create a set MIDI send preference action.
 * @param {boolean} midiSend - Whether or not to send MIDI Control Change
 * messages to the configured device
 * @returns {Object}
 */
export const setMIDISend = midiSend => (
  {
    type: MIDI_SEND_SET,
    payload: midiSend,
  }
);

/**
 * Create a set MIDI receive preference action.
 * @param {boolean} midiReceive
 * @returns {Object}
 */
export const setMIDIReceive = midiReceive => (
  {
    type: MIDI_RECEIVE_SET,
    payload: midiReceive,
  }
);
