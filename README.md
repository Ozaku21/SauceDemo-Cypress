# SauceDemo Cypress Test Suite

Automated end-to-end test suite for [saucedemo.com](https://www.saucedemo.com) built with Cypress.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/Ozaku21/SauceDemo-Cypress>
cd saucedemo-cypress
```

2. Install dependencies:

```bash
npm install
```

## Running Tests

**Interactive mode:**

```bash
npx cypress open
```

Select E2E Testing → Chrome → choose a spec file or run all.

**Headless mode:**

```bash
npx cypress run
```

**Run a specific test file:**

```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
npx cypress run --spec "cypress/e2e/cart.cy.js"
npx cypress run --spec "cypress/e2e/checkout.cy.js"
```
