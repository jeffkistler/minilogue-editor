import reducer from './program';
import * as actions from '../actions/program';
import { INIT_PROGRAM, CUTOFF } from '../minilogue/program';


describe('program reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INIT_PROGRAM);
  });

  test('handles parameter set', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.PARAMETER_SET,
          payload: { parameter: CUTOFF, value: 0 },
        },
      ),
    ).toEqual(expect.objectContaining({ [CUTOFF]: 0 }));
  });

  test('handles program set', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.CURRENT_PROGRAM_SET,
          payload: {},
        },
      ),
    ).toEqual({});
  });
});
