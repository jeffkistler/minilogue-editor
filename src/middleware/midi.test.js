import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import midiMiddleware from './midi';

describe('MIDI middleware', () => {
  test('handles midi access granted', () => {
    const midiAccess = {
      inputs: {
        values: () => [],
      },
      outputs: {
        values: () => [],
      },
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      midi: {
        ports: {},
        access: null,
      },
    });
    midiMiddleware(store, Promise.resolve(midiAccess));
    // expect(store.getActions().length).toBe(1);
  });
});
