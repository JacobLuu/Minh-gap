/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
const API_ENDPOINT = Cypress.env('api_endpoint');

describe('ForgotPassword', () => {
  it('Verify when user input unregistered email', () => {
    cy.visit('#/forgot-password');

    cy.get('input[name="email"]').type('test234@exmple.com');

    cy.intercept('POST', `${API_ENDPOINT}/auth/forgot-password`, {
      statusCode: 404,
      fixture: 'forgot-password-fail-notfound.json',
    }).as('forgotPassword');

    cy.getBySel('btn-submit').first().click();

    cy.wait('@forgotPassword');

    const success_message = cy.getBySel('text-error-message');
    success_message.should(($item) => {
      expect($item).to.have.text('The email have not registered before');
    });
  });

  it('Success', () => {
    cy.visit('#/forgot-password');

    cy.get('input[name="email"]').type('test234@exmple.com');

    cy.intercept('POST', `${API_ENDPOINT}/auth/forgot-password`, {
      statusCode: 200,
      fixture: 'forgot-password-success.json',
    }).as('forgotPassword');

    cy.getBySel('btn-submit').first().click();

    cy.wait('@forgotPassword');

    const success_message = cy.getBySel('forgot-password-success');
    success_message.should(($item) => {
      expect($item).to.have.text('You have successfully reset your password');
    });
  });
});
