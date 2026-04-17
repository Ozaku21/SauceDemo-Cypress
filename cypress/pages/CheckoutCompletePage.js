class CheckoutCompletePage {
  confirmationHeader = () => cy.get('[data-test="complete-header"]');
  backHomeButton = () => cy.get('[data-test="back-to-products"]');

  backHome() {
    this.backHomeButton().click();
  }
}

export default CheckoutCompletePage;
