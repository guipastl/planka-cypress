Cypress.Commands.add('api_login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api_server')}/api/access-tokens`,
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
        url: `${Cypress.env('api_server')}/api/projects`,
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})

Cypress.Commands.add( 'api_deleteProjects', () => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.api_getAllProjects()
        .then(res =>
          res.body.items.forEach(project => cy.request({
            method: 'DELETE',
            url: `${Cypress.env('api_server')}/api/projects/${project.id}`,
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
        url: `${Cypress.env('api_server')}/api/projects`,
        body: { name: `${project.name}`  },
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})

Cypress.Commands.add('api_getAllUsers', () => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api_server')}/api/users`,
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})

Cypress.Commands.add('api_deleteUsers', () => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.api_getAllUsers()
        .then(res => {
          res.body.items.forEach((user, i)  => {
            if (i === 0) return
            cy.request({
              method: 'DELETE',
              url: `${Cypress.env('api_server')}/api/users/${user.id}`,
              headers:  { Authorization: `Bearer ${cookie.value}` }
            })
          })
        })
    })
})

Cypress.Commands.add('api_createUser', user => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('api_server')}/api/users`,
        body: {
          email: user.email,
          name: user.name,
          password: user.password,
          username: user.userName
        },
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
    })
})

Cypress.Commands.add('api_createBoard', (projectId, board) => {
  cy.getCookie('accessToken')
    .then((cookie) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('api_server')}/api/projects/${projectId}/boards`,
        body: {
          name: `${board.name}`,
          position: board.position
        },
        headers:  { Authorization: `Bearer ${cookie.value}` }
      })
  })
})
