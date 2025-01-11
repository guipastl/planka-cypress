Cypress.Commands.add('api_login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api')}/api/access-tokens`,
    body: {
      emailOrUsername: Cypress.env('user_name'),
      password: Cypress.env('user_password')
    }
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api')}/api/projects`,
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.api_getAllProjects()
        .then(res =>
          res.body.items.forEach(project => cy.request({
            method: 'DELETE',
            url: `${Cypress.env('api')}/api/projects/${project.id}`,
            headers: { Authorization: `Bearer ${cookie.value}` }
          }))
      )
    })
})

Cypress.Commands.add('api_createProject', project => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('api')}/api/projects`,
        body: { name: `${project.name}`  },
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})
