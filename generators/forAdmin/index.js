const { adminSrcPath } = require('../constants');
const baseGenContainer = require('../baseGenContainer');
const baseGenComponent = require('../baseGenComponent');

module.exports = {
  containerGenerator: baseGenContainer(adminSrcPath),
  componentGenerator: baseGenComponent(adminSrcPath),
};
