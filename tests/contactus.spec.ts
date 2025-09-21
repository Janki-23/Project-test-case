import { test } from '@playwright/test';
import { ContactUsPage } from '../PageObjects/ContactUsPage';
import testData from '../utils/testData';
import { waitForContactFailureResponse, waitForContactSuccessResponse } from '../utils/apiUtils';

test.describe('Contact Us Tests', () => {
  test('1. Should display Contact Us page with title', async ({ page }) => {
    const contact = new ContactUsPage(page);
    await contact.goto();
    await contact.verifyContactUsTitle(); // "Let's Get In Touch"
  });

  test('2. Should show validation errors when submitting an empty form', async ({ page }) => {
    const contact = new ContactUsPage(page);
    await contact.goto();
    await contact.submitForm('', '', '', '', '', ''); // all empty
    await contact.verifyValidationMessages();
  });

  test('3. Should show validation for invalid email format', async ({ page }) => {
    const contact = new ContactUsPage(page);
    await contact.goto();
    await contact.fillForm(
      testData.contact.inquiryType,
      testData.contact.subject,
      testData.contact.description,
      testData.contact.name,
      testData.contact.invalidEmail, // invalid email
      testData.contact.captcha,
      testData.contact.extraLink
    );
    await contact.submit();
    await contact.verifyInvalidEmailError();
  });

  test('4. Should successfully submit with valid data', async ({ page }) => {
    const contact = new ContactUsPage(page);
    await contact.goto();
    await waitForContactSuccessResponse(page, () =>
      contact.fillForm(
        testData.contact.inquiryType,
        testData.contact.subject,
        testData.contact.description,
        testData.contact.name,
        testData.contact.validEmail,
        testData.contact.captcha,
        testData.contact.extraLink
      ).then(() => contact.submit())
    );
  });

  test('5. Should show error on invalid captcha', async ({ page }) => {
    const contact = new ContactUsPage(page);
    await contact.goto();
    await waitForContactFailureResponse(page, () =>
      contact.fillForm(
        testData.contact.inquiryType,
        testData.contact.subject,
        testData.contact.description,
        testData.contact.name,
        testData.contact.validEmail,
        testData.contact.invalidCaptcha,
        testData.contact.extraLink
      ).then(() => contact.submit())
    );
  });
});
