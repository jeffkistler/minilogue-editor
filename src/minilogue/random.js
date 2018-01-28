/**
 * Random Minilogue program generator.
 */
import * as types from './program';
import { DISPLAY_OPTIONS } from './display';

const has = Object.prototype.hasOwnProperty;
const choice = obj => (obj[Math.floor(Math.random() * obj.length)]);

const generateRandomProgram = (parameters) => {
  const selectedParameters = (
    parameters ||
    Object.values(types.PARAMETERS).map(parameter => parameter.parameter)
  );
  const lookup = types.PARAMETERS.reduce(
    (obj, param) => {
      obj[param.parameter] = param; // eslint-disable-line no-param-reassign
      return obj;
    },
    {},
  );
  const newProgram = JSON.parse(JSON.stringify(types.INIT_PROGRAM));
  selectedParameters.forEach((parameter) => {
    if (
      has.call(DISPLAY_OPTIONS, parameter) &&
      (DISPLAY_OPTIONS[parameter].type === 'choice')
    ) {
      newProgram[parameter] = parseInt(choice(Object.keys(DISPLAY_OPTIONS[parameter].choices)), 10);
    } else if (lookup[parameter].type === 0) {
      const {
        upperByteOffset = null,
        upperBitsWidth = 8,
        lowerByteOffset = null,
        lowerBitsWidth = 2,
      } = lookup[parameter].spec;
      let numBits = 0;
      if (upperByteOffset !== null) {
        numBits += upperBitsWidth;
      }
      if (lowerByteOffset !== null) {
        numBits += lowerBitsWidth;
      }
      const range = 2 ** numBits;
      newProgram[parameter] = Math.floor(Math.random() * range);
    }
  });
  newProgram[types.PROGRAM_NAME] = 'Random';
  return newProgram;
};

export default generateRandomProgram;
