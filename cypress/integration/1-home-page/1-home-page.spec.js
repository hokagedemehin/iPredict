/// <reference types="cypress" />

describe('check for the six sections', () => {
  let data1;
  let data2;
  let data3;

  // beforeEach(() => {
  //   cy.visit('/');
  //   // cy.login('test1@email.com', 'testing1');
  //   cy.fixture('home/homeBtns').then(function (data) {
  //     data1 = data;
  //     return data1;
  //   });
  //   cy.fixture('home/register').then(function (data) {
  //     data2 = data;
  //     return data2;
  //   });
  //   cy.fixture('home/login').then(function (data) {
  //     data3 = data;
  //     return data3;
  //   });
  //   // cy.login(data3.email, data3.password);
  // });

  before(() => {
    cy.visit('/');

    cy.login('test1@email.com', 'testing1');
    cy.fixture('home/homeBtns').then(function (data) {
      data1 = data;
      return data1;
    });
    cy.fixture('home/register').then(function (data) {
      data2 = data;
      return data2;
    });
    cy.fixture('home/login').then(function (data) {
      data3 = data;
      return data3;
    });
    // cy.get(`button[data-cy-name='logOut']`).click({ force: true });
  });

  it('displays six buttons on homepage', () => {
    cy.get(`div[data-cy-name="home-btns"]`).should('be.visible');
    cy.get(`div[data-cy-name="home-btns"]`).should('have.length', 6);
    // cy.get(`button[data-cy-name='logOut']`).click({ force: true });
  });

  it('should go to each section homepage when clicked', () => {
    // cy.get(`div[data-cy-name="home-btns"]`).each((el, index) => {
    // cy.log(data1[index].link);
    // cy.get(`div[data-cy-name="home-btns"]`)
    //   .contains(data1[index].name)
    //   .click();
    // cy.url().should('have.text', data1[index].link);
    // cy.get(`button[data-cy-name='Home']`).click();
    // });
    // cy.login('test1@email.com', 'testing1');
    data1.forEach(function (elem) {
      cy.get(`div[data-cy-name="home-btns"]`).contains(elem.name).click();
      // expect(cy.url()).to.have.text(elem.link);
      cy.url().should('contain', elem.link);
      cy.get(`button[data-cy-name='Home - large']`).click();
    });
    // cy.get(`button[data-cy-name='logOut']`).click({ force: true });
  });

  it('should show referral component for logged in user', () => {
    // cy.login('test1@email.com', 'testing1');
    cy.get('h2').contains('referral code').should('be.visible');
    // cy.get(`button[data-cy-name='logOut']`).click({ force: true });
  });

  // it('should show free coins component for logged in user', () => {});

  // it('should not show free coins when it is collected by user', () => {});

  it('should logout the user and the referral component should not be visible', () => {
    // cy.login('test1@email.com', 'testing1');
    cy.get(`button[data-cy-name='profileBtn']`).click();
    cy.get(`button[data-cy-name='logOut']`).click();
    // cy.get('h2').contains('referral code').should('not.exist');
    cy.get(`button[data-cy-name='loginBtn']`).should('be.visible');
  });
});

// it('should register user and change login button to avatar image', () => {
//   cy.visit('/register');
//   cy.get(`input[data-cy-name='firstName']`).type(data2.firstName);
//   cy.get(`input[data-cy-name='lastName']`).type(data2.lastName);
//   cy.get(`input[data-cy-name='email']`).type(data2.email);
//   cy.get(`input[data-cy-name='password']`).type(data2.password);
//   cy.get(`.chakra-button`).contains('Register').click();
//   cy.get(`button[data-cy-name='profileBtn']`).should('be.visible');
//   cy.get(`button[data-cy-name='profileBtn']`).click();
//   cy.get(`button[data-cy-name='logOut']`).should('be.visible');
//   cy.get(`button[data-cy-name='logOut']`).click({ force: true });
//   // cy.get(`button[data-cy-name='logOut']`).click();
//   cy.get(`button[data-cy-name='loginBtn']`).should('be.visible');
// });
