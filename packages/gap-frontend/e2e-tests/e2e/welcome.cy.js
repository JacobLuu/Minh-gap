/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */

describe('Welcome', () => {
  it('Get start button should be enabled when select language', () => {
    cy.visit('#/welcome');

    cy.location('hash').should('eq', '#/welcome');
    cy.get('[id=select-language]').parent().click();
    cy.findByRole('option', {
      name: /English/i,
    }).click();
    cy.get('a[data-test="get-started"]').click();
    cy.location('hash').should('eq', '#/login');
  });
});
