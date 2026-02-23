import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import App3 from './App3';

describe('App3 component', () => {
  afterEach(() => cleanup());

  it('renders App3', async () => {
    const { container } = render(<App3 />);

    // Wait for async operations to complete
    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    // Basic render test - check that component renders without crashing
    expect(container.firstChild).toBeTruthy();
  });
});
