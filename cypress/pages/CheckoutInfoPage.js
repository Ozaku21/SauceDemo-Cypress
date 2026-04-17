class CheckoutInfoPage {
  firstNameInput = () => cy.get('[data-test="firstName"]');
  lastNameInput = () => cy.get('[data-test="lastName"]');
  postalCodeInput = () => cy.get('[data-test="postalCode"]');
  continueButton = () => cy.get('[data-test="continue"]');

  fillInfo(firstName, lastName, postalCode) {
    this.firstNameInput().type(firstName);
    this.lastNameInput().type(lastName);
    this.postalCodeInput().type(postalCode);
    this.continueButton().click();
  }
}

export default CheckoutInfoPage;
