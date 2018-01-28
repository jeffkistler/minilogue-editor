/**
 * A checkbox input component.
 */

import React from 'react';
import PropTypes from 'prop-types';


export default class Checkbox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    value: false,
  };

  state = {
    value: this.props.value,
  };

  handleChange = (event) => {
    this.props.onChange(event.target.checked);
    this.setState({ value: event.target.checked });
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
