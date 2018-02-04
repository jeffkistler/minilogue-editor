import React from 'react';
import PropTypes from 'prop-types';
import LibraryIndexContainer from '../containers/LibraryIndexContainer.jsx';

export default class Display extends React.Component {
  static propTypes = {
    parameter: PropTypes.string,
    value: PropTypes.any,
    timeout: PropTypes.number,
  }

  static defaultProps = {
    timeout: 1500,
  }

  state = {
    displayParam: false,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState((prevState) => {
      clearInterval(prevState.intervalId);
      if (nextProps.parameter) {
        const intervalId = setInterval(
          () => this.setState({ displayParam: false }), nextProps.timeout,
        );
        return { displayParam: true, intervalId };
      }
      return { displayParam: false, inveralId: undefined };
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      this.state.displayParam && this.props.parameter
        ? (<p className="display-contents">{this.props.value}</p>)
        : (<LibraryIndexContainer />)
    );
  }
}
