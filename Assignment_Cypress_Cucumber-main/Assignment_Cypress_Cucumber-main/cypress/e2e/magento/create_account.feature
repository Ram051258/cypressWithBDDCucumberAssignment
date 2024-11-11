Feature: Account Creation and Verification

  Scenario: User successfully creates an account and verifies account details
    Given I am on the account creation page
    When I click on the "Create an Account" link
    Then I should be redirected to the account creation page
    And I should see the "Create New Customer Account" text on the page
    When I submit the form without entering any details
    Then I should see an error message "This is a required field." for all required fields
    When I enter valid details for the first name, last name, email, password, and confirm password
    And I submit the form
    Then I should see a success message saying "Thank you for registering with Main Website Store."
    And I should see the correct first name, last name, and email address on the account page
