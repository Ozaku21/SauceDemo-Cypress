Cypress.Commands.add("login", () => {
  let standard, password;

  cy.get("#login_credentials")
    .invoke("html")
    .then((html) => {
      const users = html
        .replace(/<h4>.*?<\/h4>/, "")
        .split("<br>")
        .map((u) => u.trim())
        .filter(Boolean);
      standard = users[0];
    });

  cy.get('[data-test="login-password"]')
    .invoke("html")
    .then((html) => {
      const lines = html
        .replace(/<h4>.*?<\/h4>/, "")
        .split("<br>")
        .map((l) => l.trim())
        .filter(Boolean);
      password = lines[0];
    });

  cy.then(() => {
    cy.get('[data-test="username"]').type(standard);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
});
