import { connect } from 'react-redux';
import Select from 'react-select';
import { selectMIDIInputChannel } from '../actions/configuration';

const mapStateToProps = (state) => {
  const currentInputChannel = state.configuration.midiInputChannel;
  return {
    value: currentInputChannel,
    options: Array.from({ length: 16 }, (_, index) => ({ value: index, label: index })),
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: ({ value }) => dispatch(selectMIDIInputChannel(value)),
});

const MIDIInputChannelContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default MIDIInputChannelContainer;
