describe("End-to-End Checkout Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("completes full order flow and confirms order", () => {
    // Add product to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    // Verify we're on cart page and proceed
    cy.url().should("include", "/cart");
    cy.get('[data-test="checkout"]').click();

    // Fill out checkout info
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("firstName");
    cy.get('[data-test="lastName"]').type("lastName");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();

    // Verify order summary page
    cy.url().should("include", "/checkout-step-two");
    cy.get('[data-test="finish"]').click();

    // Verify confirmation
    cy.url().should("include", "/checkout-complete");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!",
    );
  });
});
