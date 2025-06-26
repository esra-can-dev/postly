describe('User List', () => {
  it('Refresh Button should be visible and user list should be updated', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: [{ id: 1, name: 'Leanne Graham' }],
    }).as('getUsersFirst')

    cy.visit('/')
    cy.wait('@getUsersFirst')

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      statusCode: 200,
      body: [{ id: 2, name: 'Ervin Howell' }],
    }).as('getUsersAfterRefresh')

    cy.get('button').find('[class*="pi-refresh"]').click()
    cy.wait('@getUsersAfterRefresh')

    cy.contains('Ervin Howell').should('exist')
    cy.contains('Leanne Graham').should('not.exist')
  })
})
