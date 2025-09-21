// Custom command types for Cypress
declare global {
  interface Cypress {
    getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
    waitForPageLoad(): Cypress.Chainable<void>;
    screenshotWithTimestamp(name: string): Cypress.Chainable<void>;
  }
}

export {};
