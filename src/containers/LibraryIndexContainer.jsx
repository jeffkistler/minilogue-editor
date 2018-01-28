import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PROGRAM_NAME } from '../minilogue/program';


const LibraryIndexDisplay = ({ index, name }) => (
    <p className="library-index">{`000${index}`.slice(-3)}<br />{name}</p>
);

LibraryIndexDisplay.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
};

const mapStateToProps = ({ library }) => (
  {
    index: library.currentProgram + 1,
    name: library.library.programs[library.currentProgram][PROGRAM_NAME],
  }
);

const LibraryIndexContainer = connect(mapStateToProps)(LibraryIndexDisplay);

export default LibraryIndexContainer;
