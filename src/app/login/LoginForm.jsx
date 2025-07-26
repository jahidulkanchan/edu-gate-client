'use client';

import { useAuth } from '@/context/AuthContext'; // ✅ Import AuthContext
import axiosInstance from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ context থেকে login function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post(`/api/users/login`, {
        email,
        password,
      });

      // ✅ Login function will update context + localStorage
      login(response.data.user, response.data.token);
      router.push('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md w-full p-8 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">Login to Your Account</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Login
        </button>
      </form>

      <p className="mt-4 text-right">
        <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </p>

      <p className="mt-6 text-center text-gray-700">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
