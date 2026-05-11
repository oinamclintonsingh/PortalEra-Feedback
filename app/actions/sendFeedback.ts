'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFeedback(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const type = formData.get('type') as string;
  const message = formData.get('message') as string;

  // Basic Validation
  if (!name || !email || !message) {
    return { error: 'Please fill out all required fields.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'PortalEra Feedback <onboarding@resend.dev>', // Keep this as is for testing
      to: ['portalera.in@gmail.com'], // Replace with your actual email address!
      subject: `New ${type} from ${name}`,
      replyTo: email, // If you reply to the email, it will go to the user
      html: `
        <h2>New Feedback Submission: PortalEra</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: error.message || 'Failed to send feedback.' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { error: err.message || 'Failed to send feedback. Please try again later.' };
  }
}