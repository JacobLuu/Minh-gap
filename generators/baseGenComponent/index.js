const { componentFolder } = require('../constants');

const rootExeDir = `${process.env.PWD}/`;

module.exports = (packageSourcePath) => ({
  description: 'application controller logic',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component ? E.g: Button, Acc...',
    },
  ],
  actions(data) {
    const actions = [
      {
        type: 'console',
      },
    ];
    if (data.name) {
      actions.push({
        type: 'add',
        path: `${
          rootExeDir + packageSourcePath + componentFolder
        }{{ properCase name }}/index.ts`,
        templateFile: `${rootExeDir}generators/templates/index.ts.hbs`,
        abortOnFail: true,
      });
      // Add the container's main file
      actions.push({
        type: 'add',
        path: `${
          rootExeDir + packageSourcePath + componentFolder
        }{{ properCase name }}/{{ properCase name}}.tsx`,
        templateFile: `${rootExeDir}generators/templates/component.tsx.hbs`,
        abortOnFail: true,
      });
      // Add the styles for the container
      actions.push({
        type: 'add',
        path: `${
          rootExeDir + packageSourcePath + componentFolder
        }{{ properCase name }}/styles.ts`,
        templateFile: `${rootExeDir}generators/templates/styles.ts.hbs`,
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${
          rootExeDir + packageSourcePath + componentFolder
        }{{ properCase name }}/{{ properCase name}}.stories.tsx`,
        templateFile: `${rootExeDir}generators/templates/componentStories.tsx.hbs`,
        abortOnFail: true,
      });
    }
    return actions;
  },
});
