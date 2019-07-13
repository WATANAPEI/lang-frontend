module.exports = {
  roots: ["<rootDir>/client"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/client/utils"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/client/setupEnzyme.ts"]
};
