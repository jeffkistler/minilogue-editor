import { connect } from 'react-redux';
import ProgramTable from '../components/ProgramTable.jsx';
import { moveLibraryProgram } from '../actions/library';


const mapStateToProps = (state) => {
  const { programs } = state.library.library;
  const { currentProgram } = state.library;
  return {
    value: currentProgram,
    rows: programs,
  };
};

const mapDispatchToProps = dispatch => ({
  onSortEnd: ({ oldIndex, newIndex }) => (
    (oldIndex !== newIndex) && dispatch(moveLibraryProgram(oldIndex, newIndex))
  ),
});

const LibraryContainer = connect(mapStateToProps, mapDispatchToProps)(ProgramTable);

export default LibraryContainer;
