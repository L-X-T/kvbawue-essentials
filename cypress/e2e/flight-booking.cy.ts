describe('Flight Search', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should verify that flight search is showing cards', () => {
    cy.contains('a', 'Flights').click();

    cy.get('.title').contains('Flight Search');
    cy.get('.btn:first-child').contains('Search');

    cy.get('input[name=from]').clear().type('Hamburg');
    cy.get('input[name=to]').clear().type('Graz');
    cy.get('form .btn:first-child').should(($button) => {
      expect($button).to.not.have.attr('disabled', 'disabled');
    });

    cy.get('form .btn:first-child').click();
    cy.get('app-flight-card').its('length').should('be.gte', 3);
  });
});
