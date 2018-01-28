import reducer from './midi';
import * as actions from '../actions/midi';

describe('midi reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ports: {},
      access: null,
    });
  });

  test('handles MIDI_ACCESS_GRANTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_ACCESS_GRANTED,
          payload: 'access',
        },
      ),
    ).toEqual({
      ports: {},
      access: 'access',
    });
  });

  test('handles MIDI_PORT_CONNECTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MIDI_PORT_CONNECTED,
          payload: { id: 'newPort', type: 'input' },
        },
      ),
    ).toEqual({
      ports: {
        newPort: { id: 'newPort', type: 'input' },
      },
      access: null,
    });
  });

  test('handles MIDI_PORT_DISCONNECTED', () => {
    expect(
      reducer(
        { ports: { portId: { id: 'portId' } }, access: null },
        {
          type: actions.MIDI_PORT_DISCONNECTED,
          payload: { id: 'portId' },
        },
      ),
    ).toEqual({
      ports: {},
      access: null,
    });
  });
});
