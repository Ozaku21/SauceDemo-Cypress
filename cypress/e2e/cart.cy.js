describe("Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("adds a product to cart and checks badge count", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");
  });

  it("adds 3 products, removes 1 from cart and checks remaining items", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "3");

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    cy.get('[data-test="inventory-item-name"]')
      .should("have.length", 2)
      .and("contain", "Sauce Labs Bike Light")
      .and("contain", "Sauce Labs Bolt T-Shirt");
  });
});
