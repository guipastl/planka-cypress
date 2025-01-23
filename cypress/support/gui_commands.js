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

Cypress.Commands.add('gui_createUser', user => {
  cy.visit('/')
  cy.get('.users').click()
  cy.get('button.ui').click()
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="name"]').type(user.name)
  cy.get('input[name="username"]').type(user.userName)
  cy.get('button.ui').last().click()
})

Cypress.Commands.add('gui_updatesUser', user => {
  cy.api_createUser(user)
  cy.visit('/')
  cy.get('.users').click()
  cy.get('.scrolling')
    .should('contain.text', user.name)
  cy.get('.right > .ui').click()
  cy.get('a[class="item ActionsStep_menuItem__P12UT"]').eq(0).click()
  cy.get('input[name="name"]').clear().type(user.anotherName)
  cy.get('.form > .positive').click()
})

Cypress.Commands.add('gui_deleteUser', user => {
  cy.api_createUser(user)
  cy.visit('/')
  cy.get('.users').click()
  cy.get('.scrolling')
    .should('contain.text', user.name)
  cy.get('.right > .ui').click()
  cy.get('a[class="item ActionsStep_menuItem__P12UT"]').eq(4).click()
  cy.get('button[class="ui fluid negative button"]').click()
})

Cypress.Commands.add('gui_createBoard', (project, board) => {
  cy.api_createProject(project)
    .then(resp => {
      cy.visit('/')
      cy.get('div[class^="four"]').should('have.length', 2)
      cy.visit(`/projects/${resp.body.item.id}`)
  })
  cy.get('.plus').click()
  cy.get('input').type(board.name)
  cy.get('.positive').click()
})

Cypress.Commands.add('gui_updatesBoard', (project, board) => {
  cy.api_createProject(project)
    .then(resp => {
      cy.api_createBoard(resp.body.item.id, board)
      cy.visit(`/projects/${resp.body.item.id}`)
  })
  cy.contains(board.name).get('.pencil').last().click()
  cy.get('input').clear().type(board.anotherName)
  cy.get('.positive').click()
})

Cypress.Commands.add('gui_deletesBoard', (project, board) => {
  cy.api_createProject(project)
    .then(resp => {
      cy.api_createBoard(resp.body.item.id, board)
      cy.visit(`/projects/${resp.body.item.id}`)
  })
  cy.contains(board.name).get('.pencil').last().click()
  cy.get('button[class^="ui"]').last().click()
  cy.get('.content > .ui').click()
})
