import { connect } from 'react-redux';
import { setParameter } from '../actions/program';
import LEDArray from '../components/LEDArray.jsx';
import { DISPLAY_OPTIONS } from '../minilogue/display';

const getChoices = parameter => DISPLAY_OPTIONS[parameter].choices;

const mapStateToProps = (state, ownProps) => (
  {
    value: state.currentProgram[ownProps.parameter],
    options: (ownProps.reverse
      ? Object.keys(getChoices(ownProps.parameter)).reverse()
      : Object.keys(getChoices(ownProps.parameter))
    ).map(key => ({ value: parseInt(key, 10) })),
  }
);


const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onChange: value => dispatch(setParameter(ownProps.parameter, value)),
  }
);


const LEDArrayContainer = connect(mapStateToProps, mapDispatchToProps)(LEDArray);

export default LEDArrayContainer;
