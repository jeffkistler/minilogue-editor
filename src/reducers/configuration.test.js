import reducer from './configuration';
import * as actions from '../actions/configuration';
import { MIDI_PORT_DISCONNECTED } from '../actions/midi';

describe('configuration reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: null,
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_INPUT_SELECTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_INPUT_SELECTED,
          payload: 'input',
        },
      ),
    ).toEqual({
      midiInput: 'input',
      midiInputChannel: 0,
      preferredInput: 'input',
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_INPUT_CHANNEL_SELECTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_INPUT_CHANNEL_SELECTED,
          payload: 1,
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 1,
      preferredInput: null,
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_OUTPUT_SELECTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_OUTPUT_SELECTED,
          payload: 'output',
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: null,
      midiOutput: 'output',
      midiOutputChannel: 0,
      preferredOutput: 'output',
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_OUTPUT_CHANNEL_SELECTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_OUTPUT_CHANNEL_SELECTED,
          payload: 1,
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: null,
      midiOutput: null,
      midiOutputChannel: 1,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_SEND_SET', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_SEND_SET,
          payload: true,
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: null,
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: true,
      midiReceive: false,
    });
  });

  test('handles MIDI_RECEIVE_SET', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_RECEIVE_SET,
          payload: true,
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: null,
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: true,
    });
  });

  test('handles MIDI_PORT_DISCONNECTED with unset port', () => {
    expect(
      reducer(
        {
          midiInput: 'known',
          midiInputChannel: 0,
          preferredInput: 'known',
          midiOutput: null,
          midiOutputChannel: 0,
          preferredOutput: null,
          midiSend: false,
          midiReceive: false,
        },
        {
          type: MIDI_PORT_DISCONNECTED,
          payload: { id: 'unknown' },
        },
      ),
    ).toEqual({
      midiInput: 'known',
      midiInputChannel: 0,
      preferredInput: 'known',
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });

  test('handles MIDI_PORT_DISCONNECTED with set port', () => {
    expect(
      reducer(
        {
          midiInput: 'known',
          midiInputChannel: 0,
          preferredInput: 'known',
          midiOutput: null,
          midiOutputChannel: 0,
          preferredOutput: null,
          midiSend: false,
          midiReceive: false,
        },
        {
          type: MIDI_PORT_DISCONNECTED,
          payload: { id: 'known' },
        },
      ),
    ).toEqual({
      midiInput: null,
      midiInputChannel: 0,
      preferredInput: 'known',
      midiOutput: null,
      midiOutputChannel: 0,
      preferredOutput: null,
      midiSend: false,
      midiReceive: false,
    });
  });
});
