import {pathsToModuleNameMapper} from 'ts-jest'
import {compilerOptions} from './tsconfig.json'
import type {Config} from '@jest/types'

const jestConfig: Config.InitialOptions = {
  verbose: true,
  testTimeout: 9000,
  watch: false,
  watchAll: false,
  detectOpenHandles: true,
  forceExit: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'coverage/', '.vscode/', '.serverless/'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      branches: 100,
      functions: 100
    }
  },
  setupFiles: ['./jest.setup.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}

export default jestConfig
