// src/app/my-college/page.js
'use client';

import { useAuth } from '@/context/AuthContext';
import MyCollegeClient from './MyCollegeClient';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyCollegePage() {
  const { user } = useAuth();
  const router = useRouter()
  useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, [user,router]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My College Info</h1>
      {user?._id ? <MyCollegeClient userId={user._id} /> : <p>Loading...</p>}
    </div>
  );
}
