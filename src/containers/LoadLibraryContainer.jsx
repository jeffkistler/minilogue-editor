import { connect } from 'react-redux';
import { setLibrary } from '../actions/library';
import { loadLibrarianFile } from '../minilogue/library';
import FileInput from '../components/FileInput.jsx';

const mapStateToProps = () => ({
  classNames: ['menu-button'],
});

const read = file => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = e => resolve(e.target.result);
  reader.readAsArrayBuffer(file);
});

const mapDispatchToProps = dispatch => ({
  onChange: (e) => {
    read(e.target.files[0])
      .then(file => loadLibrarianFile(file))
      .then(library => dispatch(setLibrary(library)));
  },
});

const LoadLibraryContainer = connect(mapStateToProps, mapDispatchToProps)(FileInput);

export default LoadLibraryContainer;
