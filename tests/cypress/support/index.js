// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import 'cypress-wait-until'
import "./commands";
import "@cypress/code-coverage/support";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('cypress-terminal-report/src/installLogsCollector')()
require('@jahia/cypress/dist/support/registerSupport').registerSupport()

const optionsCollector = {
    enableExtendedCollector: true,
    xhr: {
        printHeaderData: true,
        printRequestData: true,
    },
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('cypress-terminal-report/src/installLogsCollector')(optionsCollector)