const config = {
    bail: 1,
    collectCoverage: true,
    testResultsProcessor: "jest-sonar-reporter",
    coverageReporters: [
        "lcov",
        "text",
        "clover",
        "cobertura",
        "lcov"
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testMatch: ["<rootDir>/**/*.test.js"],
    displayName: {
        name: "CLIENT",
        color: "blue",
    },
    testEnvironment: "node"
};

module.exports = config;