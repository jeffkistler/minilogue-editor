/**
 * The application configuration section component.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import 'react-select/dist/react-select.css';

import Icon from './Icon.jsx';
import ActionMenu from './ActionMenu.jsx';
import MIDIOutputContainer from '../containers/MIDIOutputContainer.jsx';
import MIDIOutputChannelContainer from '../containers/MIDIOutputChannelContainer.jsx';
import MIDISendContainer from '../containers/MIDISendContainer.jsx';
import MIDIInputContainer from '../containers/MIDIInputContainer.jsx';
import MIDIInputChannelContainer from '../containers/MIDIInputChannelContainer.jsx';
import MIDIReceiveContainer from '../containers/MIDIReceiveContainer.jsx';
import DiscoverDevicesContainer from '../containers/DiscoverDevicesContainer.jsx';
import './Configuration.css';
import searchIcon from '../assets/search.svg';

/**
 * The main configuration section layout.
 */
const Configuration = () => (
  <div className="section-wrapper">
    <Helmet>
      <title>Configuration</title>
    </Helmet>
    <ActionMenu>
      <DiscoverDevicesContainer title="Discover Minilogue Devices">
        <Icon
          use={searchIcon.id}
          viewBox={searchIcon.viewBox}
          title="Discover Minilogue Devices"
        />
      </DiscoverDevicesContainer>
    </ActionMenu>
    <div className="configuration">
      <fieldset>
        <legend>MIDI Output</legend>
        <label htmlFor="out">
          Port
          <MIDIOutputContainer name="out" />
        </label>
        <label htmlFor="outChannel">
          Channel
          <MIDIOutputChannelContainer name="outChannel" />
        </label>
        <label htmlFor="sendControlCodes">
          Send control changes
          <MIDISendContainer />
        </label>
      </fieldset>
      <fieldset>
        <legend>MIDI Input</legend>
        <label htmlFor="in">
          Port
          <MIDIInputContainer name="in" />
        </label>
        <label htmlFor="inChannel">
          Channel
          <MIDIInputChannelContainer name="inChannel" />
        </label>
        <label htmlFor="receiveControlCodes">
          Receive control changes
          <MIDIReceiveContainer />
        </label>
      </fieldset>
    </div>
  </div>
);

export default Configuration;
