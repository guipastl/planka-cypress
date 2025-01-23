import * as data from '../fixtures/randomData'

describe('board test', () => {
  beforeEach(() => {
    cy.login()
    cy.api_deleteProjects()
  })

  it('creates board', () => {
    const project = data.generate()
    const board = data.generate()
    cy.gui_createBoard(project, board)
    cy.get('div[class^="Boards"]')
      .should('be.visible')
      .and('contain.text', board.name)
  })

  it('updates board', () => {
    const project = data.generate()
    const board = data.generate()
    cy.gui_updatesBoard(project, board)
    cy.get('div[class^="Boards"]')
      .should('be.visible')
      .and('contain.text', board.anotherName)
  })

  it('deletes board', () => {
    const project = data.generate()
    const board = data.generate()
    cy.gui_deletesBoard(project, board)
    cy.contains(board.name).should('not.exist')
  })
})
