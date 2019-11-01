module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: __dirname,
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
};
