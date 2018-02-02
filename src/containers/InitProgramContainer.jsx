import { connect } from 'react-redux';
import { setCurrentProgram } from '../actions/program';
import { INIT_PROGRAM } from '../minilogue/program';
import Button from '../components/Button.jsx';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(setCurrentProgram(INIT_PROGRAM)),
});

const InitProgramContainer = connect(undefined, mapDispatchToProps)(Button);

export default InitProgramContainer;
