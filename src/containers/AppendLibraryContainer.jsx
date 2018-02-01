import { connect } from 'react-redux';
import { appendLibraryProgram } from '../actions/library';
import Button from '../components/Button.jsx';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(appendLibraryProgram()),
});

const AppendLibraryContainer = connect(undefined, mapDispatchToProps)(Button);

export default AppendLibraryContainer;
