import * as actions from './midi';

describe('MIDI actions', () => {
  it('should create an action representing a MIDI access grant', () => {
    const expectedAction = {
      type: actions.MIDI_ACCESS_GRANTED,
      payload: 'dummy',
    };
    const access = 'dummy';
    expect(actions.grantMIDIAccess(access)).toEqual(expectedAction);
  });
  it('should create an action representing a MIDI port connection', () => {
    const expectedAction = {
      type: actions.MIDI_PORT_CONNECTED,
      payload: 'dummy',
    };
    const access = 'dummy';
    expect(actions.connectMIDIPort(access)).toEqual(expectedAction);
  });
  it('should create an action representing a MIDI port disconnection', () => {
    const expectedAction = {
      type: actions.MIDI_PORT_DISCONNECTED,
      payload: 'dummy',
    };
    const access = 'dummy';
    expect(actions.disconnectMIDIPort(access)).toEqual(expectedAction);
  });
  it('should create an action representing a MIDI message', () => {
    const expectedAction = {
      type: actions.MIDI_MESSAGE_RECEIVED,
      payload: 'dummy',
    };
    const access = 'dummy';
    expect(actions.receiveMIDIMessage(access)).toEqual(expectedAction);
  });
});
