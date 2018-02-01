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
    clearable: true,
    resetValue: undefined,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: selected => (selected
    ? dispatch(selectMIDIOutput(selected.value))
    : dispatch(selectMIDIOutput(undefined))),
});

const MIDIOutputContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default MIDIOutputContainer;
