import React from 'react';
import PropTypes from 'prop-types';
import SwitchContainer from '../containers/SwitchContainer.jsx';
import {
  getParameterDisplayValue,
  getParameterPanelLabel,
  DISPLAY_OPTIONS,
} from '../minilogue/display';


/**
 * A helper to add the correct display structure around a switch container component.
 */
const ParameterSwitch = (props) => {
  const {
    parameters, parameter, classNames, showLabels, ...rest
  } = props;
  return (
    <div
      className={(classNames ? [...classNames, 'control-group'] : ['control-group']).join(' ')}
      title={getParameterDisplayValue(parameters, parameter)}
    >
      <div className="control-wrapper">
        <SwitchContainer
          parameter={parameter}
          numPositions={Object.keys(DISPLAY_OPTIONS[parameter].choices).length}
          {...rest}
        />
        {showLabels && props.labels && (
        <div className="switch-label-wrapper">
          <ul className="switch-labels">
          {props.labels.map((label, labelIndex) => (
            <li key={`label-${labelIndex}`}className="switch-label">{label}</li>
          ))}
          </ul>
        </div>
        )}
        {showLabels && !props.labels && (
        <div className="switch-label-wrapper">
          <ul className="switch-labels">
            {Object.entries(DISPLAY_OPTIONS[parameter].choices).reverse().map(([key, value]) => (
              <li key={key} className="switch-label">{value}</li>
            ))}
          </ul>
        </div>
        )}
      </div>
      <p className="control-label label">
        {getParameterPanelLabel(parameter)}
      </p>
    </div>
  );
};

ParameterSwitch.propTypes = {
  parameters: PropTypes.object,
  parameter: PropTypes.number,
  classNames: PropTypes.arrayOf(PropTypes.string),
  showLabels: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.node),
};

ParameterSwitch.defaultProps = {
  showLabels: false,
};

export default ParameterSwitch;
