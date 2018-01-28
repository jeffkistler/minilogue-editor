import { connect } from 'react-redux';
import { RIEInput } from 'riek';
import { setParameter } from '../actions/program';
import { PROGRAM_NAME } from '../minilogue/program';


const mapStateToProps = state => ({
  value: state.currentProgram[PROGRAM_NAME],
  propName: 'value',
  shouldRemainWhileInvalid: true,
  classEditing: 'program-name-editing',
  classInvalid: 'program-name-invalid',
  editProps: {
    maxLength: 12,
  },
});

const mapDispatchToProps = dispatch => ({
  change: ({ value }) => dispatch(setParameter(PROGRAM_NAME, value)),
  validate: value => ((value.length <= 12) && (value.split('').every((character) => {
    const code = character.charCodeAt(0);
    return (code >= 0) && (code <= 127);
  }))),
});

const ProgramNameContainer = connect(mapStateToProps, mapDispatchToProps)(RIEInput);

export default ProgramNameContainer;
