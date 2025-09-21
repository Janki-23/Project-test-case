import { Locator, Page, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly contactTitle: Locator;
  readonly inquiryTypeDropdown: Locator;
  readonly subjectField: Locator;
  readonly descriptionField: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly extraLinkField: Locator;
  readonly captchaField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTitle = page.locator('//h3[normalize-space()="Let\'s Get In Touch"]');
    this.inquiryTypeDropdown = page.locator('#contactInquiryType');
    this.subjectField = page.locator('#contactInquirySubject');
    this.descriptionField = page.locator('#contactInquiryDescription');
    this.nameField = page.locator('#contactName');
    this.emailField = page.locator('#contactEmail');
    this.extraLinkField = page.locator('#contactExtraLink');
    this.captchaField = page.locator('#user_captcha_input');
    this.submitButton = page.locator('button[type="submit"]'); // 🔹 update if different
  }

  async goto() {
    await this.page.goto('/contact'); // 🔹 update with actual route
  }

  async verifyContactUsTitle() {
    await expect(this.contactTitle).toHaveText("Let's Get In Touch");
  }

  async selectInquiryType(option: string) {
    await this.inquiryTypeDropdown.click();
    await this.page.locator('.react-select__option', { hasText: option }).click();
  }

  async fillForm(
    inquiryType: string,
    subject: string,
    description: string,
    name: string,
    email: string,
    captcha: string,
    extraLink?: string
  ) {
    if (inquiryType) await this.selectInquiryType(inquiryType);
    if (subject) await this.subjectField.fill(subject);
    if (description) await this.descriptionField.fill(description);
    if (name) await this.nameField.fill(name);
    if (email) await this.emailField.fill(email);
    if (extraLink) await this.extraLinkField.fill(extraLink);
    if (captcha) await this.captchaField.fill(captcha);
  }

  async submit() {
    await this.submitButton.click();
  }

  async submitForm(
    inquiryType: string,
    subject: string,
    description: string,
    name: string,
    email: string,
    captcha: string,
    extraLink?: string
  ) {
    await this.fillForm(inquiryType, subject, description, name, email, captcha, extraLink);
    await this.submit();
  }

  async verifyValidationMessages() {
    await expect(this.page.locator('text=Inquiry type is required')).toBeVisible();
    await expect(this.page.locator('text=Subject is required')).toBeVisible();
    await expect(this.page.locator('text=Description is required')).toBeVisible();
    await expect(this.page.locator('text=Name is required')).toBeVisible();
    await expect(this.page.locator('text=Email is required')).toBeVisible();
    await expect(this.page.locator('text=Captcha is required')).toBeVisible();
  }

  async verifyInvalidEmailError() {
    await expect(this.page.locator('text=Please enter a valid email')).toBeVisible();
  }
}
