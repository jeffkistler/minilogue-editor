import { PANEL_PARAMETER_SET, CURRENT_PROGRAM_SET } from '../actions/program';

const initialState = {
  parameter: undefined,
  value: undefined,
};

export default function programReducer(state = initialState, action) {
  switch (action.type) {
    case PANEL_PARAMETER_SET: {
      const { parameter, value } = action.payload;
      return { parameter, value };
    }
    case CURRENT_PROGRAM_SET: {
      return {
        parameter: undefined,
        value: undefined,
      };
    }
    default:
      return state;
  }
}
