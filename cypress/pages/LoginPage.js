class LoginPage {
  usernameInput = () => cy.get('[data-test="username"]');
  passwordInput = () => cy.get('[data-test="password"]');
  loginButton = () => cy.get('[data-test="login-button"]');
  errorMessage = () => cy.get('[data-test="error"]');
  loginCredentials = () => cy.get("#login_credentials");
  loginPassword = () => cy.get('[data-test="login-password"]');

  visit() {
    cy.visit("/");
  }

  login(username, password) {
    this.usernameInput().type(username);
    this.passwordInput().type(password);
    this.loginButton().click();
  }
}

export default LoginPage;
