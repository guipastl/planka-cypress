# Planka Cypress

[![test](https://github.com/guipastl/planka-cypress/actions/workflows/e2eTest.yml/badge.svg)](https://github.com/guipastl/planka-cypress/actions)
[![planka-cypress](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/v923ax/test&style=plastic&logo=cypress)](https://cloud.cypress.io/projects/v923ax/runs)

Sample project to experiment with [Cypress](https://cypress.io) to test the Planka application in order to compare tests execution against an application running on Docker container and on local build.

## Pre-requirements

You need to have a Planka local environment such as [build](https://github.com/plankanban/planka) or Docker up and running.

You also need to have [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions of Node.js and npm were used:

```sh
$ node -v
v20.13.1

$ npm -v
10.8.0
```

### Building and Running Planka on Docker

> Check out the setup guide in the Planka [repo](https://github.com/plankanban/planka).

## Installation

Run `npm i` to install the dependencies.

## Tests

> Before running the tests, in the file `cypress.env.json`, update the value of the `user_password` and `user_name` properties with those of your choice.
>
> By default, the tests will run against `http://localhost/`, but if you need to run them in a different URL (e.g.: `http://localhost:3000/`), change the `baseUrl` property in the [`cypress.config.js`](./cypress.config.js) file.
>
> In the local build test execution, the server runs in the port `1337`, while the client runs in the `3000`.

### Headless mode

Run `npx cypress run --env api_server=http://localhost:3000` to run all tests in headless mode against application running on Docker container.

Run `npx cypress run --env api_server=http://localhost:1337` to run all tests in headless mode against local build application.

### Interactive mode

1. Run `npx cypress open --env api_server=http://localhost:3000` or `npx cypress --env api_server=http://localhost:1337` to open the Cypress App;
2. Select E2E Testing;
3. Select one of the available browsers (e.g., Electron), and click the Start button;
4. Run any test.

___

Developed with 💚 by [Guilherme](https://www.linkedin.com/in/guipastl).
