/// <reference types="Cypress" />

import {
  getAllAttributes,
  getAllCars,
  getCarAttribute,
  getCarImage,
} from '../utils/intercepts';
import { preTestSetup } from '../utils/utils';

beforeEach(() => {
  preTestSetup();
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

describe('user can login', () => {});

describe('user can sort by price', () => {});

describe('user can filter', () => {
  it('filters by brand', () => {});
});
