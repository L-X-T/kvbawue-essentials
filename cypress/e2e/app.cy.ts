describe('App', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should do a sanity check', () => {});

  it('should check the h1', () => {
    cy.get('h1').contains('Hello World!');
  });

  it('should have UTF-8 as charset', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('should do an implicit subject assertion', () => {
    cy.get('.sidebar-wrapper ul.nav > li:last-child > a > p').should('contain.text', 'Hide Basket');
  });

  it('should count the nav entries', () => {
    cy.get('.sidebar-wrapper ul.nav li').its('length').should('be.gte', 3);
  });

  it('should do explicit subject assertions', () => {
    cy.get('.sidebar-wrapper ul.nav li:nth-child(2) a').should(($a) => {
      expect($a).to.contain.text('Flights');
      expect($a).to.have.attr('href', '/flight-booking/flight-search');
    });
  });
});
