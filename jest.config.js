/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  moduleNameMapper: {
    '/.svg/': '/Users/jeh/dev/jnotes/__mocks__/svgMock.js',
  },
  resolver: undefined,
  setupFilesAfterEnv: [
    '<rootDir>/jest/setup-jest-after-env.js',
    './__mocks__/react-navigation-mocks.js',
    './__mocks__/sentryMocks.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native)',
  ],
  verbose: true,
};

module.exports = config;
