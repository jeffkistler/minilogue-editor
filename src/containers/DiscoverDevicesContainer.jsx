import { connect } from 'react-redux';
import Button from '../components/Button.jsx';
import { discoverMinilogueDevices } from '../actions/discovery';


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => (
  {
    onClick: () => dispatch(discoverMinilogueDevices()),
  }
);

const DiscoverDevicesContainer = connect(mapStateToProps, mapDispatchToProps)(Button);

export default DiscoverDevicesContainer;
