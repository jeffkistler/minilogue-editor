import React from 'react';
import PropTypes from 'prop-types';
import KnobContainer from '../containers/KnobContainer.jsx';
import { getParameterPanelLabel, getParameterDisplayValue } from '../minilogue/display';


/**
 * A helper to add the correct display structure around a knob container component.
 */
const PanelKnob = ({
  parameters, parameter, classNames, ...props
}) => (
    <div
      className={(classNames ? [...classNames, 'control-group'] : ['control-group']).join(' ')}
      title={getParameterDisplayValue(parameters, parameter)}
    >
      <div className="control-wrapper">
        <KnobContainer parameter={parameter} {...props} />
      </div>
      <p className="control-label label">{getParameterPanelLabel(parameter)}</p>
    </div>
);

PanelKnob.propTypes = {
  parameters: PropTypes.object,
  parameter: PropTypes.number,
  classNames: PropTypes.array,
};

export default PanelKnob;
