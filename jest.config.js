module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.(tsx|ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
  