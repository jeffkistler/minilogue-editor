import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import { deleteLibraryProgram } from '../actions/library';

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onClick: () => dispatch(deleteLibraryProgram(ownProps.index)),
  }
);

const DeleteLibraryProgramContainer = connect(undefined, mapDispatchToProps)(Button);

export default DeleteLibraryProgramContainer;
