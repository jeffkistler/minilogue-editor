/**
 * Minilogue sysex data utilities.
 */
/* eslint-disable no-bitwise,no-plusplus */
const HIGH_BIT_MASK = 0b10000000;
const LOW_BITS_MASK = 0b01111111;

/**
 * Decode the 7-bit MIDI sysex data into an 8-bit data array.
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
export const decodeSysexData = (data) => {
  const inputLength = data.length;
  const outputLength = Math.ceil(inputLength * (7 / 8));
  const output = new Uint8Array(outputLength);
  for (let i = 0, outputIndex = 0; i < inputLength; i += 8) {
    const header = data[i];
    for (let j = 1; j < 8; j++, outputIndex++) {
      const currentByte = data[i + j];
      const highBit = (header << (8 - j)) & HIGH_BIT_MASK;
      output[outputIndex] = highBit ^ currentByte;
    }
  }
  return output;
};

/**
 * Encode the 8-bit data array using the 7-bit MIDI sysex convention.
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
export const encodeSysexData = (data) => {
  const inputLength = data.length;
  const outputLength = Math.ceil(inputLength * (8 / 7));
  const output = new Uint8Array(outputLength);
  for (let i = 0, headIndex = 0; i < inputLength; headIndex += 8) {
    output[headIndex] = 0;
    for (let j = 0; j < 7 && i < inputLength; j++, i++) {
      const currentByte = data[i];
      output[headIndex] |= (currentByte & HIGH_BIT_MASK) >>> (7 - j);
      output[headIndex + j + 1] = currentByte & LOW_BITS_MASK;
    }
  }
  return output;
};

export const buildMessage = (channel, type, data) => {
  let message = [0xf0, 0x42, 0x30 | channel, 0x00, 0x01, 0x2c, type];
  if (typeof data !== 'undefined') {
    message = [...message, ...Array.from(data)];
  }
  return [...message, 0xf7];
};
export const CURRENT_PROGRAM_DATA_DUMP = 0x40; // Set the current program
export const CURRENT_PROGRAM_DATA_DUMP_REQUEST = 0x10; // Ask for the current program


export const isMinilogueSysexMessage = data => (
  (data[0] === 0xf0) &&
  (data[1] === 0x42) &&
  (data[3] === 0x00) &&
  (data[4] === 0x01) &&
  (data[5] === 0x2c)
);
export const isCurrentProgramDataDump = data => (data[6] === 0x40);
export const isProgramDataDump = data => (data[6] === 0x4c);
export const isSearchDeviceReply = data => (
  (data[0] === 0xf0) &&
  (data[1] === 0x42) &&
  (data[2] === 0x50) &&
  (data[3] === 0x01) &&
  (data[6] === 0x2c)
);

export const isProgramData = data => (
  (data.length === 512) &&
  (data[0] === 0) &&
  (data[1] === 80) &&
  (data[2] === 82) &&
  (data[3] === 79) &&
  (data[4] === 71)
);
