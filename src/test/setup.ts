import '@testing-library/jest-dom'

// Mock window.setTimeout and clearTimeout for testing
Object.defineProperty(window, 'setTimeout', {
  writable: true,
  value: global.setTimeout
})

Object.defineProperty(window, 'clearTimeout', {
  writable: true,
  value: global.clearTimeout
})

// Mock HTMLElement methods that aren't available in jsdom
Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
  configurable: true,
  value: 800,
})

Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  value: 600,
})
