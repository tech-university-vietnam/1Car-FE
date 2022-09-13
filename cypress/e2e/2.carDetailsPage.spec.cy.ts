/* eslint-disable testing-library/await-async-utils */
/// <reference types="Cypress" />

import {
  getAllAttributes,
  getAllCars,
  getCarAttribute,
  getCarImage,
  interceptHomePage,
} from '../utils/intercepts';

describe('car booking flow', () => {
  before(() => {
    cy.clock(new Date('2022-01-01').getTime());
    cy.intercept('/car/*', { fixture: 'details/car_details.json' });
    cy.intercept('/car/*/attributes', {
      fixture: 'details/car_attributes.json',
    });
    getCarAttribute();
    getAllAttributes();
    getAllCars().as('getAllCars');
    getCarImage();
    cy.visit('/');
  });
  it('goes to car detail', () => {
    cy.wait('@getAllCars');
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
    cy.intercept('user/me', { fixture: 'user/me.json' });
    cy.get('button').contains('Rent now').click();
  });
  it('should have insurance options', () => {
    cy.get('div').contains('Life').should('exist');
  });
  it('should have disabled date pickers', () => {
    cy.get('.ant-picker')
      .find('input')
      .should('have.value', '01/01/2022')
      .should('be.disabled');
  });
  it('should have order total', () => {
    cy.get('div').contains('$9,000').should('exist');
  });
  it('agrees to T&C', () => {
    cy.get('div').contains('Agree to').find('input[type="checkbox"]').click();
  });
  it('should send createBooking request', () => {
    cy.intercept('POST', 'payment/checkout', (req) => {
      expect(req.body).to.deep.equal({
        carId: '2c18e799-b079-414d-a330-e6c5704f4529',
        pickUpLocationId: '',
        receivedDateTime: '2021-12-31T17:00:00.000Z',
        returnDateTime: '2022-01-09T17:00:00.000Z',
      });
      req.reply('test-sucess');
    });
    cy.intercept('test-sucess', (req) => req.reply('Test success'));
    cy.get('button').contains('Next').click();
  });
});
