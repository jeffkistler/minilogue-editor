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
});
