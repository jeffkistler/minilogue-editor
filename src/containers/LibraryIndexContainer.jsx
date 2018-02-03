import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PROGRAM_NAME } from '../minilogue/program';


const LibraryIndexDisplay = ({ index, name }) => (
    <div className="display-contents">
      <div>{`000${index}`.slice(-3)}</div>
      <div>{name}</div>
    </div>
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
