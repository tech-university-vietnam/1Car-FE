/// <reference types="Cypress" />

import {
  getAllAttributes,
  getAllCars,
  getCarAttribute,
  getCarImage,
} from '../utils/intercepts';

beforeEach(() => {
  cy.clock(new Date('2022-01-01').getTime());
  getCarAttribute();
  getAllAttributes();
  getAllCars().as('getAllCars');
  getCarImage();
  cy.visit('/');
});
describe('user can search for cars by start and end date', () => {
  it('search for car in date range', () => {
    cy.get('input[placeholder*="From"]').click().type('2022-01-01{enter}');

    cy.get('input[placeholder*="To"]').click().type('2022-01-04{enter}');

    cy.get('button').contains('Search').click();

    cy.get('div').contains('Tesla').should('exist');
    cy.get('img[alt="demo car"]').should('exist');
  });
});

// describe('user can login', () => {
//   it('clicks login', () => {
//     // cy.get('button').contains('Sign in').click();
//     expect(false).to.be.true;
//   });
// });

// describe('user can sort by price', () => {
//   expect(false).to.be.true;
// });

describe('user can filter', () => {
  it('filters by brand', () => {
    // cy.wait('@getAllCars');
    // cy.get('div').contains('brand').parent().click();
    // cy.get('div').contains('Cheapo').parent().find('input').click();
  });
});

describe('pagination', () => {
  it('sends a request with pagination', () => {
    cy.get('.ant-pagination').children().eq(2).click();
  });
});
