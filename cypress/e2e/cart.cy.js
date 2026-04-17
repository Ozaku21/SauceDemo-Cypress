import CartPage from "../pages/CartPage";

const cartPage = new CartPage();
let products;

describe("Cart", () => {
  before(() => {
    cy.fixture("products").then((data) => {
      products = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("adds a product to cart and checks badge count", () => {
    cartPage.addToCart(products.backpack.key);
    cartPage.cartBadge().should("have.text", "1");
  });

  it("adds 3 products, removes 1 from cart and checks remaining items", () => {
    cartPage.addToCart(products.backpack.key);
    cartPage.addToCart(products.bikeLight.key);
    cartPage.addToCart(products.boltTShirt.key);
    cartPage.cartBadge().should("have.text", "3");

    cartPage.goToCart();
    cy.url().should("include", "/cart");

    cartPage.removeFromCart(products.backpack.key);
    cartPage.cartBadge().should("have.text", "2");

    cartPage
      .inventoryItemNames()
      .should("have.length", 2)
      .and("contain", products.bikeLight.name)
      .and("contain", products.boltTShirt.name);
  });
});
