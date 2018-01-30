import React from 'react';
import PropTypes from 'prop-types';
import * as programLib from '../minilogue/program';
import ParameterKnob from './ParameterKnob.jsx';
import ParameterSwitch from './ParameterSwitch.jsx';
import SliderAssignContainer from '../containers/SliderAssignContainer.jsx';


const ExtraParameters = ({ parameters }) => (
  <div id="extra-parameters" className="panel-group">
    <h2 className="label">Additional Parameters</h2>
    <ParameterKnob
      parameters={parameters}
      parameter={programLib.BEND_RANGE_NEGATIVE}
      min={1}
      max={12}
    />
    <ParameterKnob
      parameters={parameters}
      parameter={programLib.BEND_RANGE_POSITIVE}
      min={1}
      max={12}
    />
    <ParameterKnob
      parameters={parameters}
      parameter={programLib.PROGRAM_LEVEL}
      min={77}
      max={127}
    />
    <ParameterKnob
      parameters={parameters}
      parameter={programLib.AMP_VELOCITY}
      min={0}
      max={127}
    />
    <ParameterKnob
      parameters={parameters}
      parameter={programLib.PORTAMENTO_TIME}
      min={0}
      max={127}
    />
    <ParameterSwitch parameters={parameters} parameter={programLib.PORTAMENTO_MODE} />
    <ParameterSwitch parameters={parameters} parameter={programLib.PORTAMENTO_BPM} />
    <ParameterSwitch parameters={parameters} parameter={programLib.LFO_BPM_SYNC} />
    <ParameterSwitch parameters={parameters} parameter={programLib.LFO_KEY_SYNC} />
    <ParameterSwitch parameters={parameters} parameter={programLib.LFO_VOICE_SYNC} />
    <SliderAssignContainer parameters={parameters} />
  </div>
);

ExtraParameters.propTypes = {
  parameters: PropTypes.object,
  parameter: PropTypes.number,
};

export default ExtraParameters;
