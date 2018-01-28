/**
 * Current program state updates.
 */
import { PARAMETER_SET, CURRENT_PROGRAM_SET } from '../actions/program';
import { INIT_PROGRAM } from '../minilogue/program';

export default function programReducer(program = INIT_PROGRAM, action) {
  switch (action.type) {
    case PARAMETER_SET: {
      const { parameter, value } = action.payload;
      const updated = { ...program };
      updated[parameter] = value;
      return updated;
    }
    case CURRENT_PROGRAM_SET:
      return action.payload;
    default:
      return program;
  }
}
