/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';

const baseDir = 'packages/gap-frontend/';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3001',
    supportFile: `${baseDir}/e2e-tests/support/e2e.js`,
    specPattern: `${baseDir}/e2e-tests/e2e/**/*.cy.{js,jsx,ts,tsx}`,
    experimentalStudio: true,
    waitForAnimations: false,
    animationDistanceThreshold: 50,
  },
  env: {
    api_endpoint: 'https://dev-api.risk-assessment-tool.nexus-dev.com/api/v1',
  },
  videosFolder: '__tests__/cypress/gap-frontend/videos',
  screenshotsFolder: '__tests__/cypress/gap-frontend/screenshots',
  downloadsFolder: '__tests__/cypress/gap-frontend/downloads',
  fixturesFolder: `${baseDir}/e2e-tests/fixtures`,
  defaultCommandTimeout: 10000,
});
