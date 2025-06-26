describe('Add New Post Form', () => {
  beforeEach(() => {
    cy.visit('/users/1')
  })

  it('should show validation errors when fields are empty', () => {
    cy.contains('button', 'Add').click()

    cy.contains('Title is a required field').should('exist')
    cy.contains('Content is a required field').should('exist')
  })

  it('should submit the form and show success toast', () => {
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
      statusCode: 201,
      body: {
        title: 'Test Title',
        body: 'Test content',
        userId: 1,
      },
    }).as('createPost')

    cy.get('input[id="on_title"]').type('Test Title')
    cy.get('textarea[id="on_content"]').type('Test content')

    cy.contains('button', 'Add').click()

    cy.wait('@createPost').its('request.body').should('deep.equal', {
      title: 'Test Title',
      body: 'Test content',
      userId: 1,
    })

    cy.get('.p-toast-message').should('exist')
    cy.get('input[id="on_title"]').should('have.value', '')
    cy.get('textarea[id="on_content"]').should('have.value', '')
  })
})
