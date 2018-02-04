import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <svg
    title={props.title}
    height={props.height}
    width={props.width}
    viewBox={props.viewBox}
  >
    <use xlinkHref={`${props.use}`} />
  </svg>
);

Icon.propTypes = {
  title: PropTypes.string,
  use: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox: PropTypes.string,
};

Icon.defaultProps = {
  height: 30,
  width: 30,
};

export default Icon;
