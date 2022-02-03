/// <reference types="cypress" />

describe('check for the six sections', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('displays six buttons on homepage', () => {
    cy.get(`div[data-cy-name="home"]`).should('be.visible');
    cy.get(`div[data-cy-name="home"]`).should('have.length', 6);
  });
  it('should go to each section homepage when clicked', () => {});
  it('should register user and change login button to avatar image', () => {});
  it('should login user and change the login button to avater image', () => {});
  it('should show referral component for logged in user', () => {});
  it('should show free coins component for logged in user', () => {});
  it('should not show free coins when it is collected by user', () => {});
  it('should logout the user and the referral component should not be visible', () => {});
});
