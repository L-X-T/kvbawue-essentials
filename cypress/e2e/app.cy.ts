describe('App', () => {
  it('should do a sanity check', () => {
    cy.visit('');
  });

  it('should check the h1', () => {
    cy.visit('');
    cy.get('h1').contains('Hello World!');
  });
});
