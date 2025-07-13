'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, GraduationCap, MapPin, Edit, Save, X } from 'lucide-react';

export default function UserProfile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('api/users/profile');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.put('api/users/profile', formData);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || (loading && !editMode)) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 text-blue-600" />
          User Profile
        </h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors"
            disabled={loading}>
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>

      {!editMode ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <User className="h-5 w-5 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Full Name</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{formData.name}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Email</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{formData.email}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-5 w-5 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">University</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{formData.university || 'Not specified'}</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Address</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{formData.address || 'Not specified'}</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                University
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
              disabled={loading}>
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium text-white transition" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
