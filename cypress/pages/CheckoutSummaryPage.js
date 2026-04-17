class CheckoutSummaryPage {
  itemName = () => cy.get('[data-test="inventory-item-name"]');
  itemPrice = () => cy.get('[data-test="inventory-item-price"]');
  paymentInfo = () => cy.get('[data-test="payment-info-value"]');
  shippingInfo = () => cy.get('[data-test="shipping-info-value"]');
  subtotalLabel = () => cy.get('[data-test="subtotal-label"]');
  taxLabel = () => cy.get('[data-test="tax-label"]');
  totalLabel = () => cy.get('[data-test="total-label"]');
  finishButton = () => cy.get('[data-test="finish"]');

  finish() {
    this.finishButton().click();
  }
}

export default CheckoutSummaryPage;
