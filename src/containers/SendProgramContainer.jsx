import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import { sendCurrentProgram } from '../actions/program';

const mapStateToProps = state => (
  {
    disabled: (state.configuration.midiOutput === null),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onClick: () => dispatch(sendCurrentProgram()),
  }
);

const SendProgramContainer = connect(mapStateToProps, mapDispatchToProps)(Button);

export default SendProgramContainer;
