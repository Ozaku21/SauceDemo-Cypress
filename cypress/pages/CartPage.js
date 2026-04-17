class CartPage {
  cartBadge = () => cy.get('[data-test="shopping-cart-badge"]');
  cartLink = () => cy.get('[data-test="shopping-cart-link"]');
  checkoutButton = () => cy.get('[data-test="checkout"]');
  inventoryItemNames = () => cy.get('[data-test="inventory-item-name"]');

  addToCart(productKey) {
    cy.get(`[data-test="add-to-cart-${productKey}"]`).click();
  }

  removeFromCart(productKey) {
    cy.get(`[data-test="remove-${productKey}"]`).click();
  }

  goToCart() {
    this.cartLink().click();
  }

  proceedToCheckout() {
    this.checkoutButton().click();
  }
}

export default CartPage;
