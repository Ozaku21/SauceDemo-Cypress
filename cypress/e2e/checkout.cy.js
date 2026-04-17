import CartPage from "../pages/CartPage";
import CheckoutInfoPage from "../pages/CheckoutInfoPage";
import CheckoutSummaryPage from "../pages/CheckoutSummaryPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";

const cartPage = new CartPage();
const checkoutInfoPage = new CheckoutInfoPage();
const checkoutSummaryPage = new CheckoutSummaryPage();
const checkoutCompletePage = new CheckoutCompletePage();

let user;
let products;

describe("End-to-End Checkout Flow", () => {
  before(() => {
    cy.fixture("checkoutUser").then((data) => {
      user = data;
    });
    cy.fixture("products").then((data) => {
      products = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("completes full order flow and confirms order", () => {
    cartPage.addToCart(products.backpack.key);
    cartPage.cartBadge().should("have.text", "1");

    cartPage.goToCart();
    cy.url().should("include", "/cart");
    cartPage.inventoryItemNames().should("have.text", products.backpack.name);

    cartPage.proceedToCheckout();
    cy.url().should("include", "/checkout-step-one");

    checkoutInfoPage.fillInfo(user.firstName, user.lastName, user.postalCode);
    cy.url().should("include", "/checkout-step-two");

    checkoutSummaryPage.itemName().should("have.text", products.backpack.name);
    checkoutSummaryPage
      .itemPrice()
      .invoke("text")
      .then((priceText) => {
        const price = parseFloat(priceText.replace("$", ""));
        const expectedTax = parseFloat((price * 0.08).toFixed(2));
        const expectedTotal = parseFloat((price + expectedTax).toFixed(2));

        checkoutSummaryPage
          .subtotalLabel()
          .should("have.text", `Item total: $${price.toFixed(2)}`);
        checkoutSummaryPage
          .taxLabel()
          .should("have.text", `Tax: $${expectedTax.toFixed(2)}`);
        checkoutSummaryPage
          .totalLabel()
          .should("have.text", `Total: $${expectedTotal.toFixed(2)}`);
      });

    checkoutSummaryPage.paymentInfo().should("be.visible");
    checkoutSummaryPage.shippingInfo().should("be.visible");

    checkoutSummaryPage.finish();
    cy.url().should("include", "/checkout-complete");

    checkoutCompletePage
      .confirmationHeader()
      .should("have.text", "Thank you for your order!");
    checkoutCompletePage.backHome();
    cy.url().should("include", "/inventory");
  });
});
