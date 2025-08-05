// src/components/RegisterForm.jsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export default function RegisterForm() {
   const { user, loading: authLoading } = useAuth();
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
 useEffect(() => {
   if (!authLoading && user) {
     router.replace('/'); 
   }
 }, [authLoading, user, router]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axiosInstance.post('/api/users/register', formData);
      setMessage('Registration successful!');
      setFormData({ name: '', email: '', password: '' }); 
      router.push('/login')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" placeholder="Your name" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" placeholder="you@example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" placeholder="Create a password" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {message && <p className={`mt-2 text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </form>
  );
}
