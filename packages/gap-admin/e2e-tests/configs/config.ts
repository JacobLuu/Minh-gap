import { defineConfig } from 'cypress';

const baseDir = 'packages/gap-admin/';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3001',
    supportFile: `${baseDir}/e2e-tests/support/e2e.js`,
    specPattern: `${baseDir}/e2e-tests/e2e/**/*.cy.{js,jsx,ts,tsx}`,
  },
  videosFolder: '__tests__/cypress/gap-admin/videos',
  screenshotsFolder: '__tests__/cypress/gap-admin/screenshots',
  downloadsFolder: '__tests__/cypress/gap-admin/downloads',
  fixturesFolder: `${baseDir}/e2e-tests/fixtures`,
  defaultCommandTimeout: 10000,
});
