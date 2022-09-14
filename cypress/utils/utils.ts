import { getCarAttribute, getAllAttributes, getCarImage } from './intercepts';

/**
 * Sets the clock, add intercepts for homepage api calls
 */
export function preTestSetup() {
  cy.clock(new Date('2022-01-01').getTime());
  cy.intercept('/car/*', { fixture: 'details/car_details.json' });
  cy.intercept('/car/*/attributes', {
    fixture: 'details/car_attributes.json',
  });
  getCarAttribute();
  getAllAttributes();
  getCarImage();
}
