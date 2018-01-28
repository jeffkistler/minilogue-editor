import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import { requestCurrentProgram } from '../actions/program';

const mapStateToProps = state => (
  {
    disabled: (
      (state.configuration.midiInput === null) ||
      (state.configuration.midiOutput === null)
    ),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onClick: () => dispatch(requestCurrentProgram()),
  }
);

const RequestProgramContainer = connect(mapStateToProps, mapDispatchToProps)(Button);

export default RequestProgramContainer;
