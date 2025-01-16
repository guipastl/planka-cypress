const { defineConfig } = require("cypress")

const cyPostgres = require('cypress-postgres-10v-compatibility')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        dbQuery: query => cyPostgres(
          query.query,
          query.connection
        )
      })
      return config
    },
    baseUrl: 'http://localhost:3000',
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true
    },
    hosts: {
      "localhost": "127.0.0.1"
    },
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
})
