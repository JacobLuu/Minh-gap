# Overview

GAP web frontend

This repository contains the code for {gap-web-frontend} for {GAP}.

# Requirements

> Please list things you need to use the software and how to install them.

**npm**

```
npm install yarn@latest -g
```

## Directory Structure

```
├── DirectoryName/
└── DirectoryName /
	├── DirectoryName/                     // description...
	├── DirectoryName/                    // description...
  ├── DirectoryName/                  	// description...
├── FileName
└── FileName
```

## Built With

> This section should list any major frameworks/libraries used to bootstrap your project.
> Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [Dropwizard](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#:~:text=Built%20With-,Dropwizard,-%2D%20The%20web%20framework) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](ROME) - Used to generate RSS Feeds

## Library

| Library Name | Version |
| ------------ | ------- |
| XXX          | X.X.X   |

# Getting Started

## Instalation

Define the full instalation process, assuming that the environment for instalation is clean.

1. Get a free API Key at https://example.com

2. Clone the repo

```
git clone https://github.com/github_username/repo_name.git
```

3. Install NPM packages

```
npm install
```

4. Enter your API in config.js

```
const API_KEY = 'ENTER YOUR API';
```

# Usage

> Show useful examples of how a project can be used.

## Documentation

This project includes a `docs` folder with more details on:

1.  [Convention](docs/convention.md)
2.  [Theme](docs/theme.md)
3.  [Setup and development](docs/development.md)
4.  [Architecture](docs/architecture.md)
5.  [Tech stack](docs/techStack.md)

# Getting started

To run admin:

```
npm run start:gap-admin
```

To run frontend:

```
npm run start:gap-frontend
```

#### To add a lib to the root

```
yarn add <lib_name> -W
```

#### To add a lib to a specific package

```
yarn workspace <workspace_name> add <lib_name>
```

E.g:

```
yarn workspace admin add lodash
```

#### Develop component

- With general component -> develop in package : gap-common and you can use in other package
- With individual component -> develop in indidual package

## Running the tests

### End to end tests

[How to write end to end tests](docs/e2e-testing-with-cypress.md)

How to run end to end tests

```
yarn e2e-test:gap-admin
```

### Coding style tests

> Explain what these tests test and why

### How to auto generate translation file

We are using json-autotranslate and google translate for generating translation json automatically

https://github.com/leolabs/json-autotranslate

```
export GOOGLE_APPLICATION_CREDENTIALS=[google-service-account-key].json
yarn json-autotranslate --source-language=en --directory-structure=default --input=packages/gap-frontend/src/locales
```

## Deployment

> Add additional notes about how to deploy this on a live system

## Versioning

> Specify how the versioning works.

We use [Semantic Versioning 2.0.0] (https://semver.org/) for versioning.
For the versions available, see the tags on this repository.

## Reference

Provide the link to the literature and articles you have used for your research as references.
