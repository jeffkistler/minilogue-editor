import { connect } from 'react-redux';
import Panel from '../components/Panel.jsx';

const mapStateToProps = state => ({
  parameters: state.currentProgram,
});

const PanelContainer = connect(mapStateToProps)(Panel);

export default PanelContainer;
