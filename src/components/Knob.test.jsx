import React from 'react';
import renderer from 'react-test-renderer';
import Knob from './Knob.jsx';

const createNodeMock = () => ({
  getBoundingClientRect: jest.fn(() => (
    {
      width: 120,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  )),
});

describe('knob component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Knob value={0} />, { createNodeMock })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
