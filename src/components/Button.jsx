import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  disabled, onClick, title, children,
}) => (
  <a
    className="menu-button"
    disabled={disabled}
    onClick={onClick}
    title={title}
  >{children}</a>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  disabled: false,
  title: '',
};

export default Button;
