// https://docs.cypress.io/api/introduction/api.html

describe("Entries", () => {
  it("user can log in and fetch entries", () => {
    cy.visit("/login");
    cy.get('[data-cy="email-input"]').type("test@test.test");
    cy.get('[data-cy="password-input"]').type("Password!234");
    cy.get('[data-cy="login-button"]').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });

    cy.get('[data-cy="fetch-entries-button"]').click();
    cy.get('[data-cy="entry-1"]').should("exist");
  });
});
