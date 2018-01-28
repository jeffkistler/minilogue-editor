import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox.jsx';
import { setMIDIReceive } from '../actions/configuration';

const mapStateToProps = state => ({
  value: state.configuration.midiReceive,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setMIDIReceive(value)),
});

const MIDIReceiveContainer = connect(mapStateToProps, mapDispatchToProps)(Checkbox);

export default MIDIReceiveContainer;
