describe('User List', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' },
      ],
    }).as('getUsers')
  })

  it('User List load', () => {
    cy.visit('/')
    cy.wait('@getUsers')

    cy.contains('Users').should('exist')
    cy.contains('Leanne Graham').should('exist')
    cy.contains('Ervin Howell').should('exist')
  })

  it('Route the User Detail Page after clicking a user', () => {
    cy.visit('/')
    cy.wait('@getUsers')

    cy.contains('Leanne Graham').should('exist')
    cy.contains('Leanne Graham').click()
    cy.url().should('include', '/users/1')
  })
})
