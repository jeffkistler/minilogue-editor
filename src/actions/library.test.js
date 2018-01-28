import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './library';

describe('library actions', () => {
  // setLibrary
  // setCurrentLibraryPosition
  it('should create an action to set the current library and current library position', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const expectedActions = [
      { type: actions.LIBRARY_SET, payload: { library: {} } },
      { type: actions.CURRENT_LIBRARY_POSITION_SET, payload: { index: undefined } },
    ];
    const store = mockStore({ library: [{ foo: 'bar' }], currentProgram: 0 });
    store.dispatch(actions.setLibrary({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to set the current library position and current program', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      library: {
        library: {
          programs: [true, true],
        },
        currentProgram: 0,
      },
    });
    store.dispatch(actions.setCurrentLibraryPosition(1));
    const expectedActions = [
      { type: 'CURRENT_PROGRAM_SET', payload: true },
      { type: actions.CURRENT_LIBRARY_POSITION_SET, payload: { index: 1 } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
