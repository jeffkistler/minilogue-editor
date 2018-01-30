import { connect } from 'react-redux';
import Select from 'react-select';
import { selectMIDIInput } from '../actions/configuration';

const mapStateToProps = (state) => {
  const currentInput = state.configuration.midiInput;
  const availableInputs = Object.values(state.midi.ports).filter(port => port.type === 'input');
  return {
    value: currentInput,
    options: availableInputs.map(input => ({
      value: input.id,
      label: input.name,
    })),
    clearable: false,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: ({ value }) => dispatch(selectMIDIInput(value)),
});

const MIDIInputContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default MIDIInputContainer;
