import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox.jsx';
import { setMIDISend } from '../actions/configuration';

const mapStateToProps = state => ({
  value: state.configuration.midiSend,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setMIDISend(value)),
});

const MIDISendContainer = connect(mapStateToProps, mapDispatchToProps)(Checkbox);

export default MIDISendContainer;
