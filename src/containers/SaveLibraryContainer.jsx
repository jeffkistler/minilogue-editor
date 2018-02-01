import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import Button from '../components/Button.jsx';
import { createLibraryFile } from '../minilogue/library';


const mapStateToProps = state => ({
  onClick: () => {
    const { library } = state.library;
    createLibraryFile(library)
      .then((blob) => {
        saveAs(blob, `${library.name || 'Library'}.mnlglib`);
      });
  },
});

const SaveLibraryContainer = connect(mapStateToProps)(Button);

export default SaveLibraryContainer;
