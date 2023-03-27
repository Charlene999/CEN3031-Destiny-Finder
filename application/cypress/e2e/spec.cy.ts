describe('Home Page', () => {
})

//
//Anonymous User Pages
//

describe('Sign Up Page', () => {

  it('User Already Exists - POST Request and Expected Response', () => {
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/users/create', 
      body: JSON.stringify({ name: 'dylan', username: 'dylan10', email: 'fake@fakemail.com', password: 'dylanmail1' }),
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    })
    .then( (response) => {
        expect(response.status).to.eq(409)
      }
    )
  })

  it('User Already Exists', () => {
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.get('#name').type('dylan')
    cy.get('#name').should('have.value', 'dylan')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#email').type('fake@fakemail.com')
    cy.get('#email').should('have.value', 'fake@fakemail.com')

    cy.get('#password').type('dylanmail1')
    cy.get('#password').should('have.value', 'dylanmail1')

    cy.get('#submit').click()
  })

  //NOTE: The input data will have to change for this everytime the test is ran
  //      until the delete user functionality is added to the admin view users page.
  /*
  it('New User Creation - POST Request and Expected Response', () => {
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/users/create', 
      body: JSON.stringify({ name: 'd55', username: 'd55', email: 'd55', password: 'd55' }),
      headers: {'Content-Type': 'application/json'}
    })
    .then( (response) => {
        expect(response.status).to.eq(201)
      }
    )
  })

  it('New User Creation', () => {
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.get('input[type=name]').type('d55')
    cy.get('input[type=name]').should('have.value', 'd55')

    cy.get('input[type=username]').type('d55')
    cy.get('input[type=username]').should('have.value', 'd55')

    cy.get('input[type=email]').type('d55')
    cy.get('input[type=email]').should('have.value', 'd55')

    cy.get('input[type=password]').type('d55')
    cy.get('input[type=password]').should('have.value', 'd55')

    cy.get('button').click()
  })
  */
})

describe('Login Page', () => {
  it('Input Invalid Username and Password - POST Request and Expected Response', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/users/login', 
      body: JSON.stringify({ username: 'dylan', password: 'password' }),
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    })
    .then( (response) => {
        expect(response.status).to.eq(404)
      }
    )
  })

  it('Input Invalid Username and Password', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan')
    cy.get('#username').should('have.value', 'dylan')

    cy.get('#password').type('password')
    cy.get('#password').should('have.value', 'password')
    
    cy.get('#submit').click()    
  })

  //TODO - Add testing functionality that does a POST request to http://localhost:8080/users/get
  //        to get and set the user token status after the first POST request
  /*
  it('Input Valid Username and Password - POST Request and Expected Response', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.request({
      method: 'POST', 
      url: 'http://localhost:8080/users/login', 
      body: JSON.stringify({ username: 'd2', password: 'd2' }),
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
        expect(response.status).to.eq(200)

        ///ADD POST request to http://localhost:8080/users/get and other functionality here///

      }
    )
  })
  */
  
  it('Input Valid Username and Password', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()    
  })
})

//
//Normal User Pages
//

describe('Profile Page', () => {
})

describe('Create A New Character Page', () => {
})

describe('View All Characters Page', () => {
})

describe('Spells Page', () => {
})

describe('Items Page', () => {
})

//
//Admin Pages
//

describe('Admin Page', () => {
})

describe('View Existing Users Page', () => {
})

describe('Create Spells or Items Page', () => {
})

describe('Delete Spells or Items Page', () => {
})

//
//Both Types of Users Pages
//

describe('Classes Page', () => {
})