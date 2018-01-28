import { connect } from 'react-redux';
import { setPanelParameter } from '../actions/program';
import Switch from '../components/Switch.jsx';


const mapStateToProps = (state, ownProps) => ({
  value: state.currentProgram[ownProps.parameter],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => dispatch(setPanelParameter(ownProps.parameter, value)),
});


const SwitchContainer = connect(mapStateToProps, mapDispatchToProps)(Switch);

export default SwitchContainer;
