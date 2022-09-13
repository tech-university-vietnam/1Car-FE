/* eslint-disable jest/valid-expect */
/// <reference types="Cypress" />

import { interceptHomePage } from '../utils/intercepts';

describe('car booking flow', () => {
  before(() => {
    cy.visit('/');
    interceptHomePage().as('getAllCars');
  });
  it('goes to car detail', () => {
    // cy.wait('@getAllCars');
    cy.get('button').contains('Rent now').click();
  });
  it('enter start and end date', () => {
    cy.clock(new Date('2022-01-01').getTime());
    cy.get('input[placeholder*="From"]').click().type('2022-01-01{enter}');
    cy.get('input[placeholder*="To"]').click().type('2022-01-10{enter}');
  });
  it('calculates rent price', () => {
    cy.get('div').contains('$9,000').should('exist');
  });
  it('clicks rent now', () => {
    cy.get('button').contains('Rent now').click();
  });
  it('should have insurance options', () => {
    cy.get('div').contains('Life').should('exist');
  });
  it('should have disabled date pickers', () => {
    cy.get('.ant-picker')
      .find('input')
      .should('have.value', '2022-01-01')
      .should('be.disabled');
    cy.get('.ant-picker')
      .eq(1)
      .find('input')
      .should('have.value', '2022-01-10')
      .should('be.disabled');
  });
  it('should have order total', () => {
    cy.get('div').contains('$9,000').should('exist');
  });
  it('should send createBooking request', () => {
    cy.intercept('POST', 'payment/checkout', (req) => {
      expect(req.body).to.deep.equal({
        carId: '2c18e799-b079-414d-a330-e6c5704f4529',
        pickUpLocationId: '47964507-b206-4afd-b874-e9ba1bf6a944',
        receivedDateTime: '2022-01-01T00:00:00.000Z',
        returnDateTime: '2022-01-10T00:00:00.000Z',
      });
      req.reply('/');
    });
    cy.get('button').contains('Next').click();
    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
  });
});
