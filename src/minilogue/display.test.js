import * as types from './program';
import { getParameterDisplayValue } from './display';

describe('display', () => {
  const makeTest = (name, parameter, input, expected) => {
    const program = {};
    program[parameter] = input;
    return test(name, () => expect(getParameterDisplayValue(program, parameter)).toEqual(expected));
  };
  makeTest('lfotarget', types.LFO_TARGET, 0, 'Cutoff');
  makeTest('lfotarget', types.LFO_TARGET, 1, 'Shape');
  makeTest('lfotarget', types.LFO_TARGET, 2, 'Pitch');
  makeTest('', types.VCO2_PITCH_EG_INT, 0, '-4800 Cents');
  makeTest('', types.VCO2_PITCH_EG_INT, 1023, '1200 Cents');

  test('', () => {
    const program = {};
    program[types.PROGRAM_NAME] = 'Test';
    expect(getParameterDisplayValue(program, types.PROGRAM_NAME)).toEqual('Test');
  });
  test('', () => {
    const program = {};
    program[types.CUTOFF_KEYBOARD_TRACK] = 1;
    expect(getParameterDisplayValue(program, types.CUTOFF_KEYBOARD_TRACK)).toEqual('50 %');
  });
  test('', () => {
    const program = {};
    program[types.CUTOFF_EG_INT] = 492;
    expect(getParameterDisplayValue(program, types.CUTOFF_EG_INT)).toEqual('0 %');
  });
  test('', () => {
    const program = {};
    program[types.CUTOFF_EG_INT] = 1020;
    expect(getParameterDisplayValue(program, types.CUTOFF_EG_INT)).toEqual('100 %');
  });

  test('', () => {
    const program = {};
    program[types.VOICE_MODE] = 6; // Arp
    program[types.VOICE_MODE_DEPTH] = 78; // Manual 1
    expect(getParameterDisplayValue(program, types.VOICE_MODE_DEPTH)).toEqual('Manual 1');
  });
  test('', () => {
    const program = {};
    program[types.VOICE_MODE] = 6; // Arp
    program[types.VOICE_MODE_DEPTH] = 700; // Poly 1
    expect(getParameterDisplayValue(program, types.VOICE_MODE_DEPTH)).toEqual('Poly 1');
  });
  test('', () => {
    const program = {};
    program[types.VOICE_MODE] = 5; // Delay
    program[types.VOICE_MODE_DEPTH] = 700; // 1/8
    expect(getParameterDisplayValue(program, types.VOICE_MODE_DEPTH)).toEqual('1/8');
  });
});
