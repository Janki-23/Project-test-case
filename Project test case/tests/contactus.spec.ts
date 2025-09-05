import { test } from '@playwright/test';
import { ContactUsPage } from '../PageObjects/ContactUsPage';
import testData from '../utils/testData';

test.describe('Contact Us Tests', () => {

  test('1. Should display Contact Us page with correct title', async ({ page }) => {
    const contactUs = new ContactUsPage(page);
    await contactUs.goto();
    await contactUs.verifyContactUsTitle();
  });

  test('2. Should show validation for required fields', async ({ page }) => {
    const contactUs = new ContactUsPage(page);
    await contactUs.goto();
    await contactUs.submitEmptyForm();
    await contactUs.verifyRequiredFieldValidation();
  });

  test('3. Should show validation for invalid email format', async ({ page }) => {
    const contactUs = new ContactUsPage(page);
    await contactUs.goto();
    await contactUs.fillContactForm({
      subject: testData.contactUs.valid.subject,
      description: testData.contactUs.valid.description,
      name: testData.contactUs.valid.name,
      email: testData.contactUs.invalid.email,  // invalid email format
      captcha: testData.contactUs.valid.captcha,
      projectLink: testData.contactUs.valid.projectLink,
    });
    await contactUs.submitForm();
    await contactUs.verifyInvalidEmailValidation();
  });

  test('4. Should not submit form with incorrect captcha', async ({ page }) => {
    const contactUs = new ContactUsPage(page);
    await contactUs.goto();
    await contactUs.fillContactForm({
      subject: testData.contactUs.valid.subject,
      description: testData.contactUs.valid.description,
      name: testData.contactUs.valid.name,
      email: testData.contactUs.valid.email,
      captcha: testData.contactUs.invalid.captcha, // wrong captcha
      projectLink: testData.contactUs.valid.projectLink,
    });
    await contactUs.submitForm();
    await contactUs.verifyCaptchaValidation();
  });

  test('5. Should successfully submit form with valid data', async ({ page }) => {
    const contactUs = new ContactUsPage(page);
    await contactUs.goto();
    await contactUs.fillContactForm(testData.contactUs.valid);
    await contactUs.submitForm();
    await contactUs.verifyFormSubmissionSuccess();
  });

});
