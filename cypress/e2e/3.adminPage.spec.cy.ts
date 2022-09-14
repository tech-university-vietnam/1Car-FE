/// <reference types="Cypress" />

describe('admin flow', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.fixture('/admin/admin.json').then((admin) => {
      window.localStorage.setItem('user', JSON.stringify(admin.data));
    });
    cy.visit('/admin');
  });
  describe('user management test', () => {
    before(() => {
      cy.intercept('user', { fixture: 'admin/userforadmin.json' });
      cy.get('div')
        .contains(/User Management/i)
        .click();
    });
    it('change normal user to admin', () => {
      cy.get('button')
        .contains(/To admin/i)
        .click();
      cy.intercept('PATCH', 'user/*/admin', (req) => {
        expect(req.body).to.have.property('userRole', 'ADMIN');
        req.reply({
          id: '695dc83a-90b4-4ab3-9ee9-e670b259fb53',
          name: 'hihi10',
          email: 'hihi10@gmail.com',
          userRole: 'ADMIN',
          phoneNumber: null,
          dateOfBirth: null,
          isDeleted: false,
          createdAt: '2022-09-14T02:13:48.300Z',
          updatedAt: '2022-09-14T02:13:48.300Z',
        });
      });
      cy.get('button').contains('Yes').click();
    });
    it('delete user', () => {
      cy.intercept(
        'DELETE',
        'user/*',
        cy.spy((req) => req.reply({})).as('deleteUser')
      );
      cy.get('[data-cy="delete"]').eq(0).click();
      cy.get('button').contains(/Yes/i).click();
      cy.get('@deleteUser').should('have.been.called');
    });
    it('change user info', () => {
      cy.intercept('PATCH', '*', cy.spy((req) => req.reply({})).as('editUser'));
      cy.get('[data-cy="edit"]').eq(0).click();
      const sendButton = cy.get('div').contains(/send/i);
      sendButton.should('be.disabled');
      cy.get('input#phoneNumber').type('0912345678');
      cy.get('input#dateOfBirth').click().type('2000-01-01');
      cy.get('input#accept').click();
      sendButton.click();
      cy.get('@editUser').should('have.been.called');
    });
    it('view user info', () => {});
  });
});
