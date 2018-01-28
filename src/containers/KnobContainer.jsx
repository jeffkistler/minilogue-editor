import { connect } from 'react-redux';
import { setPanelParameter } from '../actions/program';
import Knob from '../components/Knob.jsx';


const mapStateToProps = (state, ownProps) => ({
  value: state.currentProgram[ownProps.parameter],
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => dispatch(setPanelParameter(ownProps.parameter, value)),
});


const KnobContainer = connect(mapStateToProps, mapDispatchToProps)(Knob);

export default KnobContainer;
