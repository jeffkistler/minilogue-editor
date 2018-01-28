import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import minilogueDiscoveryMiddleware from './discovery';
import { receiveMIDIMessage, connectMIDIPort } from '../actions/midi';
import { receiveMinilogueSearchReply, initiateMinilogueSearchRequestForOutput } from '../actions/discovery';

describe('minilogue discovery middleware', () => {
  describe('search reply', () => {
    test('ignores non-search reply midi message actions', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        discovery: {
          pendingSearchRequests: {},
        },
      });
      const mockNext = jest.fn();
      const action = receiveMIDIMessage({
        data: [
          0xf0, 0x7e, 0x00, 0x06, 0x02, 0x42, 0x2c, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7,
        ],
        timeStamp: 0,
        target: 'portID',
      });
      minilogueDiscoveryMiddleware(store)(mockNext)(action);
      expect(store.getActions()).toEqual([]);
    });

    test('reacts to a search reply midi message action when a known search id is given', () => {
      const channel = 0;
      const echoBackID = 0x02;
      const mockStore = configureMockStore();
      const store = mockStore({
        discovery: {
          pendingSearchRequests: {
            [echoBackID]: 'outputPort',
          },
        },
      });
      const mockNext = jest.fn();
      const action = receiveMIDIMessage({
        data: [
          0xf0, 0x42, 0x50, 0x01, channel, echoBackID, 0x2c, 0x01,
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7,
        ],
        timeStamp: 0,
        target: 'inputPort',
      });
      minilogueDiscoveryMiddleware(store)(mockNext)(action);
      const expectedActions = [
        receiveMinilogueSearchReply('inputPort', 'outputPort', 0),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('does not react to a search reply midi message action when an unknown search id is given', () => {
      const echoBackID = 0x02;
      const mockStore = configureMockStore();
      const store = mockStore({
        discovery: {
          pendingSearchRequests: {
            [echoBackID]: 'outputPort',
          },
        },
      });
      const mockNext = jest.fn();
      const action = receiveMIDIMessage({
        data: [
          0xf0, 0x42, 0x50, 0x01, 0x00, 0x01, 0x2c, 0x01,
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf7,
        ],
        timeStamp: 0,
        target: 'inputPort',
      });
      minilogueDiscoveryMiddleware(store)(mockNext)(action);
      expect(store.getActions()).toEqual([]);
    });
  });


  describe('midi connected actions', () => {
    test('ignores midi connected action when not an output', () => {
      const mockStore = configureMockStore();
      const store = mockStore({
        discovery: {
          pendingSearchRequests: {},
        },

      });
      const mockNext = jest.fn();
      const action = connectMIDIPort({ id: 'input', type: 'input' });
      minilogueDiscoveryMiddleware(store)(mockNext)(action);
      expect(store.getActions()).toEqual([]);
    });

    test('dispatches a discovery action on midi connected action when an output', () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.0;
      global.Math = mockMath;
      const mockStore = configureMockStore([thunk]);
      const store = mockStore({
        configuration: {
          midiInput: null,
          midiInputPort: 0,
          midiOutput: null,
          midiOutputPort: 0,
        },
        discovery: {
          pendingSearchRequests: {},
        },
        midi: {
          access: {
            outputs: {
              get: () => ({ send: jest.fn() }),
            },
          },
        },
      });
      const mockNext = jest.fn();
      const action = connectMIDIPort({ id: 'output', type: 'output' });
      minilogueDiscoveryMiddleware(store)(mockNext)(action);
      const expectedActions = [
        initiateMinilogueSearchRequestForOutput('output', 0),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
