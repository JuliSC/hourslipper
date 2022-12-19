// https://docs.cypress.io/api/introduction/api.html

describe("Router", () => {
  it("redirects to / on unimplemented routes", () => {
    cy.visit("/79643qfgviaos7udyfvcq39476cv97THISISNOTAVALIDROUTEasdfasdfadsf");
    cy.url().should("include", "/");
  });
});
