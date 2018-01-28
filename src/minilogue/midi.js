/**
 *
 */
import * as types from './program';

const has = Object.prototype.hasOwnProperty;

const mapToRange = (value, inLow, inHigh, outLow, outHigh) => {
  const fromRange = inHigh - inLow;
  const toRange = outHigh - outLow;
  const scalar = (value - inLow) / fromRange;
  return (toRange * scalar) + outLow;
};

const rangeToChoice = (value, ranges) => {
  // inclusive
  const found = ranges.find(({ min, max }) => (value >= min) && (value <= max));
  return found.value;
};

const twoChoiceToMIDIValue = choice => ({ 0: 0, 1: 127 })[choice];


const threeChoiceToMIDIValue = choice => ({ 0: 0, 1: 64, 2: 127 })[choice];

const fourChoiceToMIDIValue = choice => (
  {
    0: 0,
    1: 42,
    2: 84,
    3: 127,
  }
)[choice];

const toTwoChoice = value => (
  // 0~63,64~127
  rangeToChoice(
    value,
    [
      { min: 0, max: 63, value: 0 },
      { min: 64, max: 127, value: 1 },
    ],
  )
);

const toThreeChoice = value => (
  // 0~42,43~85,86~127
  rangeToChoice(
    value,
    [
      { min: 0, max: 42, value: 0 },
      { min: 43, max: 85, value: 1 },
      { min: 86, max: 127, value: 2 },
    ],
  )
);

const toFourChoice = value => (
  rangeToChoice(
    value,
    [
      // 0~31,32~63,64~95,96~127
      { min: 0, max: 31, value: 0 },
      { min: 32, max: 63, value: 1 },
      { min: 64, max: 95, value: 2 },
      { min: 96, max: 127, value: 3 },
    ],
  )
);

const CODE_TO_PARAMETER = {
  33: types.NOISE_LEVEL,
  34: types.VCO1_PITCH,
  35: types.VCO2_PITCH,
  36: types.VCO1_SHAPE,
  37: types.VCO2_SHAPE,
  39: types.VCO1_LEVEL,
  40: types.VCO2_LEVEL,
  41: types.CROSS_MOD_DEPTH,
  42: types.VCO2_PITCH_EG_INT,
  43: types.CUTOFF,
  44: types.RESONANCE,
  45: types.CUTOFF_EG_INT,
  16: types.AMP_EG_ATTACK,
  17: types.AMP_EG_DECAY,
  18: types.AMP_EG_SUSTAIN,
  19: types.AMP_EG_RELEASE,
  20: types.EG_ATTACK,
  21: types.EG_DECAY,
  22: types.EG_SUSTAIN,
  23: types.EG_RELEASE,
  24: types.LFO_RATE,
  26: types.LFO_INT,
  27: types.VOICE_MODE_DEPTH,
  29: types.DELAY_HI_PASS_CUTOFF,
  30: types.DELAY_TIME,
  31: types.DELAY_FEEDBACK,
  48: types.VCO1_OCTAVE,
  49: types.VCO2_OCTAVE,
  50: types.VCO1_WAVE,
  51: types.VCO2_WAVE,
  80: types.SYNC,
  81: types.RING,
  82: types.CUTOFF_VELOCITY,
  83: types.CUTOFF_KEYBOARD_TRACK,
  84: types.CUTOFF_TYPE,
  88: types.DELAY_OUTPUT_ROUTING,
  56: types.LFO_TARGET,
  57: types.LFO_EG,
  58: types.LFO_WAVE,
};

const PARAMETER_TO_CODE = Object.keys(CODE_TO_PARAMETER).reduce(
  (obj, key) => {
    obj[CODE_TO_PARAMETER[key]] = parseInt(key, 10); // eslint-disable-line no-param-reassign
    return obj;
  },
  {},
);

const TWO_CHOICE_CONVERSIONS = {
  to: toTwoChoice,
  from: twoChoiceToMIDIValue,
};
const THREE_CHOICE_CONVERSIONS = {
  to: toThreeChoice,
  from: threeChoiceToMIDIValue,
};
const FOUR_CHOICE_CONVERSIONS = {
  to: toFourChoice,
  from: fourChoiceToMIDIValue,
};

const CODE_TO_CONVERSIONS = {
  48: FOUR_CHOICE_CONVERSIONS,
  49: FOUR_CHOICE_CONVERSIONS,
  50: THREE_CHOICE_CONVERSIONS,
  51: THREE_CHOICE_CONVERSIONS,
  56: THREE_CHOICE_CONVERSIONS,
  57: THREE_CHOICE_CONVERSIONS,
  58: THREE_CHOICE_CONVERSIONS,
  64: FOUR_CHOICE_CONVERSIONS,
  65: FOUR_CHOICE_CONVERSIONS,
  66: THREE_CHOICE_CONVERSIONS,
  67: THREE_CHOICE_CONVERSIONS,
  80: TWO_CHOICE_CONVERSIONS,
  81: TWO_CHOICE_CONVERSIONS,
  82: THREE_CHOICE_CONVERSIONS,
  83: THREE_CHOICE_CONVERSIONS,
  84: TWO_CHOICE_CONVERSIONS,
  88: THREE_CHOICE_CONVERSIONS,
  90: THREE_CHOICE_CONVERSIONS,
  91: THREE_CHOICE_CONVERSIONS,
  92: THREE_CHOICE_CONVERSIONS,
};

const parameterToMessage = (parameter, value) => {
  const code = PARAMETER_TO_CODE[parameter];
  let messageValue;
  if (has.call(CODE_TO_CONVERSIONS, code)) {
    messageValue = CODE_TO_CONVERSIONS[code].from(value);
  } else {
    messageValue = Math.round(mapToRange(value, 0, 1023, 0, 127));
  }
  return [code, messageValue];
};

const messageToParameter = (code, value) => {
  let parameterValue;
  if (has.call(CODE_TO_CONVERSIONS, code)) {
    parameterValue = CODE_TO_CONVERSIONS[code].to(value);
  } else {
    parameterValue = Math.round(mapToRange(value, 0, 127, 0, 1023));
  }
  return [CODE_TO_PARAMETER[code], parameterValue];
};

export { CODE_TO_PARAMETER, PARAMETER_TO_CODE, parameterToMessage, messageToParameter };
