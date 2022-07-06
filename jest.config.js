module.exports = {
    verbose: true,
    setupFiles: ['./jest.env'],
    roots: [ './src' ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        `**/test/**/*.+(spec|test).+(ts|js)`
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
};
