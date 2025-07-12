'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axios';


export default function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  console.log("ddddddddddddddd", formData)

  // প্রোফাইল ডাটা fetch করার ফাংশন
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/users/profile');
      setFormData(response.data);
    } catch (error) {
      toast.error('প্রোফাইল লোড করতে সমস্যা হয়েছে');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্ট হলে ডাটা fetch করুন
  useEffect(() => {
    fetchProfile();
  }, []);

  // ইনপুট ফিল্ডে পরিবর্তন হ্যান্ডেল করা
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ডাটা সেভ করার ফাংশন
  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.put('/api/users/profile', formData);
      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে');
      setEditMode(false);
    } catch (error) {
      toast.error('প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !editMode) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!editMode && (
          <button onClick={() => setEditMode(true)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium" disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      {!editMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">University</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{formData.university || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{formData.address || 'Not specified'}</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setEditMode(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition" disabled={loading}>
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
