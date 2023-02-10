/* eslint-disable jest/expect-expect */

describe('ForgotPassword', () => {
  it('displays form by default', () => {
    cy.visit('/#/forgot-password');

    cy.get('p.MuiTypography-root.MuiTypography-body1.title')
      .first()
      .should('have.text', 'Forgot your password?');

    cy.get('p.MuiTypography-root.MuiTypography-body1.sub_title')
      .first()
      .should(
        'have.text',
        'Enter the email associated with your account and we will send you an email with instructions to reset your password',
      );
  });
});
