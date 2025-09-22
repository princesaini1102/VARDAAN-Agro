module.exports = async () => ({
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        baseUrl: './src',
        paths: {
          '@/*': ['*'],
          '@/config/*': ['config/*'],
          '@/controllers/*': ['controllers/*'],
          '@/middleware/*': ['middleware/*'],
          '@/models/*': ['models/*'],
          '@/routes/*': ['routes/*'],
          '@/services/*': ['services/*'],
          '@/utils/*': ['utils/*'],
          '@/types/*': ['types/*']
        }
      }
    }
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/config/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 30000,
  forceExit: true,
  detectOpenHandles: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // globalSetup: '<rootDir>/tests/setup.ts',
  // globalTeardown: '<rootDir>/tests/globalTeardown.ts',
});