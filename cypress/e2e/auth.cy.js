let standardUser, lockedUser, password;

describe("Authentication", () => {
  before(() => {
    cy.visit("/");

    cy.get("#login_credentials")
      .invoke("html")
      .then((html) => {
        const users = html
          .replace(/<h4>.*?<\/h4>/, "")
          .split("<br>")
          .map((u) => u.trim())
          .filter(Boolean);
        standardUser = users[0];
        lockedUser = users[1];
      });

    cy.get('[data-test="login-password"]')
      .invoke("text")
      .then((text) => {
        const lines = text
          .replace("Password for all users:", "")
          .trim()
          .split(/\s+/)
          .filter(Boolean);
        password = lines[0];
      });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('[data-test="username"]').type(standardUser);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory");
  });

  it("shows error with wrong password", () => {
    cy.get('[data-test="username"]').type(standardUser);
    cy.get('[data-test="password"]').type(password + "1");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("shows error for locked out user", () => {
    cy.get('[data-test="username"]').type(lockedUser);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out");
  });

  it("shows error when password is empty", () => {
    cy.get('[data-test="username"]').type(standardUser);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Password is required");
  });

  it("shows error when username is empty", () => {
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username is required");
  });
});
