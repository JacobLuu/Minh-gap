# How to E2E testing with Cypress

## What is Cypress

Cypress is a next generation front end testing tool built for the modern web.

HP: https://docs.cypress.io/guides/overview/why-cypress
API: https://docs.cypress.io/api/table-of-contents

## How to write test case with Cypress

### Setup

We are using a Monorepo project structure so the directory structure will be like bellow.
All e2e-tests cases are located at e2e-tests

The directory structure of gap-admin package is bellow.

```
packages/gap-admin
├── e2e-tests
│   ├── configs
│   │   └── config.ts  ## Configuration for gap-admin
│   ├── e2e
│   │   └── forgot_password.cy.js ## All test case here
│   ├── fixtures
│   │   └── example.json  ## for mock data
│   └── support ## cypress utilities
│       ├── commands.js
│       └── e2e.js
├── index.d.ts
├── jest.config.js
├── package.json
├── public
├── run_test.sh
├── src
```

### Configuration

```
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


```

### CLI setting

Add CLI for running testing

```
# package.json

## Run all e22 test cases for gap-admin package
"e2e-test:gap-admin": "PACKAGE_NAME=gap-admin && cypress run --config-file ./packages/$PACKAGE_NAME/e2e-tests/configs/config.ts",

## Open Cypress UI for gap-admin package
"e2e-test:watch:gap-admin": "PACKAGE_NAME=gap-admin && cypress open --config-file ./packages/$PACKAGE_NAME/e2e-tests/configs/config.ts"

```

### How to add new test cases

Add new test spec to this directory `packages/gap-admin/e2e-tests/e2e`

Example test case

```
describe('ForgotPassword', () => {
 it('displays form by default', () => {
   cy.visit('/#/forgot-password');

   cy.get('p.MuiTypography-root.MuiTypography-body1.title')
     .first()
     .should('have.text', 'Forgot your password?');

   cy.get('p.MuiTypography-root.MuiTypography-body1.sub_title')
     .first()
     .should(
       'have.text',
       'Enter the email associated with your account and we will send you an email with instructions to reset your password',
     );
 });
});
```

### How to run test cases

```
yarn e2e-test:gap-admin
```

Sample output

```
yarn run v1.22.19
$ PACKAGE_NAME=gap-admin && cypress run --config-file ./packages/$PACKAGE_NAME/e2e-tests/configs/config.ts

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        10.10.0                                                                        │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v16.17.0 (/Users/nexusfrontiertech/.nvm/versions/node/v16.17.0/bin/node)       │
  │                 [39m                                                                           │
  │ Specs:          1 found (forgot_password.cy.js)                                                │
  │ Searched:       packages/gap-admin//e2e-tests/e2e/**/*.cy.{js,jsx,ts,tsx}                      │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  forgot_password.cy.js                                                           (1 of 1)
Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating


  ForgotPassword
    ✓ displays form by default (1013ms)


  1 passing (1s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     1 second                                                                         │
  │ Spec Ran:     forgot_password.cy.js                                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: /Users/nexusfrontiertech/workspace/innovatube/gap/gap-web-f     (1 second)
                          rontend/__tests__/cypress/gap-admin/videos/forgot_password.
                          cy.js.mp4


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  forgot_password.cy.js                    00:01        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:01        1        1        -        -        -

✨  Done in 11.00s.
```
