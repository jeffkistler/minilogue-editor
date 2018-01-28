/**
 * An application section actions menu component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ActionMenu.css';

const ActionMenu = props => (
  (<ul className="action-menu">
    {React.Children.map(props.children, child => (<li>{child}</li>))}
  </ul>)
);

ActionMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ActionMenu;
