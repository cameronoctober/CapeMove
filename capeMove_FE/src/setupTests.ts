import '@testing-library/jest-dom/extend-expect';

// global.fetch mock
// @ts-ignore
global.fetch = global.fetch || jest.fn();

// mock matchMedia for components that use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {}
  })
});
