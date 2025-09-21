const timestamp = Date.now();

const testData = {
  contact: {
    valid: {
      inquiryType: 'General Inquiry',
      subject: 'Test Subject',
      description: 'This is a test description for Contact Us form.',
      name: 'John Doe',
      validEmail: `john.contact${timestamp}@example.com`,
      captcha: '12345',
      extraLink: 'https://github.com/johndoe',
    },
    invalid: {
      inquiryType: 'General Inquiry',
      subject: 'Test Subject',
      description: 'Short desc',
      name: 'John123',
      invalidEmail: 'invalidEmailFormat',
      captcha: 'wrong',
      extraLink: 'notalink',
    },
    empty: {
      inquiryType: '',
      subject: '',
      description: '',
      name: '',
      email: '',
      captcha: '',
      extraLink: '',
    },
  },
};

export default testData;
