import { Page, expect } from '@playwright/test';
import { authStore } from './authStore';

export async function waitForContactSuccessResponse(page: Page, trigger: () => Promise<any>) {
  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/api/v1.1/contact-us?lng=en') && res.status() === 200
    ),
    trigger()
  ]);

  const responseBody = await response.json();

  expect(responseBody.status).toBe('success');
  expect(responseBody.data).toBeTruthy();
  expect(responseBody.data.data).toHaveProperty('_id');
  expect(responseBody.data.data).toHaveProperty('email');
  expect(responseBody.data.data).toHaveProperty('inquirySubject');

  const { inquirySubject, inquiryDescription, name, email, inquiryType } = responseBody.data.data;
  expect(inquirySubject).toBeTruthy();
  expect(inquiryDescription).toBeTruthy();
  expect(name).toBeTruthy();
  expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  expect(inquiryType).toBeTruthy();
}

export async function waitForContactFailureResponse(page: Page, trigger: () => Promise<any>) {
  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/api/v1.1/contact-us?lng=en') && res.status() !== 200
    ),
    trigger()
  ]);

  const responseBody = await response.json();

  expect(responseBody.status).toBe('fail');
  expect(responseBody.message).toBeTruthy(); // e.g., "Invalid Captcha"
}
