import reducer from './library';
import * as actions from '../actions/library';
import { INIT_PROGRAM } from '../minilogue/program';

describe('configuration reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      library: {
        programs: [INIT_PROGRAM],
      },
      currentProgram: 0,
    });
  });

  test('handles library set', () => {
    expect(
      reducer(
        undefined,
        { type: actions.LIBRARY_SET, payload: { library: {} } },
      ),
    ).toEqual(
      { library: {}, currentProgram: 0 },
    );
  });

  test('handles library position set', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.CURRENT_LIBRARY_POSITION_SET,
          payload: { index: 1 },
        },
      ),
    ).toEqual(
      {
        library: { programs: [INIT_PROGRAM] },
        currentProgram: 1,
      },
    );
  });

  test('handles library program move', () => {
    expect(
      reducer(
        {
          library: { programs: ['a', 'b', 'c', 'd'] },
          currentProgram: 1,
        },
        {
          type: actions.LIBRARY_PROGRAM_MOVE,
          payload: {
            fromIndex: 0,
            toIndex: 2,
          },
        },
      ),
    ).toEqual(
      {
        library: { programs: ['b', 'c', 'a', 'd'] },
        currentProgram: 1,
      },
    );
  });

  test('handles library program delete', () => {
    expect(
      reducer(
        {
          library: { programs: ['a', 'b', 'c', 'd'] },
          currentProgram: 1,
        },
        {
          type: actions.LIBRARY_PROGRAM_DELETE,
          payload: { index: 2 },
        },
      ),
    ).toEqual(
      {
        library: { programs: ['a', 'b', 'd'] },
        currentProgram: 1,
      },
    );
  });

  test('handles library program append', () => {
    expect(
      reducer(
        {
          library: { programs: ['a'] },
          currentProgram: 0,
        },
        {
          type: actions.LIBRARY_PROGRAM_APPEND,
        },
      ),
    ).toEqual(
      {
        library: { programs: ['a', INIT_PROGRAM] },
        currentProgram: 0,
      },
    );
  });

  test('handles current library position program save', () => {
    expect(
      reducer(
        {
          library: { programs: ['a'] },
          currentProgram: 0,
        },
        {
          type: actions.LIBRARY_CURRENT_PROGRAM_SAVE,
          payload: {
            program: 'b',
          },
        },
      ),
    ).toEqual(
      {
        library: { programs: ['b'] },
        currentProgram: 0,
      },
    );
  });
});
