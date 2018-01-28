/**
 * Library state updates.
 */
import { LIBRARY_SET, CURRENT_LIBRARY_POSITION_SET } from '../actions/library';
import { INIT_PROGRAM } from '../minilogue/program';

const initialState = {
  library: {
    programs: [INIT_PROGRAM],
  },
  currentProgram: 0,
};

export default function libraryReducer(libraryState = initialState, action) {
  switch (action.type) {
    case LIBRARY_SET: {
      const { library } = action.payload;
      return { ...libraryState, library };
    }
    case CURRENT_LIBRARY_POSITION_SET: {
      const { index } = action.payload;
      return { ...libraryState, currentProgram: index };
    }
    default:
      return libraryState;
  }
}
