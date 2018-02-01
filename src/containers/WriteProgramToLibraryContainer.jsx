import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { writePanelToCurrentLibraryPosition } from '../actions/library';

const Button = ({ onClick }) => (
  <a onClick={onClick} className="button"></a>
);

Button.propTypes = {
  onClick: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(writePanelToCurrentLibraryPosition()),
});

const WriteProgramToLibraryContainer = connect(undefined, mapDispatchToProps)(Button);

export default WriteProgramToLibraryContainer;
