describe('Unkown Route Redirect', () => {
  it('should redirect to /users when an unknown route is visited', () => {
    cy.visit('/asdjhaksdhaksd', { failOnStatusCode: false })
    cy.url().should('include', '/users')
    cy.contains('Users').should('exist')
  })
})
