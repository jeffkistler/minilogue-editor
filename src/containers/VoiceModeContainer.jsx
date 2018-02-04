import { connect } from 'react-redux';
import { setPanelParameter } from '../actions/program';

import VoiceMode from '../components/VoiceMode.jsx';


const mapStateToProps = (state, ownProps) => ({
  value: state.currentProgram[ownProps.parameter],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: value => dispatch(setPanelParameter(ownProps.parameter, value)),
});

const VoiceModeContainer = connect(mapStateToProps, mapDispatchToProps)(VoiceMode);

export default VoiceModeContainer;
