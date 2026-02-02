/**
 * Newsletter Form E2E Tests
 *
 * Tests the newsletter signup form with botpoison protection.
 * Requires Hugo dev server running at http://localhost:1313
 *
 * Run with Playwright MCP tools or adapt for @playwright/test
 */

const BASE_URL = 'http://localhost:1313';
const TEST_EMAIL = 'support@coto.studio';
const TEST_NAME = 'Test User';

/**
 * Test Suite: Newsletter Form
 *
 * These tests verify:
 * 1. Form cannot be submitted with empty fields (required validation)
 * 2. Form submits successfully with valid data and botpoison protection
 * 3. Success message appears after submission
 */

export const tests = {
  /**
   * Test: Empty form submission is blocked
   *
   * Steps:
   * 1. Navigate to homepage
   * 2. Click Sign Up without filling fields
   * 3. Verify form does not submit (name field gets focus)
   */
  emptyFormBlocked: {
    name: 'Empty form submission is blocked by required validation',
    steps: [
      { action: 'navigate', url: BASE_URL },
      { action: 'click', selector: 'button:has-text("Sign Up")' },
      { action: 'assert', check: 'focus', selector: '#name' },
    ],
  },

  /**
   * Test: Valid form submission succeeds
   *
   * Steps:
   * 1. Navigate to homepage
   * 2. Fill name field
   * 3. Fill email field
   * 4. Click Sign Up
   * 5. Wait for botpoison challenge (button disabled)
   * 6. Verify success message appears
   */
  validSubmission: {
    name: 'Valid form submission with botpoison succeeds',
    steps: [
      { action: 'navigate', url: BASE_URL },
      { action: 'fill', selector: '#name', value: TEST_NAME },
      { action: 'fill', selector: '#email', value: TEST_EMAIL },
      { action: 'click', selector: 'button:has-text("Sign Up")' },
      { action: 'waitForText', text: 'All set. Thank you!', timeout: 10000 },
    ],
  },

  /**
   * Test: Form resets after successful submission
   *
   * Steps:
   * 1. Submit valid form
   * 2. Verify fields are cleared
   */
  formResetsAfterSubmission: {
    name: 'Form fields reset after successful submission',
    steps: [
      { action: 'navigate', url: BASE_URL },
      { action: 'fill', selector: '#name', value: TEST_NAME },
      { action: 'fill', selector: '#email', value: TEST_EMAIL },
      { action: 'click', selector: 'button:has-text("Sign Up")' },
      { action: 'waitForText', text: 'All set. Thank you!', timeout: 10000 },
      { action: 'assert', check: 'value', selector: '#name', expected: '' },
      { action: 'assert', check: 'value', selector: '#email', expected: '' },
    ],
  },
};

/**
 * Playwright Test Runner (for @playwright/test)
 *
 * Uncomment and adapt if using @playwright/test directly:
 *
 * import { test, expect } from '@playwright/test';
 *
 * test('empty form submission is blocked', async ({ page }) => {
 *   await page.goto(BASE_URL);
 *   await page.click('button:has-text("Sign Up")');
 *   await expect(page.locator('#name')).toBeFocused();
 * });
 *
 * test('valid form submission succeeds', async ({ page }) => {
 *   await page.goto(BASE_URL);
 *   await page.fill('#name', TEST_NAME);
 *   await page.fill('#email', TEST_EMAIL);
 *   await page.click('button:has-text("Sign Up")');
 *   await expect(page.getByText('All set. Thank you!')).toBeVisible({ timeout: 10000 });
 * });
 */

export default tests;
