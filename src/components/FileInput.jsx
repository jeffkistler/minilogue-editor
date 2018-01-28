/**
 * A styleable file input component.
 */
import React from 'react';
import PropTypes from 'prop-types';


class FileInput extends React.Component {
  static propTypes = {
    classNames: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  render() {
    return ([
      <a
        onClick={() => this.fileInput.click()}
        key="clickable-input"
        className={this.props.classNames ? this.props.classNames.join(' ') : null}
        title={this.props.title}
      >
        {this.props.children}
      </a>,
      <input
        type="file"
        style={{ display: 'none' }}
        ref={(el) => { this.fileInput = el; }}
        onChange={this.props.onChange}
        key="hidden-file-input"
      />,
    ]);
  }
}

export default FileInput;
