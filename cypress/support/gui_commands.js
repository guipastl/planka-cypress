Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/login')

    cy.get('input[name="emailOrUsername"]').type(user)
    cy.get('input[name="password"]').type(password, { log: false })
    cy.intercept('/api/access-tokens?withHttpOnlyToken=true').as('login')
    cy.get('.button').click()
    cy.wait('@login')
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/login')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/')
  cy.get('*[class^=Projects_card]').last().click()
  cy.get('input').type(project.name)
  cy.get('.green').click()
})

Cypress.Commands.add('gui_updatesProject', project => {
  cy.api_createProject(project)
    .then(resp => cy.visit(`/projects/${resp.body.item.id}`))
  cy.contains(project.name).should('be.visible')
  cy.get('.pencil').click()
  cy.get('input').focus().clear().type(project.anotherName)
  cy.get('.positive').click()
  cy.get('.close').click()
})

Cypress.Commands.add('gui_deleteProject', project => {
  cy.api_createProject(project)
    .then(resp => {
      cy.visit('/')
      cy.get('div[class^="four"]').should('have.length', 2)
      cy.visit(`/projects/${resp.body.item.id}`)})
  cy.contains(project.name).should('be.visible')
  cy.get('.pencil').click()
  cy.get('button').last().click()
  cy.get('.negative').click()
})
