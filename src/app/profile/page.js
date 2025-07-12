// src/app/profile/page.js

import UserProfile from "./UserProfile";


export const metadata = {
  title: 'My Profile',
  description: 'View and edit your profile',
};

export default async function ProfilePage() {
  // এটা সাধারণত user data server-side থেকে আনবে (cookies/token দিয়ে), এখন আমরা dummy data পাঠাচ্ছি
  const userData = {
    name: 'Md Jahidul Islam',
    email: 'jahid@example.com',
    university: 'Dhaka University',
    address: 'Dhaka, Bangladesh',
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <UserProfile user={userData} />
    </div>
  );
}
