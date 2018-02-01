import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import { setCurrentLibraryPosition, loadLibraryPosition } from '../actions/library';

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onClick: () => {
      dispatch(setCurrentLibraryPosition(ownProps.index));
      dispatch(loadLibraryPosition(ownProps.index));
    },
  }
);

const SendProgramContainer = connect(undefined, mapDispatchToProps)(Button);

export default SendProgramContainer;
