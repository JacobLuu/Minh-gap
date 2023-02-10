const {
  containerGenerator: adminContainer,
  componentGenerator: adminComponent,
} = require('./forAdmin');
const {
  containerGenerator: frontendContainer,
  componentGenerator: frontendComponent,
} = require('./forFrontend');
const actionConsole = require('./utils/actionConsole');
const { METHOD } = require('./constants');

module.exports = (plop) => {
  plop.setGenerator('Create a new admin container ?', adminContainer);
  plop.setGenerator('Create a new admin component ?', adminComponent);

  plop.setGenerator('Create a new client container ?', frontendContainer);
  plop.setGenerator('Create a new client component ?', frontendComponent);

  plop.setActionType('console', actionConsole);
  plop.setHelper('keyOfMethod', (methodValue) => {
    for (const key in METHOD) {
      if (METHOD[key] === methodValue) {
        return key;
      }
    }
  });
};
