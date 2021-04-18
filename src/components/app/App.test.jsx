import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(
    <BrowserRouter>
    <App />
    </BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
  });
});
