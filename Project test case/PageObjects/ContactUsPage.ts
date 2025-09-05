import { Page, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;

  // Locators
  private contactUsTitle = 'h1.content-page-heading1'; // adjust selector if different
  private subjectDropdown = 'select#subject'; // update with correct selector
  private descriptionField = 'textarea#description'; // update with correct selector
  private nameField = 'input#name'; // update with correct selector
  private emailField = 'input#email'; // update with correct selector
  private captchaField = 'input#captcha'; // update with correct selector
  private projectLinkField = 'input#projectLink'; // optional
  private submitButton = 'button[type="submit"]';
  private successMessage = '.success-message'; // adjust as per DOM
  private errorMessage = '.error-message'; // adjust as per DOM

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/contact-us'); // update route if needed
  }

  async verifyContactUsTitle() {
    await expect(this.page.locator(this.contactUsTitle)).toHaveText(
      "We Are Here To Help! To Get Started, Please Select The Type Of Issue You'd Like To Contact Us About."
    );
  }

  async submitEmptyForm() {
    await this.page.click(this.submitButton);
  }

  async verifyRequiredFieldValidation() {
    await expect(this.page.locator(this.errorMessage)).toContainText('This field is required');
  }

  async fillContactForm(data: {
    subject?: string;
    description?: string;
    name?: string;
    email?: string;
    captcha?: string;
    projectLink?: string;
  }) {
    if (data.subject) await this.page.selectOption(this.subjectDropdown, { label: data.subject });
    if (data.description) await this.page.fill(this.descriptionField, data.description);
    if (data.name) await this.page.fill(this.nameField, data.name);
    if (data.email) await this.page.fill(this.emailField, data.email);
    if (data.captcha) await this.page.fill(this.captchaField, data.captcha);
    if (data.projectLink) await this.page.fill(this.projectLinkField, data.projectLink);
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async verifyInvalidEmailValidation() {
    await expect(this.page.locator(this.errorMessage)).toContainText('Enter a valid email address');
  }

  async verifyCaptchaValidation() {
    await expect(this.page.locator(this.errorMessage)).toContainText('Invalid captcha');
  }

  async verifyFormSubmissionSuccess() {
    await expect(this.page.locator(this.successMessage)).toHaveText('Your request has been submitted successfully');
  }
}
