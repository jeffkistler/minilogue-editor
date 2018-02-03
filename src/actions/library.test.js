import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './library';
import { CURRENT_PROGRAM_SET } from './program';

describe('library actions', () => {
  it('should create an action to set the current library and current library position', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const expectedActions = [
      { type: actions.LIBRARY_SET, payload: { library: {} } },
      { type: actions.CURRENT_LIBRARY_POSITION_SET, payload: { index: 0 } },
    ];
    const store = mockStore({ library: [{ foo: 'bar' }], currentProgram: 0 });
    store.dispatch(actions.setLibrary({}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to set the current library position', () => {
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
      { type: actions.CURRENT_LIBRARY_POSITION_SET, payload: { index: 1 } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to save the current program to the current library position', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      library: {
        library: {
          programs: [true, true],
        },
        currentProgram: 0,
      },
      currentProgram: 'test',
    });
    store.dispatch(actions.writePanelToCurrentLibraryPosition());
    const expectedActions = [
      { type: actions.LIBRARY_CURRENT_PROGRAM_SAVE, payload: { program: 'test' } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to load a program at a given library index', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      library: {
        library: {
          programs: [true, 'two'],
        },
        currentProgram: 0,
      },
      currentProgram: 'test',
    });
    store.dispatch(actions.loadLibraryPosition(1));
    const expectedActions = [
      { type: CURRENT_PROGRAM_SET, payload: 'two' },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to move a program within the library', () => {
    const expectedAction = {
      type: actions.LIBRARY_PROGRAM_MOVE,
      payload: {
        fromIndex: 0,
        toIndex: 2,
      },
    };
    expect(actions.moveLibraryProgram(0, 2)).toEqual(expectedAction);
  });

  it('should create an action to delete a program within the library', () => {
    const expectedAction = {
      type: actions.LIBRARY_PROGRAM_DELETE,
      payload: {
        index: 2,
      },
    };
    expect(actions.deleteLibraryProgram(2)).toEqual(expectedAction);
  });

  it('should create an action to append a program to the end of the library', () => {
    const expectedAction = {
      type: actions.LIBRARY_PROGRAM_APPEND,
    };
    expect(actions.appendLibraryProgram()).toEqual(expectedAction);
  });
});
