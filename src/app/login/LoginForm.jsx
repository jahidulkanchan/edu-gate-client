'use client';

import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth, provider, signInWithPopup } from '@/lib/firebase.init'
import { FcGoogle } from 'react-icons/fc';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Google Login handler
  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        password: null, // tell backend this is Google login
      };

      // ✅ Call your backend API
      const response = await axiosInstance.post('/api/users/login', userData);

      // response contains user + your JWT token
      login(response.data.user, response.data.token); // Store it in context/localStorage
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Google login failed. Please try again.');
    }
  };


  // ✅ Email/Password login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post(`/api/users/login`, {
        email,
        password,
      });

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

      {/* ✅ Google Login Button */}
      <div className="mb-6 text-center">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
          <span>Continue with Google</span>
        </button>
      </div>

      {/* ✅ Divider */}
      <div className="flex items-center justify-between mb-6">
        <hr className="w-1/3 border-gray-300" />
        <span className="text-sm text-gray-500">or login with email</span>
        <hr className="w-1/3 border-gray-300" />
      </div>

      {/* ✅ Email/Password Form */}
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
