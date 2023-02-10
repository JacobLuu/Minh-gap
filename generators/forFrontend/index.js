const { frontendSrcPath } = require('../constants');
const baseGenContainer = require('../baseGenContainer');
const baseGenComponent = require('../baseGenComponent');

module.exports = {
  containerGenerator: baseGenContainer(frontendSrcPath),
  componentGenerator: baseGenComponent(frontendSrcPath),
};
