const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'mne4jm',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true
  },
});
