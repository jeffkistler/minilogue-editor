import React from 'react';
import renderer from 'react-test-renderer';
import Switch from './Switch.jsx';

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
  style: {},
});

describe('switch component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Switch value={0} numPositions={5} />, { createNodeMock })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
