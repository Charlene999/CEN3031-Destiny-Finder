describe('Home Page', () => {

  it('Login Button Redirects Correctly', () => {
    cy.visit('http://localhost:4200/')
    cy.url().should('include', 'http://localhost:4200/')
    cy.get('#login').click()
    cy.url().should('include', 'http://localhost:4200/login')
  })

  it('Sign Up Button Redirects Correctly', () => {
    cy.visit('http://localhost:4200/')
    cy.url().should('include', 'http://localhost:4200/')
    cy.get('#signup').click()
    cy.url().should('include', 'http://localhost:4200/signup')
  })

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
  it('New User Creation', () => {
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.get('input[type=name]').type('Dylan T')
    cy.get('input[type=name]').should('have.value', 'Dylan T')

    cy.get('input[type=username]').type('dylan111')
    cy.get('input[type=username]').should('have.value', 'dylan111')

    cy.get('input[type=email]').type('dct@email.com')
    cy.get('input[type=email]').should('have.value', 'dct@email.com')

    cy.get('input[type=password]').type('dylandylan')
    cy.get('input[type=password]').should('have.value', 'dylandylan')

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
  
  it('Input Valid Username and Password', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
})

//
//Normal User Pages
//

describe('Profile Page', () => {

  it('Update Name Option Redirects Correctly', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(1).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/name')
  })

  it('Update Username Option Redirects Correctly', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(2).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/email')
  })

  it('Update Password Option Redirects Correctly', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(3).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/pass')
  })

  //it('Create A New Character Button Redirects Correctly', () => {
  //})

  //it('View All Characters Button Redirects Correctly', () => {
  //})
})

describe('Edit Name Page', () => {

  it('Successfully Updates Name then Redirects to Profile Page', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(1).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/name')

    cy.get('#name').type('Dylan')
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
})

describe('Edit Email Page', () => {

  it('Successfully Updates Email then Redirects to Profile Page', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(2).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/email')

    cy.get('#email').type('dct@ufl.edu')
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
})

describe('Edit Password Page', () => {

  it('Successfully Updates Password then Redirects to Profile Page', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('select').select(3).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/pass')

    cy.get('#password').type('dylandylan')
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
})

describe('Create A New Character Page', () => {
})

describe('View All Characters Page', () => {
})

describe('Spells Page', () => {
/* 
  it('Successfully Adds a Spell to a Character', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

  })

  it('Successfully Removes a Spell from a Character', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
*/
})

describe('Items Page', () => {
/* 
  it('Successfully Adds an Item to a Character', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

  })

  it('Successfully Removes an Item from a Character', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
*/
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