/**
 * Program library actions.
 */
import { setCurrentProgram } from '../actions/program';

export const LIBRARY_SET = 'LIBRARY_SET';
export const CURRENT_LIBRARY_POSITION_SET = 'CURRENT_LIBRARY_POSITION_SET';

/**
 * Create an action to set the currently loaded library.
 * @param {Object} library - The library envelope object.
 */
export const setLibrary = library => (
  (dispatch) => {
    dispatch({ type: LIBRARY_SET, payload: { library } });
    dispatch({ type: CURRENT_LIBRARY_POSITION_SET, payload: { index: undefined } });
  }
);

/**
 * Create an action to set the index into the set of programs in the currently loaded library.
 * @param {number} index - The array index into the library's programs.
 */
export const setCurrentLibraryPosition = index => (
  (dispatch, getState) => {
    const { library: libraryState } = getState();
    const { currentPosition, library } = libraryState;
    if (index !== currentPosition) {
      if (typeof library.programs[index] !== 'undefined') {
        dispatch(setCurrentProgram(library.programs[index]));
      }
    }
    dispatch({
      type: CURRENT_LIBRARY_POSITION_SET,
      payload: { index },
    });
  }
);
