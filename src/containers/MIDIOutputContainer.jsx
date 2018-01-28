import { connect } from 'react-redux';
import Select from 'react-select';
import { selectMIDIOutput } from '../actions/configuration';

const mapStateToProps = (state) => {
  const currentOutput = state.configuration.midiOutput;
  const availableOutputs = Object.values(state.midi.ports).filter(port => port.type === 'output');
  return {
    value: currentOutput,
    options: availableOutputs.map(output => ({
      value: output.id,
      label: output.name,
    })),
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: ({ value }) => dispatch(selectMIDIOutput(value)),
});

const MIDIOutputContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default MIDIOutputContainer;
