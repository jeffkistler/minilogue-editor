/**
 * A rotary knob component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Knob.css';

const mapToRange = (value, inLow, inHigh, outLow, outHigh) => {
  const fromRange = inHigh - inLow;
  const toRange = outHigh - outLow;
  const scale = (value - inLow) / fromRange;
  return Math.round((toRange * scale) + outLow);
};

const coerceToStep = (value, low, high, step) => {
  const adjusted = value - low;
  const nearestStep = Math.round(adjusted / step) * step;
  return Math.max(low, Math.min(high, low + nearestStep));
};

// angle arc - the number of degrees of travel [0, 360]
// angle offset - the start point for the value [-180, 180]
// minValue - 0 - the minimum for the value represented by this component
// maxValue - 1023 - the maximum  for the value represented by this component
// step - 1 - the amount to
export default class Knob extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    angleOffset: PropTypes.number,
    arc: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    min: 0,
    max: 1023,
    angleOffset: -135,
    arc: 270,
    step: 1,
  };

  state = {
    value: this.props.value,
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onMouseDown = (event) => {
    // Update the value location to where the click occurred
    this.onMouseMove(event);
    // Connect the mouse events to the component
    event.preventDefault();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event) => {
    // Store mouse pointer location
    const { clientX, clientY } = event;

    this.setState((prevState, props) => {
      // Find the center of rotation
      const boundingBox = this.knobElement.getBoundingClientRect();
      const center = [
        boundingBox.left + (boundingBox.width / 2),
        boundingBox.top + (boundingBox.height / 2),
      ];
      // Find where the mouse pointer is in relation to the center of rotation
      const dX = clientX - center[0];
      const dY = clientY - center[1];
      // Compute the angle in degrees
      let angle = Math.atan2(dY, dX) * (180 / Math.PI);
      // Transform the angle to have 0 at 12 o'clock
      if (dX <= 0 && dY >= 0) {
        angle -= 270;
      } else {
        angle += 90;
      }
      const minAngle = props.angleOffset;
      const maxAngle = props.angleOffset + props.arc;
      const clamped = Math.max(minAngle, Math.min(maxAngle, angle));
      const mapped = mapToRange(clamped, minAngle, maxAngle, props.min, props.max);
      const newValue = coerceToStep(mapped, props.min, props.max, props.step);
      if ((newValue !== prevState.value) && props.onChange) {
        props.onChange(newValue);
      }
      return {
        value: newValue,
      };
    });
  }

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onWheel = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    this.setState((prevState, props) => {
      let delta = props.step;
      delta = (deltaY >= 0) ? -delta : delta;
      const newValue = Math.max(
        props.min,
        Math.min(prevState.value + delta, props.max),
      );
      if ((newValue !== prevState.value) && props.onChange) {
        props.onChange(newValue);
      }
      return { value: newValue };
    });
  }

  render() {
    const {
      min, max, angleOffset, arc,
    } = this.props;
    const angle = mapToRange(
      this.state.value,
      min,
      max,
      angleOffset,
      angleOffset + arc,
    );
    const style = {
      transform: `rotate(${angle}deg)`,
    };
    return (
      <div
        className="knob-container"
        onMouseDown={this.onMouseDown}
        onWheel={this.onWheel}
      >
        <div
          className="knob-value"
          ref={(el) => { this.knobElement = el; }}
          style={style}
        >
          <div
            className="knob-value-inner"
          />
        </div>
      </div>
    );
  }
}
