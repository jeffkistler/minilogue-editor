/**
 * Library state updates.
 */
import {
  LIBRARY_SET,
  CURRENT_LIBRARY_POSITION_SET,
  LIBRARY_PROGRAM_MOVE,
  LIBRARY_PROGRAM_DELETE,
  LIBRARY_PROGRAM_APPEND,
  LIBRARY_CURRENT_PROGRAM_SAVE,
} from '../actions/library';
import { INIT_PROGRAM } from '../minilogue/program';

const initialState = {
  library: {
    programs: [INIT_PROGRAM],
  },
  currentProgram: 0,
};

const arrayMove = (arr, previousIndex, newIndex) => {
  const array = [...arr];
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k + 1) {
      array.push(INIT_PROGRAM);
      k -= 1;
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
};

const moveLibraryProgram = (libraryState, fromIndex, toIndex) => {
  const { library } = libraryState;
  const { programs } = library;
  const newPrograms = arrayMove(programs, fromIndex, toIndex);
  return { ...libraryState, library: { ...library, programs: newPrograms } };
};

const deleteLibraryProgram = (libraryState, index) => {
  const { library } = libraryState;
  const { programs } = library;
  const newPrograms = [...programs];
  newPrograms.splice(index, 1);
  if (newPrograms.length === 0) {
    newPrograms.push(INIT_PROGRAM);
  }
  return { ...libraryState, library: { ...library, programs: newPrograms } };
};

const appendLibraryProgram = (libraryState) => {
  const { library } = libraryState;
  const { programs } = library;
  const newPrograms = [...programs, INIT_PROGRAM];
  return { ...libraryState, library: { ...library, programs: newPrograms } };
};

const saveProgramToCurrentLibraryPosition = (libraryState, { program }) => {
  const { library, currentProgram } = libraryState;
  const { programs } = library;
  const newPrograms = [...programs];
  newPrograms[currentProgram] = program;
  return { ...libraryState, library: { ...library, programs: newPrograms } };
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
    case LIBRARY_PROGRAM_MOVE: {
      const { fromIndex, toIndex } = action.payload;
      return moveLibraryProgram(libraryState, fromIndex, toIndex);
    }
    case LIBRARY_PROGRAM_DELETE: {
      return deleteLibraryProgram(libraryState, action.payload);
    }
    case LIBRARY_PROGRAM_APPEND: {
      return appendLibraryProgram(libraryState);
    }
    case LIBRARY_CURRENT_PROGRAM_SAVE: {
      return saveProgramToCurrentLibraryPosition(libraryState, action.payload);
    }
    default:
      return libraryState;
  }
}
