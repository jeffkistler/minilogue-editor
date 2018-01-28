import reducer from './discovery';
import * as actions from '../actions/discovery';

describe('configuration reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ pendingSearchRequests: {} });
  });

  test('handles MINILOGUE_SEARCH_REQUEST_INITIATED', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.MINILOGUE_SEARCH_REQUEST_INITIATED,
          payload: { key: 1, port: 'port' },
        },
      ),
    ).toEqual({
      pendingSearchRequests: {
        1: 'port',
      },
    });
  });

  test('handles MINILOGUE_SEARCH_REQUEST_CANCELED', () => {
    expect(
      reducer(
        { pendingSearchRequests: { 1: 'port' } },
        {
          type: actions.MINILOGUE_SEARCH_REQUEST_INITIATED,
          payload: { key: 1 },
        },
      ),
    ).toEqual({
      pendingSearchRequests: {},
    });
  });

  test('handles MINILOGUE_SEARCH_REPLY_RECEIVED', () => {
    expect(
      reducer(
        { pendingSearchRequests: { 1: 'port' } },
        {
          type: actions.MINILOGUE_SEARCH_REPLY_RECEIVED,
          payload: { key: 1 },
        },
      ),
    ).toEqual({
      pendingSearchRequests: {},
    });
  });
});
