import { LOCATION_CHANGE } from 'react-router-redux';
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

  test('handles panel parameter set', () => {
    expect(
      reducer(
        undefined,
        {
          type: actions.PANEL_PARAMETER_SET,
          payload: { parameter: CUTOFF, value: 512 },
        },
      ),
    ).toEqual(expect.objectContaining({ [CUTOFF]: 512 }));
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

  test('handles loading from querystring', () => {
    expect(
      reducer(
        undefined,
        {
          type: LOCATION_CHANGE,
          payload: {
            search: 'sysex=F2E66208Y9VZFK6BCGM52218S97JYWJ8SHJG009361CWZG05RGG2035534CJ0G6EM6Z5WG60R30C3GC0860S38804JKC9G60SB091SPBRJ00P15VP82BM65G60430C4RW5A382Q8100AVM8DER',
          },
        },
      ),
    ).toEqual(
      INIT_PROGRAM,
    );
  });
});
