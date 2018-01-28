/**
 * Translate MIDI sysex messages to current program update actions.
 */
import { MIDI_MESSAGE_RECEIVED } from '../actions/midi';
import { setCurrentProgram } from '../actions/program';
import {
  isMinilogueSysexMessage,
  isCurrentProgramDataDump,
  isProgramDataDump,
  decodeSysexData,
} from '../minilogue/sysex';
import { decodeProgram } from '../minilogue/program';

const programMiddleware = ({ dispatch }) => next => (action) => {
  next(action);
  if (action.type !== MIDI_MESSAGE_RECEIVED) return;

  const { data } = action.payload;

  if (!isMinilogueSysexMessage(data)) return;

  let sysexData;
  if (isCurrentProgramDataDump(data)) {
    sysexData = data.slice(7, -1);
  } else if (isProgramDataDump(data)) {
    sysexData = data.slice(9, -1);
  }

  if (sysexData) {
    const decodedData = decodeSysexData(sysexData);
    const parsedProgram = decodeProgram(decodedData);
    dispatch(setCurrentProgram(parsedProgram));
  }
};

export default programMiddleware;
