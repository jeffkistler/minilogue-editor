import { connect } from 'react-redux';
import { setCurrentLibraryPosition } from '../actions/library';
import Knob from '../components/Knob.jsx';

const mapStateToProps = state => (
  {
    value: state.library.currentProgram,
    max: state.library.library ? state.library.library.programs.length - 1 : 0,
  }
);

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setCurrentLibraryPosition(value)),
});

const ProgramChangeContainer = connect(mapStateToProps, mapDispatchToProps)(Knob);

export default ProgramChangeContainer;
