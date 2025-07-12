'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // এখানে তোমার API কল করবে রিসেট পাসওয়ার্ড রিকোয়েস্ট পাঠাতে
    // উদাহরণ সরূপ:
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Failed to send reset link. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Reset Your Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
            Enter your registered email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {message && <p className="text-center text-sm text-green-600 font-medium">{message}</p>}

        <div className="flex justify-between items-center">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <button type="button" onClick={() => router.push('/login')} className="text-gray-600 underline hover:text-gray-800">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
