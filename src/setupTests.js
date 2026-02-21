// Mock fetch for all tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    status: 401,
    json: () => Promise.resolve({ error: 'Unauthorized' }),
  })
);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
