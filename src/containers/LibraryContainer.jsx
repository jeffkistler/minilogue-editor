import { connect } from 'react-redux';
import SelectTable from '../components/SelectTable.jsx';
import { setCurrentLibraryPosition } from '../actions/library';


const mapStateToProps = (state) => {
  const { programs } = state.library.library;
  const { currentProgram } = state.library;
  return {
    value: currentProgram,
    rows: programs,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: id => dispatch(setCurrentLibraryPosition(id)),
});

const LibraryContainer = connect(mapStateToProps, mapDispatchToProps)(SelectTable);

export default LibraryContainer;
