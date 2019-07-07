module.exports = {
  roots: ["<rootDir>/client"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/client/setupEnzyme.ts"]
};
