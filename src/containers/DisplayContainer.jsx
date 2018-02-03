import { connect } from 'react-redux';
import { getParameterDisplayValue, getParameterDisplayName } from '../minilogue/display';
import Display from '../components/Display.jsx';


const mapStateToProps = ({ currentProgram, display }) => (
  {
    parameter: display.parameter ?
      getParameterDisplayName(display.parameter)
      : undefined,
    value: display.parameter
      ? getParameterDisplayValue(currentProgram, display.parameter)
      : undefined,
  }
);

const DisplayContainer = connect(mapStateToProps)(Display);

export default DisplayContainer;
