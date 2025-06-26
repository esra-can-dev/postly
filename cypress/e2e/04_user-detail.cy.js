describe('User Detail Page', () => {
  const mockUser = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
    },
  }

  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
      statusCode: 200,
      body: mockUser,
    }).as('getUserById')
  })

  it('should display user details correctly', () => {
    cy.visit('/users/1')
    cy.wait('@getUserById')

    cy.contains(mockUser.name).should('exist')
    cy.contains(mockUser.email).should('exist')
    cy.contains(mockUser.phone).should('exist')

    const addressStr = `${mockUser.address.street} St, ${mockUser.address.suite}, ${mockUser.address.city}, ${mockUser.address.zipcode}`
    cy.contains(addressStr).should('exist')

    cy.get('img[alt="User avatar"]').should('have.attr', 'src').and('include', mockUser.name)
  })
})
