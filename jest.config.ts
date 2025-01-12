const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    projects: [
        {
            displayName: 'frontend',
            testEnvironment: 'jest-environment-jsdom',
        },
        {
            displayName: 'backend',
            testEnvironment: 'node',
        },
    ],
};

export default customJestConfig;
