'use client';

import { useState } from 'react';
import { sendFeedback } from './actions/sendFeedback';

export default function FeedbackPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('loading');
    const result = await sendFeedback(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PortalEra Feedback</h1>
          <p className="text-gray-500">We value your thoughts. How can we improve?</p>
        </div>

        {/* Success State */}
        {status === 'success' ? (
          <div className="bg-green-50 text-green-800 rounded-xl p-6 text-center border border-green-200">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p>Your feedback has been sent successfully. We appreciate your time.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-indigo-600 font-medium hover:text-indigo-700 transition"
            >
              Send another message
            </button>
          </div>
        ) : (
          /* Form */
          <form action={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {status === 'error' && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Oinam Clinton Singh"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="clinton@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Feedback Type Dropdown */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-gray-700 block">Feedback Type</label>
              <select
                name="type"
                id="type"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900 appearance-none"
              >
                <option value="General Suggestion">General Suggestion</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 block">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Tell us what you think..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Feedback'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}