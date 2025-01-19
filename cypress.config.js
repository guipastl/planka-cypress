const { defineConfig } = require("cypress")

const cyPostgres = require('cypress-postgres-10v-compatibility')

module.exports = defineConfig({
  projectId: "v923ax",
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
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
})
