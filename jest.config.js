module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/packages/gap-common',
    '<rootDir>/packages/gap-admin',
    '<rootDir>/packages/gap-frontend',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.json5?$': 'json5-jest',
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.csv$': '<rootDir>/config/jest/csvTransform.js',
    // "^(?!.*\\.(js|jsx|mjs|css|csv|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  setupFiles: [],
  moduleNameMapper: {
    '^.+\\.(svg|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '^.+\\.(png)$': '<rootDir>/config/jest/fileMock.js',
    '^.+\\.(css|scss)$': '<rootDir>/node_modules/jest-css-modules',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // "modulePaths": [
  //   "<rootDir>/packages/podder-management-console/src",
  //   "<rootDir>/packages/podder-frontend-common/src",
  //   "<rootDir>/node_modules"
  // ],
  // "transformIgnorePatterns": [],
  // "transformIgnorePatterns": [
  //   "/node_modules/(?!semantic-ui-react).+\\.js$"
  // ],
  // "moduleFileExtensions": [
  //   "web.js",
  //   "js",
  //   "json",
  //   "web.jsx",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node",
  //   "mjs"
  // ]
};
