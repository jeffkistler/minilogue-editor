/**
 * An array of LED light elements.
 */
import React from 'react';
import PropTypes from 'prop-types';


const LEDArray = ({ options, value, onChange }) => (
  <ul className="led-array">
    {options.map((option, index) => {
      const classNames = ['led-array-light'];
      if (option.value === value) {
        classNames.push('led-array-light-active');
      }
      return (
        <li className="led-array-value" key={index}>
          <span
            className={classNames.join(' ')}
            onClick={() => onChange(option.value)}
          ></span>
        </li>);
    })}
   </ul>
);

LEDArray.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
    }),
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

LEDArray.defaultProps = {
  onChange: () => {},
};

export default LEDArray;
