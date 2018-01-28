import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './discovery';

jest.useFakeTimers();

describe('minilogue discovery actions', () => {
  it('should create an action to cancel a minilogue search request', () => {
    const expectedAction = {
      type: actions.MINILOGUE_SEARCH_REQUEST_CANCELED,
      payload: {
        port: 'outputPort',
        key: 1,
      },
    };
    const port = 'outputPort';
    const key = 1;
    expect(actions.cancelMinilogueSearchRequest(port, key)).toEqual(expectedAction);
  });

  it('should create an action to signal a minilogue search reply', () => {
    const expectedAction = {
      type: actions.MINILOGUE_SEARCH_REPLY_RECEIVED,
      payload: {
        input: 'inputPort',
        output: 'outputPort',
        channel: 1,
      },
    };
    const input = 'inputPort';
    const output = 'outputPort';
    const channel = 1;
    expect(actions.receiveMinilogueSearchReply(input, output, channel)).toEqual(expectedAction);
  });

  it('should make a request on the given port for minilogue device discovery', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.0;
    global.Math = mockMath;
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockSend = jest.fn();
    const expectedPort = 'port';
    const mockMidiAccess = {
      outputs: {
        get: (port) => {
          if (expectedPort === port) {
            return {
              send: mockSend,
            };
          }
          return undefined;
        },
      },
    };
    const store = mockStore({
      discovery: {
        pendingSearchRequests: {},
      },
      midi: {
        access: mockMidiAccess,
        ports: {
          port: { id: 'port', type: 'output' },
        },
      },
    });
    const expectedActions = [
      { type: actions.MINILOGUE_SEARCH_REQUEST_INITIATED, payload: { port: 'port', key: 0 } },
    ];
    store.dispatch(
      actions.initiateMinilogueSearchRequest('port'),
    );
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockSend.mock.calls.length).toBe(1);
  });

  it('times out pending search requests', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.0;
    global.Math = mockMath;
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockSend = jest.fn();
    const expectedPort = 'port';
    const mockMidiAccess = {
      outputs: {
        get: (port) => {
          if (expectedPort === port) {
            return {
              send: mockSend,
            };
          }
          return undefined;
        },
      },
    };
    const store = mockStore({
      discovery: {
        pendingSearchRequests: {},
      },
      midi: {
        access: mockMidiAccess,
        ports: {
          port: { id: 'port', type: 'output' },
        },
      },
    });

    store.dispatch(
      actions.initiateMinilogueSearchRequest('port'),
    );
    jest.runAllTimers();
    const expectedActions = [
      { type: actions.MINILOGUE_SEARCH_REQUEST_INITIATED, payload: { port: 'port', key: 0 } },
      { type: actions.MINILOGUE_SEARCH_REQUEST_CANCELED, payload: { port: 'port', key: 0 } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockSend.mock.calls.length).toBe(1);
  });

  it('discovery dispatches for all known outputs', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockSend = jest.fn();
    const mockMidiAccess = {
      outputs: {
        get: () => ({ send: mockSend }),
      },
    };
    const store = mockStore({
      discovery: {
        pendingSearchRequests: {},
      },
      midi: {
        access: mockMidiAccess,
        ports: {
          port1: { id: 'port1', type: 'output' },
          port2: { id: 'port2', type: 'output' },
          port3: { id: 'port3', type: 'input' },
        },
      },
    });
    store.dispatch(
      actions.discoverMinilogueDevices(),
    );
    expect(mockSend.mock.calls.length).toBe(2);
    expect(store.getActions().length).toBe(2);
  });
});
