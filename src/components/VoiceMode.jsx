import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';
import { VOICE_MODE } from '../minilogue/program';
import { DISPLAY_OPTIONS } from '../minilogue/display';
import polyIcon from '../assets/poly.svg';
import duoIcon from '../assets/duo.svg';
import unisonIcon from '../assets/unison.svg';
import monoIcon from '../assets/mono.svg';
import chordIcon from '../assets/chord.svg';
import arpIcon from '../assets/arp.svg';
import delayIcon from '../assets/delay.svg';
import sidechainIcon from '../assets/sidechain.svg';

const ICONS = [
  polyIcon,
  duoIcon,
  unisonIcon,
  monoIcon,
  chordIcon,
  arpIcon,
  delayIcon,
  sidechainIcon,
];
const VOICE_MODE_CHOICES = Object.values(DISPLAY_OPTIONS[VOICE_MODE].choices);

const VoiceMode = ({ value, onChange }) => (
  <div id="voice-mode-container">
    <ul className="button-group">
      {VOICE_MODE_CHOICES.map((label, choiceValue) => (
        <li key={`${choiceValue}-button`}>
          <a className="button"
            onClick={() => onChange(choiceValue)}
          />
          <p className="label">{label}</p>
          <div className="voice-mode-light">
          <div className={choiceValue === value ? 'voice-mode-light led-array-light led-array-light-active' : 'voice-mode-light led-array-light'}
            onClick={() => onChange(choiceValue)}></div>
            </div>
          <p className="voice-mode-icon">
            <Icon
              use={ICONS[choiceValue].url}
              viewBox={ICONS[choiceValue].viewBox}
              height={20}
              width={20}
            />
          </p>
        </li>
      ))}
    </ul>
    <p className="control-label label voice-mode-label">Voice Mode</p>
  </div>
);

VoiceMode.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

VoiceMode.defaultProps = {
};

export default VoiceMode;
