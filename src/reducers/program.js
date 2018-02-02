/**
 * Current program state updates.
 */
import base32Decode from 'base32-decode';
import pako from 'pako';
import { LOCATION_CHANGE } from 'react-router-redux';
import { PARAMETER_SET, CURRENT_PROGRAM_SET } from '../actions/program';
import { INIT_PROGRAM, decodeProgram } from '../minilogue/program';
import {
  isMinilogueSysexMessage,
  isCurrentProgramDataDump,
  isProgramDataDump,
  isProgramData,
  decodeSysexData,
} from '../minilogue/sysex';


const loadFromSearch = ({ search }) => {
  const parsed = new URLSearchParams(search);
  let decodedProgram;
  if (parsed.has('sysex')) {
    const raw = parsed.get('sysex');
    let data = new Uint8Array(base32Decode(raw, 'Crockford'));
    try {
      data = pako.inflate(data);
    } catch (err) {
      // Maybe we have raw sysex data, so do nothing
    }
    let sysexData;
    if (isMinilogueSysexMessage(data)) {
      if (isCurrentProgramDataDump(data)) {
        sysexData = data.slice(7, -1);
      } else if (isProgramDataDump(data)) {
        sysexData = data.slice(9, -1);
      }
    } else if (isProgramData(data)) {
      sysexData = data;
    }
    if (sysexData) {
      const decodedData = decodeSysexData(sysexData);
      decodedProgram = decodeProgram(decodedData);
    }
  }
  return decodedProgram;
};

export default function programReducer(program = INIT_PROGRAM, action) {
  switch (action.type) {
    case PARAMETER_SET: {
      const { parameter, value } = action.payload;
      const updated = { ...program };
      updated[parameter] = value;
      return updated;
    }
    case CURRENT_PROGRAM_SET: {
      return action.payload;
    }
    case LOCATION_CHANGE: {
      const loaded = loadFromSearch(action.payload);
      return loaded || program;
    }
    default:
      return program;
  }
}
