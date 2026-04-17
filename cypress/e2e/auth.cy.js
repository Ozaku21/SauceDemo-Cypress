import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();
let standardUser, lockedUser, password;

describe("Authentication", () => {
  before(() => {
    loginPage.visit();

    loginPage
      .loginCredentials()
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

    loginPage
      .loginPassword()
      .invoke("html")
      .then((html) => {
        const lines = html
          .replace(/<h4>.*?<\/h4>/, "")
          .split("<br>")
          .map((l) => l.trim())
          .filter(Boolean);
        password = lines[0];
      });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("logs in successfully with valid credentials", () => {
    loginPage.login(standardUser, password);
    cy.url().should("include", "/inventory");
  });

  it("shows error with wrong password", () => {
    loginPage.login(standardUser, password + "1");
    loginPage
      .errorMessage()
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("shows error for locked out user", () => {
    loginPage.login(lockedUser, password);
    loginPage
      .errorMessage()
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out");
  });

  it("shows error when password is empty", () => {
    loginPage.usernameInput().type(standardUser);
    loginPage.loginButton().click();
    loginPage
      .errorMessage()
      .should("be.visible")
      .and("contain", "Password is required");
  });

  it("shows error when username is empty", () => {
    loginPage.passwordInput().type(password);
    loginPage.loginButton().click();
    loginPage
      .errorMessage()
      .should("be.visible")
      .and("contain", "Username is required");
  });
});
