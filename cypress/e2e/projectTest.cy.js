import * as data from '../fixtures/randomData'

describe('project test', { baseUrl: 'http://localhost:3000' }, () => {
  beforeEach(() => {
    cy.login()
    cy.api_deleteProjects()
  })

  it('creates project', () => {
    const project = data.generate()
    cy.gui_createProject(project)
    cy.contains(project.name).should('be.visible')
  })

  it('updates project', () => {
    const project = data.generate()
    cy.gui_updatesProject(project)
    cy.contains(project.name).should('not.exist')
    cy.contains(project.anotherName).should('be.visible')
  })

  it('deletes project', () => {
    const project = data.generate()
    cy.gui_deleteProject(project)
    cy.contains(project.name).should('not.exist')
    cy.get('div[class^="four"]').should('have.length', 1)
  })
})
