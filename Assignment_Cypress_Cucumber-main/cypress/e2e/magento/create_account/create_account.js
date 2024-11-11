import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Helper function to generate a unique string
const generateUniqueString = () => {
    const timestamp = new Date().getTime();
    return `user${timestamp}`; // Generates a unique string based on timestamp
};

// Helper function to generate a unique email
const generateUniqueEmail = () => {
    return `${generateUniqueString()}@example.com`; // Generates an email like user1673058891234@example.com
};

// Helper function to generate a unique first name
const generateFirstName = () => {
    return `FirstName${generateUniqueString()}`; // Generates a name like FirstName1673058891234
};

// Helper function to generate a unique last name
const generateLastName = () => {
    return `LastName${generateUniqueString()}`; // Generates a name like LastName1673058891234
};

// Helper function to generate a random password
const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 12; i++) { // Length of 12 characters for example
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
};


Given('I am on the account creation page', () => {
    cy.visit('https://magento.softwaretestingboard.com/'); 
});

When('I click on the "Create an Account" link', () => {
    cy.contains('a', 'Create an Account').click(); 
});

Then('I should be redirected to the account creation page', () => {
    cy.url().should('include', '/customer/account/create'); 
});

Then('I should see the "Create New Customer Account" text on the page', () => {
    cy.contains('span', 'Create New Customer Account').should('be.visible'); 
});

When('I submit the form without entering any details', () => {
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click(); // Submit the form
});

Then('I should see an error message "This is a required field." for all required fields', () => {
  const errorMessage = 'This is a required field.';

    // Verify error message for each required field
    cy.get('input[name="firstname"]')
    .siblings('div.mage-error') 
    .should('contain.text', errorMessage);

  cy.get('input[name="lastname"]')
    .siblings('div.mage-error') 
    .should('contain.text', errorMessage);

  cy.get('input[name="email"]')
    .siblings('div.mage-error') 
    .should('contain.text', errorMessage);

  cy.get('input[name="password"]')
    .siblings('div.mage-error') 
    .should('contain.text', errorMessage);

  cy.get('input[name="password_confirmation"]')
    .siblings('div.mage-error') 
    .should('contain.text', errorMessage);
});

When('I enter valid details for the first name, last name, email, password, and confirm password', () => {
    const firstName = generateFirstName();
    const lastName = generateLastName();
    const email = generateUniqueEmail();
    const password = generatePassword();

    cy.get('input[name="firstname"]').type(firstName);
    cy.get('input[name="lastname"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input#password').type(password);
    cy.get('input[name="password_confirmation"]').type(password);

    // Store the generated details in the Cypress context for later use
    cy.wrap({ firstName, lastName, email, password }).as('userDetails');
});

When('I submit the form', () => {
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
});

Then('I should see a success message saying "Thank you for registering with Main Website Store."', () => {
    cy.get('div.messages > div.message-success') 
      .should('contain.text', 'Thank you for registering with Main Website Store.');
  });


Then('I should see the correct first name, last name, and email address on the account page', function () {
    // Retrieve the stored user details
    cy.get('@userDetails').then(userDetails => {
        const { firstName, lastName, email } = userDetails;
    
    // Verify that the first name, last name, and email address are displayed correctly
    cy.get('div.box-content > p')
      .should('contain.text', `${firstName} ${lastName}`)
      .and('contain.text', email);    
    });
});