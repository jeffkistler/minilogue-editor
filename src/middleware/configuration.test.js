import configureMockStore from 'redux-mock-store';
import configurationMiddleware from './configuration';
import { connectMIDIPort } from '../actions/midi';
import { selectMIDIInput, selectMIDIInputChannel } from '../actions/configuration';
import { receiveMinilogueSearchReply } from '../actions/discovery';

describe('configuration middleware', () => {
  describe('preferred port handling', () => {
    test('does not set input when there is no preferred configured', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        configuration: {
          midiInput: null,
          preferredInput: null,
        },
      });

      const mockNext = jest.fn();
      const action = connectMIDIPort({ type: 'input', id: 'test' });
      configurationMiddleware(store)(mockNext)(action);
      expect(store.getActions()).toEqual([]);
    });

    test('sets input port when there is a preferred configured, the connected port is the same as that port, and no port currently selected', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        configuration: {
          midiInput: null,
          preferredInput: 'preferred',
        },
      });
      const mockNext = jest.fn();
      const port = { type: 'input', id: 'preferred' };
      const action = connectMIDIPort(port);
      configurationMiddleware(store)(mockNext)(action);
      const expectedActions = [
        selectMIDIInput('preferred'),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('does not set input port when there is a preferred configured, the connected port is not the same as that port, and no port currently selected', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        configuration: {
          midiInput: null,
          preferredInput: 'preferred',
        },
      });
      const mockNext = jest.fn();
      const port = { type: 'input', id: 'another' };
      const action = connectMIDIPort(port);
      configurationMiddleware(store)(mockNext)(action);
      expect(store.getActions()).toEqual([]);
    });
  });
  describe('minilogue discovery handling', () => {
    test('sets an input when a minilogue search reply is received and no input is configured', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        configuration: {
          midiInput: null,
          midiInputChannel: 0,
          preferredInput: 'preferredIn',
          midiOutput: 'oldOutput',
          midiOutputChannel: 0,
          preferredOutput: 'preferredOut',
        },
      });
      const mockNext = jest.fn();
      const action = receiveMinilogueSearchReply('newInput', 'newOutput', 1);
      configurationMiddleware(store)(mockNext)(action);
      const expectedActions = [
        selectMIDIInput('newInput'),
        selectMIDIInputChannel(1),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
