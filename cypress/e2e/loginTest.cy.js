describe('login test', { baseUrl: 'http://localhost:3000' }, () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('successful login', () => {
    cy.get('input[name="emailOrUsername"]').type(Cypress.env('user_name'))
    cy.get('input[name="password"]').type(Cypress.env('user_password'))
    cy.get('.button').click()
    cy.get('*[class^=Header_logo]').click()
      .should('be.visible')
  })

  it('unsuccessful login', () => {
    cy.get('input[name="emailOrUsername"]').type('user')
    cy.get('input[name="password"]').type('pass')
    cy.get('.button').click()
    cy.get('.error')
      .should('be.visible')
      .and('have.text', 'Invalid credentials')
  })

  it('api login', () => {
    cy.api_login()
      .then(resp => {
        expect(resp.status).to.equal(200)
        expect(resp.body).to.haveOwnProperty('item')
      })
  })
})
