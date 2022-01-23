
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {

    if (err.message.includes('jQuery is not defined') || err.message.includes('websiteId') || err.message.includes('Cannot convert undefined or null to object')) {
      return false
    }

  })

