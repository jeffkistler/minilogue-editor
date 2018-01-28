/* eslint-disable no-bitwise */
import * as program from './program';

/**
 * Test program parsing.
 */
test('that the init program title is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.PROGRAM_NAME]).toEqual('Init Program');
});

/**
 * VCO1 parameters
 */

test('that the init program VCO1 octave is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO1_OCTAVE]).toBe(1); // 8'
});

test('that the init program VCO1 wave type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO1_WAVE]).toBe(2); // Saw
});

test('that the init program VCO1 pitch is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO1_PITCH]).toBe(512);
});

test('that the init program VCO1 shape is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO1_SHAPE]).toBe(0);
});

test('that the init program VCO1 level is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO1_LEVEL]).toBe(1023);
});

/**
 * VCO2 parameters
 */

test('that the init program VCO2 octave is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_OCTAVE]).toBe(1); // 8'
});

test('that the init program VCO2 wave type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_WAVE]).toBe(2); // Saw
});

test('that the init program VCO2 pitch is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_PITCH]).toBe(512);
});

test('that the init program VCO2 shape is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_SHAPE]).toBe(0);
});

test('that the init program VCO2 level is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_LEVEL]).toBe(0);
});

/**
 * Cross-Modulation parameters
 */

test('that the init program cross mod depth is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CROSS_MOD_DEPTH]).toBe(0);
});

test('that the init program pitch EG int is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.VCO2_PITCH_EG_INT]).toBe(512);
});

test('that the init program oscillator sync is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.SYNC]).toBe(0);
});

test('that the init program ring mod is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.RING]).toBe(0);
});

/**
 * Noise
 */

test('that the init program noise level is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.NOISE_LEVEL]).toBe(0);
});

/**
 * Filter parameters
 */

test('that the init program filter cutoff is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CUTOFF]).toBe(1023);
});

test('that the init program filter resonance is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.RESONANCE]).toBe(0);
});

test('that the init program filter cutoff EG int is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CUTOFF_EG_INT]).toBe(512);
});

test('that the init program filter type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CUTOFF_TYPE]).toBe(1); // 4-pole
});

test('that the init program filter key tracking is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CUTOFF_KEYBOARD_TRACK]).toBe(0);
});

test('that the init program filter type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.CUTOFF_VELOCITY]).toBe(0);
});

/**
 * Amp EG parameters
 */

test('that the init program amp EG attack is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.AMP_EG_ATTACK]).toBe(0);
});

test('that the init program amp EG decay is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.AMP_EG_DECAY]).toBe(512);
});

test('that the init program amp EG sustain type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.AMP_EG_SUSTAIN]).toBe(1023);
});

test('that the init program amp EG release is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.AMP_EG_RELEASE]).toBe(0);
});

/**
 * EG parameters
 */

test('that the init program EG attack is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.EG_ATTACK]).toBe(0);
});

test('that the init program EG decay is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.EG_DECAY]).toBe(512);
});

test('that the init program EG sustain type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.EG_SUSTAIN]).toBe(0);
});

test('that the init program EG release is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.EG_RELEASE]).toBe(0);
});

/**
 * LFO parameters
 */

test('that the init program LFO wave type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.LFO_WAVE]).toBe(1); // TRI
});

test('that the init program LFO EG mod is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.LFO_EG]).toBe(0); // Off
});

test('that the init program LFO rate is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.LFO_RATE]).toBe(512);
});

test('that the init program LFO int is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.LFO_INT]).toBe(0);
});

test('that the init program EG release is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.LFO_TARGET]).toBe(2); // Pitch
});

/**
 * Delay parameters
 */

test('that the init program delay hi pass cutoff type is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.DELAY_HI_PASS_CUTOFF]).toBe(256);
});

test('that the init program delay time is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.DELAY_TIME]).toBe(1023);
});

test('that the init program delay feedback is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.DELAY_FEEDBACK]).toBe(1023);
});

test('that the init program delay output routing is parsed correctly', () => {
  expect(program.decodeProgram(program.INIT_PATCH)[program.DELAY_OUTPUT_ROUTING]).toBe(0); // Bypass
});

test('that the encoded output is the same as the encoded input when decoding and re-encoding', () => {
  const original = program.INIT_PATCH;
  const encoded = program.encodeProgram(program.decodeProgram(original));
  expect(encoded.length).toEqual(original.length);
  expect(encoded.slice(0, 16)).toEqual(original.slice(0, 16));
  expect(encoded.slice(20, 32)).toEqual(original.slice(20, 32));
  expect(encoded.slice(33, 44)).toEqual(original.slice(33, 44));
  expect(encoded.slice(49, 56)).toEqual(original.slice(49, 56));
  expect(encoded[56] & 0b1111110).toEqual(original[56] & 0b1111110);
  expect(encoded.slice(57, 60)).toEqual(original.slice(57, 60));
  expect(encoded[60] & 0b11000011).toEqual(original[60] & 0b11000011);
  expect(encoded[61]).toEqual(original[61]);
  expect(encoded[62] & 0b00111111).toEqual(original[62] & 0b00111111);
  expect(encoded[64] & 0b00110111).toEqual(original[64] & 0b00110111);
  expect(encoded[66]).toEqual(original[66]);
  expect(encoded[69] & 0b00011111).toEqual(original[69] & 0b00011111);
  expect(encoded.slice(70, 73)).toEqual(original.slice(70, 73));
  expect(encoded.slice(96, 101)).toEqual(original.slice(96, 101));
  expect(encoded.slice(103, 107)).toEqual(original.slice(103, 107));
  expect(encoded.slice(108, 448)).toEqual(original.slice(108, 448));
});

test('that a non-init program is the same as the input when it is decoded and re-encoded', () => {
  const string = 'UFJPR1BvbHlMb2d1ZQAAAAAAAAB4AIUAFH25/wD/ALwAAAAA/wAlHW8oxQD/////AAB9OpGi2zCDMIKBvgDA/MgPzP//9wBcTfn/////////////////////////////U0VRROgDAhAANgMA/////wMxAyABFQAA////////AAA3MzA6Qk5MY8jIyMh5Av//hocAADc8MzBIUE5ayMjIyAIA//mHhwAAPDgzMExORlTIyMjIAAD52YeHAAA4OjMwV1dAQsjIyMgAANm/h4cAADMsODoyNDs7yMjIyAAAv6iHhwAAMyw4PDdGQFDIyMjIAAColYeHAAA3ODMsSGNXQMjIyMgAApWHh4cAADc6MyxIV0BOyMjIyAInh4eHhwAAODopMEBONDbIyMjIJ0WHh9fXAAAwKTg8OzcwQsjIyMhFjIeO19cAADgwKTUvPTo9yMjIyIytjqXX1wAAKTo3MDovOkDIyMjIrdalvNfXAAArMjc6MywvQMjIyMjW+rzV19cAADM4KzwtLDQ6yMjIyPr/1fnX1wAALUA4Ox4zIjTIyMjI/9H5/9fXAAA2Lz0yKjMuMsjIyMjRef//19cAAA==';
  const original = new Uint8Array(
    window.atob(string).split('').map(c => c.charCodeAt(0)),
  );
  const decoded = program.decodeProgram(original);
  const encoded = program.encodeProgram(decoded);
  expect(encoded.length).toEqual(original.length);
  expect(encoded.slice(0, 16)).toEqual(original.slice(0, 16));
  expect(encoded.slice(20, 32)).toEqual(original.slice(20, 32));
  expect(encoded.slice(33, 44)).toEqual(original.slice(33, 44));
  expect(encoded.slice(49, 56)).toEqual(original.slice(49, 56));
  expect(encoded[56] & 0b1111110).toEqual(original[56] & 0b1111110);
  expect(encoded.slice(57, 60)).toEqual(original.slice(57, 60));
  expect(encoded[60] & 0b11000011).toEqual(original[60] & 0b11000011);
  expect(encoded[61]).toEqual(original[61]);
  expect(encoded[62] & 0b00111111).toEqual(original[62] & 0b00111111);
  expect(encoded[64] & 0b00110111).toEqual(original[64] & 0b00110111);
  expect(encoded[66]).toEqual(original[66]);
  expect(encoded[69] & 0b00011111).toEqual(original[69] & 0b00011111);
  expect(encoded.slice(70, 73)).toEqual(original.slice(70, 73));
  expect(encoded.slice(96, 101)).toEqual(original.slice(96, 101));
  expect(encoded.slice(103, 107)).toEqual(original.slice(103, 107));
  expect(encoded.slice(108, 112)).toEqual(original.slice(108, 112));
  expect(encoded.slice(120, 448)).toEqual(original.slice(120, 448));
});
