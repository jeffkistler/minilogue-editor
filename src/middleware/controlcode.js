/**
 * Translate MIDI Control Change messages to current program update actions.
 */
/* eslint-disable no-bitwise */
import { MIDI_MESSAGE_RECEIVED } from '../actions/midi';
import { setParameter } from '../actions/program';
import { CODE_TO_PARAMETER, messageToParameter } from '../minilogue/midi';

const has = Object.prototype.hasOwnProperty;

const controlCodeMiddleware = ({ dispatch, getState }) => next => (action) => {
  next(action);
  const { configuration } = getState();
  if (
    (action.type === MIDI_MESSAGE_RECEIVED) && (configuration.midiReceive)
  ) {
    const { data, target } = action.payload;
    const [status, code, value] = data;
    const messageType = status >>> 4;
    const channel = status & 0b00001111;
    if (
      (messageType === 0xB) &&
      (target === configuration.midiInput) &&
      (channel === configuration.midiInputChannel)
    ) {
      // Translate the message to a parameter change if we understand it
      if (has.call(CODE_TO_PARAMETER, code)) {
        const [parameter, translated] = messageToParameter(code, value);
        dispatch(setParameter(parameter, translated));
      }
    }
  }
};

export default controlCodeMiddleware;
