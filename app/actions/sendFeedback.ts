'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFeedback(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const designation = String(formData.get('designation') || '').trim();
  const project = String(formData.get('project') || '').trim();
  const type = String(formData.get('type') || '').trim();
  const message = String(formData.get('message') || '').trim();

  // Basic Validation
  if (!name || !email || !project || !message) {
    return { error: 'Please fill out all required fields.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'PortalEra Feedback <onboarding@resend.dev>', // Keep this as is for testing
      to: ['portalera.in@gmail.com'], // Replace with your actual email address!
      subject: `New ${type || 'Feedback'} for ${project} from ${name}`,
      replyTo: email, // If you reply to the email, it will go to the user
      html: `
        <h2>New Feedback Submission: PortalEra</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company/Organization:</strong> ${escapeHtml(company || 'Not provided')}</p>
        <p><strong>Designation:</strong> ${escapeHtml(designation || 'Not provided')}</p>
        <p><strong>PortalEra made:</strong> ${escapeHtml(project)}</p>
        <p><strong>Type:</strong> ${escapeHtml(type || 'General feedback')}</p>
        <p><strong>Message:</strong><br/> ${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: error.message || 'Failed to send feedback.' };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error('Unexpected error:', err);
    const message = err instanceof Error ? err.message : 'Failed to send feedback. Please try again later.';
    return { error: message };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
