import { connect } from 'react-redux';
import { setLibrary } from '../actions/library';
import { INIT_PROGRAM } from '../minilogue/program';
import Button from '../components/Button.jsx';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(setLibrary({ programs: [INIT_PROGRAM] })),
});

const NewLibraryContainer = connect(undefined, mapDispatchToProps)(Button);

export default NewLibraryContainer;
