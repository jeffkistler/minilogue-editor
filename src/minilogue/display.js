/**
 * Utilities for converting program parameter values to human readable format.
 */
import * as types from './program';


const has = Object.prototype.hasOwnProperty;

const mapToRange = (value, inLow, inHigh, outLow, outHigh) => {
  const fromRange = inHigh - inLow;
  const toRange = outHigh - outLow;
  const scalar = (value - inLow) / fromRange;
  return (toRange * scalar) + outLow;
};

const splitRanges = (value, ranges) => {
  // max exclusive?
  const maxIndex = ranges.length - 1;
  const { fromRange, toRange } = ranges.find(({ fromRange: range }, index) => (
    (range[0] <= value) && (index === maxIndex ? range[1] >= value : range[1] > value)
  ));
  return mapToRange(value, fromRange[0], fromRange[1], toRange[0], toRange[1]);
};

const rangeToChoice = (value, ranges) => {
  // inclusive
  const found = ranges.find(({ min, max }) => (value >= min) && (value <= max));
  return found.value;
};

const WAVE_CHOICES = {
  0: 'Square',
  1: 'Triangle',
  2: 'Sawtooth',
};

const OCTAVE_CHOICES = {
  0: "16'",
  1: "8'",
  2: "4'",
  3: "2'",
};

const pitchToCents = value => (
  splitRanges(
    value,
    [
      { fromRange: [0, 4], toRange: [-1200, -1200] },
      { fromRange: [4, 356], toRange: [-1200, -256] },
      { fromRange: [356, 476], toRange: [-256, -16] },
      { fromRange: [476, 492], toRange: [-16, 0] },
      { fromRange: [492, 532], toRange: [0, 0] },
      { fromRange: [532, 548], toRange: [0, 16] },
      { fromRange: [548, 668], toRange: [16, 256] },
      { fromRange: [668, 1020], toRange: [256, 1200] },
      { fromRange: [1020, 1023], toRange: [1200, 1200] },
    ],
  )
);

const pitchEGIntToCents = value => (
  splitRanges(
    value,
    [
      { fromRange: [0, 4], toRange: [-4800, -4800] },
      { fromRange: [4, 356], toRange: [-4800, -1024] },
      { fromRange: [356, 476], toRange: [-1024, -64] },
      { fromRange: [476, 492], toRange: [-64, 0] },
      { fromRange: [492, 532], toRange: [0, 0] },
      { fromRange: [532, 548], toRange: [0, 64] },
      { fromRange: [548, 668], toRange: [64, 1024] },
      { fromRange: [668, 1020], toRange: [1024, 4800] },
      { fromRange: [1020, 1023], toRange: [4800, 4800] },
    ],
  )
);

const cutoffEGIntToPercent = (value) => {
  /*
  0   ~ 11   : -100 (%)
  11  ~ 492  : - ((492 - value) * (492 - value) * 4641 * 100) / 0x40000000 (%)
  492 ~ 532  : 0 (%)
  532 ~ 1013 : ((value - 532) * (value - 532) * 4641 * 100) / 0x40000000 (%)
  1013~1023  : 100 (%)
  */
  let percent;
  if ((value >= 0) && (value < 11)) {
    percent = -100;
  } else if ((value >= 11) && (value < 492)) {
    percent = -((492 - value) * (492 - value) * 4641 * 100) / 0x40000000;
  } else if ((value >= 492) && (value < 532)) {
    percent = 0;
  } else if ((value >= 532) && (value < 1013)) {
    percent = ((value - 532) * (value - 532) * 4641 * 100) / 0x40000000;
  } else if ((value >= 1013) && (value <= 1023)) {
    percent = 100;
  }
  return percent;
};

const translateVoiceModeDepth = (value, program) => {
  switch (program[types.VOICE_MODE]) {
    case 0: // POLY
      return Math.round(mapToRange(value, 0, 1023, 0, 8));
    case 1: // DUO
    case 2: // UNISON
      return Math.round(mapToRange(value, 0, 1023, 0, 50));
    case 4: // CHORD
      return rangeToChoice(
        value,
        [
          { min: 0, max: 73, value: '5th' },
          { min: 74, max: 146, value: 'sus2' },
          { min: 147, max: 219, value: 'm' },
          { min: 220, max: 292, value: 'Maj' },
          { min: 293, max: 365, value: 'sus4' },
          { min: 366, max: 438, value: 'm7' },
          { min: 439, max: 511, value: '7' },
          { min: 512, max: 585, value: '7sus4' },
          { min: 586, max: 658, value: 'Maj7' },
          { min: 659, max: 731, value: 'aug' },
          { min: 732, max: 804, value: 'dim' },
          { min: 805, max: 877, value: 'm7b5' },
          { min: 878, max: 950, value: 'mMaj7' },
          { min: 951, max: 1023, value: 'Maj7b5' },
        ],
      );
    case 5: // DELAY
      return rangeToChoice(
        value,
        [
          { min: 0, max: 85, value: '1/192' },
          { min: 86, max: 170, value: '1/128' },
          { min: 171, max: 255, value: '1/64' },
          { min: 256, max: 341, value: '1/48' },
          { min: 342, max: 426, value: '1/32' },
          { min: 427, max: 511, value: '1/24' },
          { min: 521, max: 597, value: '1/16' },
          { min: 598, max: 682, value: '1/12' },
          { min: 683, max: 767, value: '1/8' },
          { min: 768, max: 853, value: '1/6' },
          { min: 854, max: 938, value: '3/16' },
          { min: 939, max: 1023, value: '1/4' },
        ],
      );
    case 6: // ARP
      return rangeToChoice(
        value,
        [
          { min: 0, max: 78, value: 'Manual 1' },
          { min: 79, max: 157, value: 'Manual 2' },
          { min: 158, max: 236, value: 'Rise 1' },
          { min: 237, max: 315, value: 'Rise 2' },
          { min: 316, max: 393, value: 'Fall 1' },
          { min: 394, max: 472, value: 'Fall 2' },
          { min: 473, max: 551, value: 'Rise Fall 1' },
          { min: 552, max: 630, value: 'Rise Fall 2' },
          { min: 631, max: 708, value: 'Poly 1' },
          { min: 709, max: 787, value: 'Poly 2' },
          { min: 788, max: 866, value: 'Random 1' },
          { min: 867, max: 945, value: 'Random 2' },
          { min: 946, max: 1023, value: 'Random 3' },
        ],
      );
    case 7: // SIDECHAIN
    default:
      return value;
  }
};

const translateLFORate = (value, patch) => {
  if (!patch[types.LFO_BPM_SYNC]) {
    return value;
  }
  return rangeToChoice(
    value,
    [
      { min: 0, max: 63, value: '4' },
      { min: 64, max: 127, value: '2' },
      { min: 128, max: 191, value: '1' },
      { min: 192, max: 255, value: '3/4' },
      { min: 256, max: 319, value: '1/2' },
      { min: 320, max: 383, value: '3/8' },
      { min: 384, max: 447, value: '1/3' },
      { min: 448, max: 511, value: '1/4' },
      { min: 512, max: 575, value: '3/16' },
      { min: 576, max: 639, value: '1/6' },
      { min: 640, max: 703, value: '1/8' },
      { min: 704, max: 767, value: '1/12' },
      { min: 768, max: 831, value: '1/16' },
      { min: 832, max: 895, value: '1/24' },
      { min: 896, max: 959, value: '1/32' },
      { min: 960, max: 1023, value: '1/36' },
    ],
  );
};

const DISPLAY_OPTIONS = {
  [types.PROGRAM_NAME]: {
    title: 'Program Name',
    type: 'string',
  },
  [types.VCO1_PITCH]: {
    title: 'VCO1 Pitch',
    label: 'Pitch',
    type: 'integer',
    func: pitchToCents,
    unit: 'Cents',
  },
  [types.VCO1_SHAPE]: {
    title: 'VCO1 Shape',
    label: 'Shape',
    type: 'integer',
  },
  [types.VCO2_PITCH]: {
    title: 'VCO2 Pitch',
    label: 'Pitch',
    type: 'integer',
    func: pitchToCents,
    unit: 'Cents',
  },
  [types.VCO2_SHAPE]: {
    title: 'VCO2 Shape',
    label: 'Shape',
    type: 'integer',
  },
  [types.CROSS_MOD_DEPTH]: {
    title: 'Cross Mod Depth',
    label: 'Cross Mod Depth',
    type: 'integer',
  },
  [types.VCO2_PITCH_EG_INT]: {
    title: 'VCO2 Pitch EG Int',
    label: 'Pitch EG Int',
    type: 'integer',
    func: pitchEGIntToCents,
    unit: 'Cents',
  },
  [types.VCO1_LEVEL]: {
    title: 'VCO1 Level',
    label: 'VCO1',
    type: 'integer',
  },
  [types.VCO2_LEVEL]: {
    title: 'VCO2 Level',
    label: 'VCO2',
    type: 'integer',
  },
  [types.NOISE_LEVEL]: {
    title: 'Noise Level',
    label: 'Noise',
    type: 'integer',
  },
  [types.CUTOFF]: {
    title: 'Cutoff',
    label: 'Cutoff',
    type: 'integer',
  },
  [types.RESONANCE]: {
    title: 'Resonance',
    label: 'Resonance',
    type: 'integer',
  },
  [types.CUTOFF_EG_INT]: {
    title: 'Cutoff EG Int',
    label: 'EG Int',
    type: 'integer',
    func: cutoffEGIntToPercent,
    unit: '%',
  },
  [types.AMP_VELOCITY]: {
    title: 'Amp Velocity',
    label: 'Velocity',
    type: 'integer',
  },
  [types.AMP_EG_ATTACK]: {
    title: 'Amp EG Attack',
    label: 'Attack',
    type: 'integer',
  },
  [types.AMP_EG_DECAY]: {
    title: 'Amp EG Decay',
    label: 'Decay',
    type: 'integer',
  },
  [types.AMP_EG_SUSTAIN]: {
    title: 'Amp EG Sustain',
    label: 'Sustain',
    type: 'integer',
  },
  [types.AMP_EG_RELEASE]: {
    title: 'Amp EG Release',
    label: 'Release',
    type: 'integer',
  },
  [types.EG_ATTACK]: {
    title: 'EG Attack',
    label: 'Attack',
    type: 'integer',
  },
  [types.EG_DECAY]: {
    title: 'EG Decay',
    label: 'Decay',
    type: 'integer',
  },
  [types.EG_SUSTAIN]: {
    title: 'EG Sustain',
    label: 'Sustain',
    type: 'integer',
  },
  [types.EG_RELEASE]: {
    title: 'EG Release',
    label: 'Release',
    type: 'integer',
  },
  [types.LFO_RATE]: {
    title: 'LFO Rate',
    label: 'Rate',
    type: 'string',
    func: translateLFORate,
  },
  [types.LFO_INT]: {
    title: 'LFO Int',
    label: 'Int',
    type: 'integer',
  },
  [types.DELAY_HI_PASS_CUTOFF]: {
    title: 'Delay Hi Pass Cutoff',
    label: 'Hi Pass Cutoff',
    type: 'integer',
  },
  [types.DELAY_TIME]: {
    title: 'Delay Time',
    label: 'Time',
    type: 'integer',
  },
  [types.DELAY_FEEDBACK]: {
    title: 'Delay Feedback',
    label: 'Feedback',
    type: 'integer',
  },
  [types.VCO1_OCTAVE]: {
    title: 'VCO1 Octave',
    label: 'Octave',
    type: 'choice',
    choices: OCTAVE_CHOICES,
  },
  [types.VCO1_WAVE]: {
    title: 'VCO1 Wave',
    label: 'Wave',
    type: 'choice',
    choices: WAVE_CHOICES,
  },
  [types.VCO2_OCTAVE]: {
    title: 'VCO2 Octave',
    label: 'Octave',
    type: 'choice',
    choices: OCTAVE_CHOICES,
  },
  [types.VCO2_WAVE]: {
    title: 'VCO2 Wave',
    label: 'Wave',
    type: 'choice',
    choices: WAVE_CHOICES,
  },
  [types.SYNC]: {
    title: 'Oscillator Sync',
    label: 'Sync',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.RING]: {
    title: 'Ring Modulation',
    label: 'Ring',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.CUTOFF_VELOCITY]: {
    title: 'Cutoff Velocity',
    label: 'Velocity',
    type: 'choice',
    choices: {
      0: '0',
      1: '50',
      2: '100',
    },
    unit: '%',
  },
  [types.CUTOFF_KEYBOARD_TRACK]: {
    title: 'Cutoff Keyboard Track',
    label: 'Key Track',
    type: 'choice',
    choices: {
      0: '0',
      1: '50',
      2: '100',
    },
    unit: '%',
  },
  [types.CUTOFF_TYPE]: {
    title: 'Filter Type',
    label: '4-Pole',
    type: 'choice',
    choices: {
      0: '2-Pole',
      1: '4-Pole',
    },
  },
  [types.LFO_TARGET]: {
    title: 'LFO Target',
    label: 'Target',
    type: 'choice',
    choices: {
      0: 'Cutoff',
      1: 'Shape',
      2: 'Pitch',
    },
  },
  [types.LFO_EG]: {
    title: 'LFO EG',
    label: 'EG Mod',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'Rate',
      2: 'Int',
    },
  },
  [types.LFO_WAVE]: {
    title: 'LFO Wave',
    label: 'Wave',
    type: 'choice',
    choices: WAVE_CHOICES,
  },
  [types.DELAY_OUTPUT_ROUTING]: {
    title: 'Delay Output Routing',
    label: 'Output Routing',
    type: 'choice',
    choices: {
      0: 'Bypass',
      1: 'Pre-Filter',
      2: 'Post-Filter',
    },
  },
  [types.PORTAMENTO_TIME]: {
    title: 'Portamento Time',
    label: 'Portamento Time',
    type: 'string',
    func: value => (value === 0 ? 'Off' : value), // 0,1-127 => Off,1-127
  },
  [types.VOICE_MODE]: {
    title: 'Voice Mode',
    label: 'Voice Mode',
    type: 'choice',
    choices: {
      0: 'Poly',
      1: 'Duo',
      2: 'Unison',
      3: 'Mono',
      4: 'Chord',
      5: 'Delay',
      6: 'Arp',
      7: 'Sidechain',
    },
  },
  [types.VOICE_MODE_DEPTH]: {
    title: 'Voice Mode Depth',
    label: 'Voice Mode Depth',
    type: 'string',
    func: translateVoiceModeDepth,
  },
  [types.BEND_RANGE_POSITIVE]: {
    title: 'Bend Range Positive',
    label: 'Bend Range (+)',
    type: 'integer',
  },
  [types.BEND_RANGE_NEGATIVE]: {
    title: 'Bend Range Negative',
    label: 'Bend Range (-)',
    type: 'integer',
  },
  [types.LFO_KEY_SYNC]: {
    title: 'LFO Key Sync',
    label: 'LFO Key Sync',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.LFO_BPM_SYNC]: {
    title: 'LFO BPM Sync',
    label: 'LFO BPM Sync',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.LFO_VOICE_SYNC]: {
    title: 'LFO Voice Sync',
    label: 'LFO Voice Sync',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.PORTAMENTO_BPM]: {
    title: 'Portamento BPM',
    label: 'Portamento BPM',
    type: 'choice',
    choices: {
      0: 'Off',
      1: 'On',
    },
  },
  [types.PORTAMENTO_MODE]: {
    title: 'Portamento Mode',
    label: 'Portamento Mode',
    type: 'choice',
    choices: {
      0: 'Auto',
      1: 'On',
    },
  },
  [types.PROGRAM_LEVEL]: {
    title: 'Program Level',
    label: 'Program Level',
    type: 'integer',
    func: value => (
      ((value >= 77) && (value <= 127)) ? mapToRange(value, 77, 127, -25, 25) : 0
    ), // 77~127=-25~+25
  },
  [types.SLIDER_ASSIGN]: {
    title: 'Slider Assign',
    label: 'Slider Assign',
    type: 'choice',
    choices: {
      77: 'Pitch Bend',
      78: 'Gate Time',
      17: 'VCO1 Pitch',
      18: 'VCO1 Shape',
      21: 'VCO2 Pitch',
      22: 'VCO2 Shape',
      25: 'Cross Mod Depth',
      26: 'VCO2 Pitch EG Int',
      29: 'VCO1 Level',
      30: 'VCO2 Level',
      31: 'Noise Level',
      32: 'Cutoff',
      33: 'Resonance',
      34: 'Filter EG Int',
      40: 'Amp EG Attack',
      41: 'Amp EG Decay',
      42: 'Amp EG Sustain',
      43: 'Amp EG Release',
      44: 'EG Attack',
      45: 'EG Decay',
      46: 'EG Sustain',
      47: 'EG Release',
      48: 'LFO Rate',
      49: 'LFO Int',
      56: 'Delay Hi Pass Cutoff',
      57: 'Delay Time',
      58: 'Delay Feedback',
      59: 'Portamento Time',
      71: 'Voice Mode Depth',
    },
  },
  [types.KEYBOARD_OCTAVE]: {
    title: 'Keyboard Octave',
    label: 'Octave',
    type: 'choice',
    choices: {
      0: '-2',
      1: '-1',
      2: '0',
      3: '1',
      4: '2',
    },
  },
  [types.BPM]: {
    title: 'BPM',
    label: 'Tempo',
    type: 'number',
    func: value => value, // 100~3000=10.0~300.0
  },
  [types.STEP_LENGTH]: {
    title: 'Step Length',
    type: 'integer',
  },
  [types.SWING]: {
    title: 'Swing',
    type: 'integer', // -75 +75
    func: value => mapToRange(value, 0, 127, -75, 75),
  },
  [types.DEFAULT_GATE_TIME]: {
    title: 'Default Gate Time',
    type: 'integer',
    func: value => mapToRange(value, 0, 71, 0, 100), // 0-71 -> 0-100%
    unit: '%',
  },
  [types.STEP_RESOLUTION]: {
    title: 'Step Resolution',
    type: 'choice',
    choices: {
      0: '1/16',
      1: '1/8',
      2: '1/4',
      3: '1/2',
      4: '1/1',
    },
  },
};


/**
 * Create a display conversion function for the given parameter.
 * @param {*} parameter - The parameter to make the display conversion for.
 * @returns A display conversion function.
 */
const makeDisplayConversion = (parameter) => {
  const options = DISPLAY_OPTIONS[parameter];
  let formatter;
  let prepare = value => value;
  if (has.call(options, 'func')) {
    prepare = (value, program) => options.func(value, program);
  }
  switch (options.type) {
    case 'choice':
      formatter = (value, program) => options.choices[prepare(value, program)];
      break;
    case 'string':
      formatter = prepare;
      break;
    case 'integer':
      formatter = (value, program) => Math.round(prepare(value, program));
      break;
    default:
      formatter = prepare;
  }
  let unit = '';
  if (options.unit) {
    unit = ` ${options.unit}`;
  }
  return program => `${formatter(program[parameter], program)}${unit}`;
};

/**
 * Get the human readable format of the given parameter in the given program.
 * @param {*} program - The program to read the value from.
 * @param {*} parameter - The parameter type to format from the program.
 * @returns The human readable value for the parameter value.
 */
const getParameterDisplayValue = (program, parameter) => {
  const displayConversion = makeDisplayConversion(parameter);
  return displayConversion(program);
};

/**
 * Get the panel label for the given parameter type.
 * @param {*} parameter - The parameter to get the label for.
 * @returns The panel label.
 */
const getParameterPanelLabel = parameter => (DISPLAY_OPTIONS[parameter].label || '');

/**
 * Get the display name for the given parameter type.
 * @param {*} parameter - The parameter to get the display name for.
 * @returns The panel display name.
 */
const getParameterDisplayName = parameter => (DISPLAY_OPTIONS[parameter].title || '');

export {
  getParameterDisplayValue,
  getParameterPanelLabel,
  getParameterDisplayName,
  DISPLAY_OPTIONS,
};
