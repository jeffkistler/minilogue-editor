import { connect } from 'react-redux';
import Select from 'react-select';
import { selectMIDIOutputChannel } from '../actions/configuration';

const mapStateToProps = (state) => {
  const currentOutputChannel = state.configuration.midiOutputChannel;
  return {
    value: currentOutputChannel,
    options: Array.from({ length: 16 }, (_, index) => ({ value: index, label: index })),
    clearable: false,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: ({ value }) => dispatch(selectMIDIOutputChannel(value)),
});

const MIDIOutputChannelContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default MIDIOutputChannelContainer;
