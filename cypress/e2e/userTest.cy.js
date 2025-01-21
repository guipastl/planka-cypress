import * as data from '../fixtures/randomData'

describe('user test', () => {
  beforeEach(() => {
    cy.login()
    cy.api_deleteUsers()
  })

  it('creates user', () => {
    const user = data.generate()
    cy.gui_createUser(user)
    cy.get('.scrolling')
      .should('contain.text', user.name)
      .and('contain.text', user.userName)
      .and('contain.text', user.email)
  })

  it('updates user', () => {
    const user = data.generate()
    cy.gui_updatesUser(user)
    cy.get('.scrolling')
      .should('contain.text', user.anotherName)
  })

  it('deletes user', () => {
    const user = data.generate()
    cy.gui_deleteUser(user)
    cy.contains(user.name).should('not.exist')
  })
})
