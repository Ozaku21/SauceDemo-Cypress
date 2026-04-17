describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory");
  });

  it("shows error with wrong password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("wrong_password");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("shows error for locked out user", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out");
  });

  it("shows error when password is empty", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Password is required");
  });

  it("shows error when username is empty", () => {
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username is required");
  });
});
