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

  it('New User Successfully Created', () => {
  //NOTE: The user created here MUST match the edited/deleted user on the /admin/view-users page.
  //Else, the test will fail every subsequent iteration, since the character will already exist in the backend.
    cy.visit('http://localhost:4200/signup')
    cy.url().should('include', 'http://localhost:4200/signup')

    cy.get('#name').type('Test User')
    cy.get('#name').should('have.value', 'Test User')

    cy.get('#username').type('testuser10')
    cy.get('#username').should('have.value', 'testuser10')

    cy.get('#email').type('fake@fakemail.com')
    cy.get('#email').should('have.value', 'fake@fakemail.com')

    cy.get('#password').type('dylanmail1')
    cy.get('#password').should('have.value', 'dylanmail1')

    cy.get('#submit').click()
  })
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

  //Before each test, login and navigate to /profile page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })

  it('Update Name Option Redirects Correctly', () => {
    cy.get('#userData').select(1).trigger('click')
    cy.url().should('include', 'http://localhost:4200/profile/name')
  })

  it('Update Username Option Redirects Correctly', () => {
    cy.get('#userData').select(2).trigger('click')
    cy.url().should('include', 'http://localhost:4200/profile/email')
  })

  it('Update Password Option Redirects Correctly', () => {
    cy.get('#userData').select(3).trigger('click')
    cy.url().should('include', 'http://localhost:4200/profile/pass')
  })
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

    cy.get('#userData').select(1).trigger('click')

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

    cy.get('#userData').select(2).trigger('click')

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

    cy.get('#userData').select(3).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/pass')

    cy.get('#password').type('dylandylan')
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')
  })
})

//
//Admin Pages
//

describe('Admin Page', () => {

  //Before each test, login and navigate to /admin page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan5')
    cy.get('#username').should('have.value', 'dylan5')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/admin')
  })

  it('View Existing Users Button Redirects Correctly', () => {
    cy.get('#viewusers').click()
    cy.url().should('include', 'http://localhost:4200/admin/view-users')
  })

  it('Create Spells or Items Button Redirects Correctly', () => {
    cy.get('#additemspells').click()
    cy.url().should('include', 'http://localhost:4200/admin/add-spells-and-items')
  })

  it('Remove Spells or Items Redirects Correctly', () => {
    cy.get('#removeitemspells').click()
    cy.url().should('include', 'http://localhost:4200/admin/delete-spells-and-items')
  })
})

describe('View Existing Users Page', () => {

  //Before each test, login and navigate to /admin/view-users page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan5')
    cy.get('#username').should('have.value', 'dylan5')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/admin')

    cy.get('#viewusers').click()

    cy.url().should('include', 'http://localhost:4200/admin/view-users')
  })

  it('Successfully Edit a User', () => {
    //CHARLENE
    //TODO - Add Test
  })

  it('Successfully Delete a User', () => {
    cy.intercept('POST', '**/users/getall').as('getAllUsers')
    cy.intercept('DELETE', '**/users/delete').as('deleteUser')

    cy.get("tr td:nth-child(6)")       //Gets the Delete User column (6th column)
    .eq(19)                            //Get the 19th row
    .click()

    cy.wait('@deleteUser')

    cy.reload(true)

    cy.wait('@getAllUsers')
  })
})

describe('Create Spells or Items Page', () => {

  //Before each test, login and navigate to /admin/add-spells-and-items page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan5')
    cy.get('#username').should('have.value', 'dylan5')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/admin')

    cy.get('#additemspells').click()

    cy.url().should('include', 'http://localhost:4200/admin/add-spells-and-items')
  })

  it('Test Item Reset and Successfully Create Item', () => {
    cy.get('#itemname').type('Dylan')
    cy.get('#itemname').should('have.value', 'Dylan')

    cy.get('#itemdescription').type('Dylan')
    cy.get('#itemdescription').should('have.value', 'Dylan')

    cy.get('#character_dropdown_item').select(11).trigger('click')

    cy.get('#class_dropdown_item').select(9).trigger('click')

    cy.get('#itemreset').click();

    cy.get('#itemname').type('Fireball')
    cy.get('#itemname').should('have.value', 'Fireball')

    cy.get('#itemdescription').type('A fiery blast.')
    cy.get('#itemdescription').should('have.value', 'A fiery blast.')

    cy.get('#character_dropdown_item').select(11).trigger('click')

    cy.get('#class_dropdown_item').select(9).trigger('click')

    cy.get('#itemsubmit').click();
  })

  it('Test Spell Reset and Successfully Create Spell', () => {
    cy.get('#spellname').type('Dylan')
    cy.get('#spellname').should('have.value', 'Dylan')

    cy.get('#spelldescription').type('Dylan')
    cy.get('#spelldescription').should('have.value', 'Dylan')

    cy.get('#character_dropdown_spell').select(11).trigger('click')

    cy.get('#class_dropdown_spell').select(9).trigger('click')

    cy.get('#spellreset').click();

    cy.get('#spellname').type('Fireball')
    cy.get('#spellname').should('have.value', 'Fireball')

    cy.get('#spelldescription').type('A fiery blast.')
    cy.get('#spelldescription').should('have.value', 'A fiery blast.')

    cy.get('#character_dropdown_spell').select(11).trigger('click')

    cy.get('#class_dropdown_spell').select(9).trigger('click')

    cy.get('#spellsubmit').click();
  })
})

describe('Delete Spells or Items Page', () => {

  //Before each test, login and navigate to the /admin/delete-spells-and-items page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan5')
    cy.get('#username').should('have.value', 'dylan5')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/admin')

    cy.get('#removeitemspells').click()

    cy.url().should('include', 'http://localhost:4200/admin/delete-spells-and-items')
  })

  it('Successfully Edit an Item', () => {
    //CHARLENE
    //TODO - Add Test
  })

  it('Successfully Delete an Item', () => {
    //CHARLENE
    //TODO - Add Test
  })

  it('Successfully Edit a Spell', () => {
    //CHARLENE
    //TODO - Add Test
  })

  it('Successfully Delete a Spell', () => {
    //CHARLENE
    //TODO - Add Test
  })
})

//
//Both Types of Users Pages
//

describe('Classes Page', () => {
  it('Successfully navigate to Classes page from Navbar', () => { 

    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile')

    // Go to spells page
    cy.get('#classestab').click()

    cy.url().should('include', 'http://localhost:4200/classes')
  })
})

describe('Spells Page', () => {

  //Before each test, login and navigate to the /spells page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile')

    // Go to spells page
    cy.get('#spells').click()

    cy.url().should('include', 'http://localhost:4200/spells')
  })

  // Spells page renders correctly
  it('Spells Page Renders with all spells loaded', () => {
    //DYLAN
    //TODO - Finish test when backend finishes seeding data

    // Table should have all spells that were created
    //cy.get('#tabl').contains('td', 'TREE BRANCH')
  })

  it('Selecting Barbarian From Dropdown Works', () => {
    //Select Barbarian option from dropdown
    cy.get('#classes').select(3).trigger('click')

    //DYLAN
    //TODO - Add item checks once backend finishes seeding database
  })
})

describe('Items Page', () => {

  //Before each test, login and navigate to the /items page
  beforeEach(() => {
    //Login
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')
    
    cy.get('#submit').click()

    cy.url().should('include', 'http://localhost:4200/profile')

    //Go to items page via Navbar
    cy.get('#items').click()

    cy.url().should('include', 'http://localhost:4200/items')
  })
  
  it('Items page renders with all items loaded', () => {
    //DYLAN
    //TODO - Finish test when backend finishes seeding data

    // Table should have all items that were created
    //cy.get('#tabl').contains('td', 'TREE BRANCH')
  })

  it('Selecting Sorcerer From Dropdown Works', () => {
    //Select Sorcerer option from dropdown
    cy.get('#classes').select(2).trigger('click')

    //DYLAN
    //TODO - Add item checks once backend finishes seeding database
  })
})

describe('Create A New Character Page', () => {

  //Before each test, login and navigate to the /profile/create-character page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('#chars').select(1).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/create-character')
  })

  it('Successfully Creates a New Character', () => {
    // Character should be submitted properly
    cy.get('#Name').type('Aslan')
    cy.get('#Name').should('have.value', 'Aslan')

    cy.get('#Desc').type('The Lion')
    cy.get('#Desc').should('have.value', 'The Lion')

    cy.get('#character_dropdown').select(2).trigger('click')

    cy.get('#class_dropdown').select(2).trigger('click')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile/create-character')
  })
})

describe('View All Characters Page', () => {

  //Before each test, navigate to the /profile/characters page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('Toretto')
    cy.get('#username').should('have.value', 'Toretto')

    cy.get('#password').type('fastfurious')
    cy.get('#password').should('have.value', 'fastfurious')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/admin')

    cy.get('#chars').select(2).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/characters')
  })

  it('Successfully Shows All Characters', () => {
    // Table should have all characters that were created
    cy.get('#tabl').contains('td', 'Test2').should('be.visible')
    cy.get('#tabl').contains('td', 'Eustace').should('be.visible')
    cy.get('#tabl').contains('td', 'Jadis').should('be.visible')
  })

  it('Successfully Edit a Character', () => {
    //CHARLENE
    //TODO - Add Test
  })

  it('Successfully Delete a Character', () => {
    //CHARLENE
    //TODO - Add Test
  })  
})

describe('Character Spells Page', () => {

  //Before each test, login and navigate to /profile/spells page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('#chars').select(3).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/spells')
  })

  it('Successfully add a spell to a character', () => {
    cy.intercept('POST', '**/spells/get').as('getSpells')
    cy.intercept('POST', '**/characters/addspell').as('addSpell')

    cy.get('#spellChars').select('Dylan - Druid')
    cy.get('#spellChars').select('Dylan - Druid')

    cy.wait('@getSpells')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(0)                            //Get the 2nd row
    .contains('td', 'Unowned')
    .should('be.visible')

    cy.get("tr td:nth-child(5)")       //Gets the Add column (5th column)
    .eq(0)                            //Get the 2nd row
    .click()

    cy.wait('@addSpell')

    cy.reload(true)

    cy.get('#spellChars').select('Dylan - Druid')
    cy.get('#spellChars').select('Dylan - Druid')

    cy.wait('@getSpells')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(0)                            //Get the 2nd row
    .contains('td', 'Owned')
    .should('be.visible')
  })

  it('Successfully remove an item from a character', () => {
    cy.intercept('POST', '**/spells/get').as('getSpells')
    cy.intercept('DELETE', '**/characters/removespell').as('removeSpell')

    cy.get('#spellChars').select('Dylan - Druid')
    cy.get('#spellChars').select('Dylan - Druid')

    cy.wait('@getSpells')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(0)                            //Get the 2nd row
    .contains('td', 'Owned')
    .should('be.visible')

    cy.get("tr td:nth-child(6)")       //Gets the Delete column (6th column)
    .eq(0)                            //Get the 2nd row
    .click()

    cy.wait('@removeSpell')

    cy.reload(true)

    cy.get('#spellChars').select('Dylan - Druid')
    cy.get('#spellChars').select('Dylan - Druid')

    cy.wait('@getSpells')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(0)                            //Get the 2nd row
    .contains('td', 'Unowned')
    .should('be.visible')
  })  
})

describe('Character Items Page', () => {
  //Before each test, login and navigate to /profile/items page
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.get('#username').type('dylan10')
    cy.get('#username').should('have.value', 'dylan10')

    cy.get('#password').type('dylandylan')
    cy.get('#password').should('have.value', 'dylandylan')

    cy.get('#submit').click();

    cy.url().should('include', 'http://localhost:4200/profile')

    cy.get('#chars').select(4).trigger('click')

    cy.url().should('include', 'http://localhost:4200/profile/items')
  })

  it('Successfully add an item to a character', () => {
    cy.intercept('POST', '**/items/get').as('getItems')
    cy.intercept('POST', '**/characters/additem').as('addItem')

    cy.get('#itemChars').select('Dylan - Shaman')
    cy.get('#itemChars').select('Dylan - Shaman')

    cy.wait('@getItems')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(1)                            //Get the 2nd row
    .contains('td', 'Unowned')
    .should('be.visible')

    cy.get("tr td:nth-child(5)")       //Gets the Add column (5th column)
    .eq(1)                            //Get the 2nd row
    .click()

    cy.wait('@addItem')

    cy.reload(true)

    cy.get('#itemChars').select('Dylan - Shaman')
    cy.get('#itemChars').select('Dylan - Shaman')

    cy.wait('@getItems')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(1)                            //Get the 2nd row
    .contains('td', 'Owned')
    .should('be.visible')
  })

  it('Successfully remove an item from a character', () => {
    cy.intercept('POST', '**/items/get').as('getItems')
    cy.intercept('DELETE', '**/characters/removeitem').as('removeItem')

    cy.get('#itemChars').select('Dylan - Shaman')
    cy.get('#itemChars').select('Dylan - Shaman')

    cy.wait('@getItems')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(1)                            //Get the 2nd row
    .contains('td', 'Owned')
    .should('be.visible')

    cy.get("tr td:nth-child(6)")       //Gets the Delete column (6th column)
    .eq(1)                            //Get the 2nd row
    .click()

    cy.wait('@removeItem')

    cy.reload(true)

    cy.get('#itemChars').select('Dylan - Shaman')
    cy.get('#itemChars').select('Dylan - Shaman')

    cy.wait('@getItems')

    cy.get("tr td:nth-child(4)")       //Gets the Owned column (4th column)
    .eq(1)                            //Get the 2nd row
    .contains('td', 'Unowned')
    .should('be.visible')
  })  
})
