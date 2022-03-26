/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('sets auth cookie when logging in via form submission', function () {
    const email = 'larbi@gmail.com';
    const password = '1905';
    console.log('username, password');

    cy.visit('/login');

    cy.get('input[name=email]').type(email);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard');

    // our auth cookie should be present
    cy.getCookie('ECOMHOST_STAFF_TOKEN').should('exist');
  });
});
