module.exports = {
  roots: ['./'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    // "^.+\\.(ts|tsx)$": "ts-jest"
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
};
