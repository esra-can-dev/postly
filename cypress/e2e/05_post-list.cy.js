describe('User Post List', () => {
  const mockPosts = [
    { id: 101, title: 'First Post', body: 'This is the first post.' },
    { id: 102, title: 'Second Post', body: 'This is the second post.' },
  ]

  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts?userId=1&_start=0&_limit=3', {
      statusCode: 200,
      body: mockPosts,
    }).as('getPostsByUserId')
  })

  it('should display posts and delete one successfully', () => {
    cy.visit('/users/1')
    cy.wait('@getPostsByUserId')

    cy.contains('First Post').should('exist')
    cy.contains('Second Post').should('exist')
    cy.contains('This is the first post.').should('exist')

    cy.intercept('DELETE', 'https://jsonplaceholder.typicode.com/posts/101', {
      statusCode: 200,
    }).as('deletePost')

    cy.contains('First Post').parent().parent().find('button').click()
    cy.wait('@deletePost')

    cy.get('.p-toast-message').should('exist')
  })
})
