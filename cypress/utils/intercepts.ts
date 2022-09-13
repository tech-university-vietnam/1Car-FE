/// <reference types="Cypress" />

export function getAllCars() {
  return cy.intercept('GET', 'car?*', {
    fixture: 'homepage/all_cars',
  });
}

export function getAllAttributes() {
  return cy.intercept('GET', 'car/attribute/type', {
    fixture: 'homepage/car_attribute_types',
  });
}

export function getCarAttribute() {
  return cy.intercept('GET', 'car/attribute', {
    fixture: 'homepage/car_attributes',
  });
}

export function getCarImage() {
  return cy.intercept('GET', 'images/*', (req) => {
    const imageName = req.url.split('/').at(-1);
    req.reply({ fixture: `public/${imageName}` });
  });
}

export function login() {
  return cy.intercept('POST', 'authorize/*', (req) => {
    req.reply();
  });
}

export function interceptHomePage() {
  getAllAttributes();
  getCarAttribute();
  getCarImage();
  return getAllCars();
}
