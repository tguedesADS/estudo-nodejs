import type { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'], 
    coverageDirectory: 'coverage',
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    transform: {
        '.+\\.ts': 'ts-jest'
    },
    preset: '@shelf/jest-mongodb'
};

export default config;

