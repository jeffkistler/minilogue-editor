/**
 * A multi-valued toggle switch component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

export default class Switch extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    numPositions: PropTypes.number.isRequired,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    vertical: true,
    onChange: () => {},
  };

  state = {
    value: this.props.value,
  }

  updateValueElement = () => {
    // Calculate the top offset
    const { height: rangeHeight, width: rangeWidth } = this.rangeEl.getBoundingClientRect();
    const { height: valueHeight, width: valueWidth } = this.valueEl.getBoundingClientRect();
    const rangeSize = this.props.vertical ? rangeHeight : rangeWidth;
    const valueSize = this.props.vertical ? valueHeight : valueWidth;
    const stepSize = (rangeSize - valueSize) / (this.props.numPositions - 1);
    const offset = this.state.value * stepSize;
    const styleProperty = this.props.vertical ? 'bottom' : 'left';
    this.valueEl.style[styleProperty] = `${offset}px`;
  }

  componentDidMount = () => this.updateValueElement();
  componentDidUpdate = () => this.updateValueElement();

  componentWillReceiveProps = (nextProps) => {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onMouseDown = (event) => {
    this.onMouseMove(event);
    event.preventDefault();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  handleMousePosition = (event) => {
    const { clientX, clientY } = event;
    this.setState((prevState, props) => {
      const {
        height, width, bottom, left,
      } = this.rangeEl.getBoundingClientRect();
      const size = props.vertical ? height : width;
      const positionSize = size / props.numPositions;
      const relativePosition = props.vertical ? bottom - clientY : clientX - left;
      const positionIndex = Math.max(
        0,
        Math.min(
          Math.floor(relativePosition / positionSize),
          props.numPositions - 1,
        ),
      );

      props.onChange(positionIndex);
      return {
        value: positionIndex,
      };
    });
  }

  onMouseMove = event => this.handleMousePosition(event);

  onRangeClick = (event) => {
    event.preventDefault();
    this.handleMousePosition(event);
  }

  onWheel = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    this.setState((prevState, props) => {
      const { height, width } = this.rangeEl.getBoundingClientRect();
      const size = props.vertical ? height : width;
      const positionSize = size / (props.numPositions - 1);
      const delta = Math.round(-deltaY / positionSize);
      const clamped = Math.max(
        0,
        Math.min(prevState.value + delta, props.numPositions - 1),
      );
      props.onChange(clamped);
      return {
        value: clamped,
      };
    });
  }

  render() {
    return (
    <div
      className={`switch-range ${this.props.vertical ? 'switch-range-vertical' : 'switch-range-horizontal'}`}
      ref={(rangeEl) => { this.rangeEl = rangeEl; }}
      onClick={this.onRangeClick}
      onWheel={this.onWheel}
    >
      <div
        className="switch-value"
        ref={(valueEl) => { this.valueEl = valueEl; }}
        onMouseDown={this.onMouseDown}
      />
    </div>
    );
  }
}
