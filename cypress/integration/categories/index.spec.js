/* eslint-disable no-undef */
/// <reference types="cypress" />
import { CookieNames } from '../../../ts-types/enums';

describe('The Sidebar', () => {
  beforeEach(function () {
    cy.visit('/');
    const email = 'larbi@gmail.com';
    const password = '1905';
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`);
    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard');
    // our auth cookie should be present
    cy.getCookie(CookieNames.STAFF_TOKEN_NAME).should('exist');
  });

  it('sidebar routes', function () {
    cy.get('aside').contains('Categories').click({ force: true });
    cy.url().should('include', '/categories');
  });
});
