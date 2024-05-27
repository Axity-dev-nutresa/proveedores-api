global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn()
}
