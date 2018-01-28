import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import generateRandomProgram from '../minilogue/random';
import { setCurrentProgram } from '../actions/program';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => (
  {
    onClick: () => dispatch(setCurrentProgram(generateRandomProgram())),
  }
);

const RandomProgramContainer = connect(mapStateToProps, mapDispatchToProps)(Button);

export default RandomProgramContainer;
