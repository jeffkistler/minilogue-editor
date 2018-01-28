import configureMockStore from 'redux-mock-store';
import { receiveMIDIMessage } from '../actions/midi';
import programMiddleware from './program';

describe('program middleware', () => {
  test('ignores non-midi message actions', () => {
    const mockStore = { dispatch: jest.fn() };
    const mockNext = jest.fn();
    const action = { type: 'test', payload: 'This is a test' };
    programMiddleware(mockStore)(mockNext)(action);
    expect(mockStore.dispatch.mock.calls.length).toBe(0);
  });

  test('dispatches on a midi sysex program dump', () => {
    const mockStore = configureMockStore();
    const store = mockStore();
    const mockNext = jest.fn();
    const data = atob('8EIyAAEsQABQUk9HSW5pAHQgUHJvZ3JAYW0gICAgADIAAAAAAH8ACgB/AAAAAAATAH8AAAAAAD0AAH9/f38AHEAbABAQMDABQDAAID0AAHN8SA8if39leABmTXp/f39/f39/f39/f39/f39/f39/H39/f39/U0UEUUQwBAIQAAA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9w==').split('').map(c => c.charCodeAt(0));
    const action = receiveMIDIMessage({ data });
    programMiddleware(store)(mockNext)(action);
    const seenActions = store.getActions();
    expect(seenActions.length).toBe(1);
    expect(seenActions[0].type).toEqual('CURRENT_PROGRAM_SET');
  });
});
