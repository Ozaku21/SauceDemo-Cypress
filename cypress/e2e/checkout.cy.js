describe("End-to-End Checkout Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("completes full order flow and confirms order", () => {
    // Add product to cart and verify badge
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    // Navigate to cart and verify item is there
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      "Sauce Labs Backpack",
    );

    // Proceed to checkout
    cy.get('[data-test="checkout"]').click();

    // Fill out checkout info
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("firstName");
    cy.get('[data-test="lastName"]').type("lastName");
    cy.get('[data-test="postalCode"]').type("1234");
    cy.get('[data-test="continue"]').click();

    // Verify order summary
    cy.url().should("include", "/checkout-step-two");
    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      "Sauce Labs Backpack",
    );

    // Grab price from UI and assert subtotal matches
    cy.get('[data-test="inventory-item-price"]')
      .invoke("text")
      .then((priceText) => {
        const price = parseFloat(priceText.replace("$", ""));
        const expectedTax = parseFloat((price * 0.08).toFixed(2));
        const expectedTotal = parseFloat((price + expectedTax).toFixed(2));

        cy.get('[data-test="subtotal-label"]').should(
          "have.text",
          `Item total: $${price.toFixed(2)}`,
        );
        cy.get('[data-test="tax-label"]').should(
          "have.text",
          `Tax: $${expectedTax.toFixed(2)}`,
        );
        cy.get('[data-test="total-label"]').should(
          "have.text",
          `Total: $${expectedTotal.toFixed(2)}`,
        );
      });

    // Just visible for payment and shipping since values could change
    cy.get('[data-test="payment-info-value"]').should("be.visible");
    cy.get('[data-test="shipping-info-value"]').should("be.visible");

    // Finish order
    cy.get('[data-test="finish"]').click();

    // Verify confirmation message
    cy.url().should("include", "/checkout-complete");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!",
    );

    // Go back home and verify
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("include", "/inventory");
  });
});
