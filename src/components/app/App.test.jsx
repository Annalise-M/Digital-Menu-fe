import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App3 from './App3';

describe('App3 component', () => {
  afterEach(() => cleanup());
  it('renders App3', () => {
    const { asFragment } = render(<App3 />);
    expect(asFragment()).toMatchSnapshot();
  });
});
