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
    baseUrl: 'http://localhost:1337',
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true
    },
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
})
