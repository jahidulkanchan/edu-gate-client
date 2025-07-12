'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdmissionForm() {
   const { user } = useAuth();
    const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    collegeId: '',
    candidateName: '',
    subject: '',
    candidateEmail: '',
    candidatePhone: '',
    address: '',
    dateOfBirth: '',
  });
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, [user]);
  // Fetch college list on component mount
  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await axiosInstance.get('/api/colleges');
        setColleges(response.data.colleges || []);
      } catch (err) {
        toast.error('Failed to load colleges');
      }
    }
    fetchColleges();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/admissions', formData);
      toast.success(response.data.message || 'Admission submitted successfully!');
      setFormData({
        collegeId: '',
        candidateName: '',
        subject: '',
        candidateEmail: '',
        candidatePhone: '',
        address: '',
        dateOfBirth: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit admission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-50/40 border border-black/20 rounded-lg shadow-md">
      <ToastContainer position="top-center" autoClose={2000} />

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">College Admission Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label htmlFor="collegeId" className="block text-sm font-medium text-gray-700 mb-1">
              Select College <span className="text-red-500">*</span>
            </label>
            <select
              id="collegeId"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">-- Select a college --</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="candidateName"
              name="candidateName"
              type="text"
              value={formData.candidateName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="candidateEmail"
              name="candidateEmail"
              type="email"
              value={formData.candidateEmail}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label htmlFor="candidatePhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="candidatePhone"
              name="candidatePhone"
              type="tel"
              value={formData.candidatePhone}
              onChange={handleChange}
              required
              placeholder="+8801XXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="Your address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Admission'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
