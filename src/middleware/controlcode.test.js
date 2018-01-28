import configureMockStore from 'redux-mock-store';
import controlCodeMiddleware from './controlcode';
import { receiveMIDIMessage } from '../actions/midi';


describe('MIDI CC middleware', () => {
  test('ignores non-midi message actions', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      configuration: {
        midiReceive: true,
      },
    });
    const mockNext = jest.fn();
    const action = { type: 'test', payload: 'this is a test' };
    controlCodeMiddleware(store)(mockNext)(action);
    expect(store.getActions().length).toBe(0);
  });

  test('ignores CC changes when receive is not configured', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      configuration: {
        midiInput: 'configured',
        midiInputChannel: 0,
        midiReceive: false,
      },
    });
    const mockNext = jest.fn();
    const action = receiveMIDIMessage({
      data: [0xB0, 0x0, 0x0],
      timeStamp: 0,
      target: 'configured',
    });
    controlCodeMiddleware(store)(mockNext)(action);
    expect(store.getActions().length).toBe(0);
  });

  test('ignores CC changes when receive port is not the same as message port', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      configuration: {
        midiInput: 'configured',
        midiInputChannel: 1,
        midiReceive: true,
      },
    });
    const mockNext = jest.fn();
    const action = receiveMIDIMessage({
      data: [0xB0, 0x0, 0x0],
      timeStamp: 0,
      target: 'configured',
    });
    controlCodeMiddleware(store)(mockNext)(action);
    expect(store.getActions().length).toBe(0);
  });

  test('dispatches a set parameter action when the CC is recognized on the right input/port', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      configuration: {
        midiInput: 'configured',
        midiInputChannel: 0,
        midiReceive: true,
      },
    });
    const mockNext = jest.fn();
    const action = receiveMIDIMessage({
      data: [0xB0, 43, 0],
      timeStamp: 0,
      target: 'configured',
    });
    controlCodeMiddleware(store)(mockNext)(action);
    const seenActions = store.getActions();
    expect(seenActions.length).toBe(1);
    expect(seenActions[0].type).toEqual('PARAMETER_SET');
  });
});
