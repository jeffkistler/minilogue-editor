/**
 * Program library actions.
 */
import { setCurrentProgram } from './program';

export const LIBRARY_SET = 'LIBRARY_SET';
export const CURRENT_LIBRARY_POSITION_SET = 'LIBRARY_CURRENT_POSITION_SET';
export const LIBRARY_PROGRAM_MOVE = 'LIBRARY_PROGRAM_MOVE';
export const LIBRARY_PROGRAM_DELETE = 'LIBRARY_PROGRAM_DELETE';
export const LIBRARY_PROGRAM_APPEND = 'LIBRARY_PROGRAM_APPEND';
export const LIBRARY_CURRENT_PROGRAM_SAVE = 'LIBRARY_CURRENT_PROGRAM_SAVE';

/**
 * Create an action to set the currently loaded library.
 * @param {Object} library - The library envelope object.
 */
export const setLibrary = library => (
  (dispatch) => {
    dispatch({ type: LIBRARY_SET, payload: { library } });
    dispatch({ type: CURRENT_LIBRARY_POSITION_SET, payload: { index: 0 } });
  }
);

/**
 * Create an action to set the index into the set of programs in the currently loaded library.
 * @param {number} index - The array index into the library's programs.
 */
export const setCurrentLibraryPosition = index => (
  {
    type: CURRENT_LIBRARY_POSITION_SET,
    payload: { index },
  }
);

/**
 * Create an action to set the current program to the program in the library at the given index.
 * @param {number} index - The array index into the library's programs.
 */
export const loadLibraryPosition = index => (
  (dispatch, getState) => {
    const { library: libraryState } = getState();
    const { library } = libraryState;
    if (typeof library.programs[index] !== 'undefined') {
      dispatch(setCurrentProgram(library.programs[index]));
    }
  }
);

/**
 * Create an action to move a program within the library.
 * @param {number} fromIndex - The index of the program.
 * @param {number} toIndex - The new index to move the program to.
 */
export const moveLibraryProgram = (fromIndex, toIndex) => (
  {
    type: LIBRARY_PROGRAM_MOVE,
    payload: { fromIndex, toIndex },
  }
);

/**
 * Create an action to delete a program within the library.
 * @param {number} index - The index of the program to remove.
 */
export const deleteLibraryProgram = index => (
  {
    type: LIBRARY_PROGRAM_DELETE,
    payload: { index },
  }
);

/**
 * Create an action to initialize a row at the end of the library.
 */
export const appendLibraryProgram = () => (
  {
    type: LIBRARY_PROGRAM_APPEND,
  }
);

/**
 * Create an action to write the current panel to the current library position.
 */
export const writePanelToCurrentLibraryPosition = () => (
  (dispatch, getState) => {
    const { currentProgram: program } = getState();
    dispatch({ type: LIBRARY_CURRENT_PROGRAM_SAVE, payload: { program } });
  }
);
