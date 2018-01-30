import { connect } from 'react-redux';
import Select from 'react-select';
import React from 'react';
import PropTypes from 'prop-types';
import { setParameter } from '../actions/program';
import { DISPLAY_OPTIONS, getParameterDisplayValue } from '../minilogue/display';
import { SLIDER_ASSIGN } from '../minilogue/program';


const SliderAssign = ({ parameters, ...props }) => (
  <div
    className="control-group select-control"
    title={getParameterDisplayValue(parameters, SLIDER_ASSIGN)}
  >
    <div className="control-wrapper">
        <Select clearable={false} {...props} />
    </div>
    <p className="control-label label">
    Slider Assign
    </p>
  </div>
);

SliderAssign.propTypes = {
  parameters: PropTypes.object,
};

const mapStateToProps = state => (
  {
    value: state.currentProgram[SLIDER_ASSIGN],
    options: Object.entries(DISPLAY_OPTIONS[SLIDER_ASSIGN].choices).map(([value, label]) => ({
      value: parseInt(value, 10),
      label,
    })),
  }
);

const mapDispatchToProps = dispatch => ({
  onChange: ({ value }) => dispatch(setParameter(SLIDER_ASSIGN, value)),
});

const SliderAssignContainer = connect(mapStateToProps, mapDispatchToProps)(SliderAssign);

export default SliderAssignContainer;
