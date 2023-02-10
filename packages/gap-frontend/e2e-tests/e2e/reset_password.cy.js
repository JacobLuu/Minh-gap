/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
const API_ENDPOINT = Cypress.env('api_endpoint');

describe('ResetPassword', () => {
  it('Redirect to login screen when token not found', () => {
    cy.visit('#/forgot-password');

    cy.location('hash').should('eq', '#/forgot-password');
  });

  it('Successfully reset password', () => {
    cy.visit('#/reset-password?token=testTokenHere');

    cy.intercept('POST', `${API_ENDPOINT}/auth/verify-token`, {
      statusCode: 200,
      body: {
        message: ['Token valid'],
        status: 'success',
      },
    }).as('verifyToken');
    cy.wait('@verifyToken');

    cy.get('input[name="password"]').type('Test@123');
    cy.get('input[name="repeatPassword"]').type('Test@123');
    cy.getBySel('btn-submit').first().click({ force: true });

    cy.intercept('POST', `${API_ENDPOINT}/auth/reset-password`, {
      statusCode: 200,
      body: {
        message: ['Reset password success'],
        status: 'success',
      },
    }).as('resetPassword');

    cy.wait('@resetPassword');

    const success_message = cy.getBySel('reset-password-success');
    success_message.should(($item) => {
      expect($item).to.have.text('You have successfully reset your password');
    });
  });
});
