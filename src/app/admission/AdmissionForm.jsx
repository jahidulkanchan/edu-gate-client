'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios'; // তোমার axios ইন্সট্যান্স যদি আলাদা ফাইলে থাকে

export default function AdmissionForm() {
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
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch college list on component mount
  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await axiosInstance.get('/api/colleges');
        setColleges(response.data.colleges || []);
      } catch (err) {
        setError('Failed to load colleges');
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
    setError('');
    setSuccessMsg('');

    try {
      const response = await axiosInstance.post('/api/admissions', formData);
      setSuccessMsg(response.data.message || 'Admission submitted successfully!');
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
      setError(err.response?.data?.message || 'Failed to submit admission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">College Admission Form</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="collegeId" className="block mb-1 font-medium">
            Select College
          </label>
          <select id="collegeId" name="collegeId" value={formData.collegeId} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">-- Select a college --</option>
            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="candidateName" className="block mb-1 font-medium">
            Candidate Name
          </label>
          <input
            id="candidateName"
            name="candidateName"
            type="text"
            value={formData.candidateName}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 font-medium">
            Subject
          </label>
          <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required placeholder="Subject" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label htmlFor="candidateEmail" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="candidateEmail"
            name="candidateEmail"
            type="email"
            value={formData.candidateEmail}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="candidatePhone" className="block mb-1 font-medium">
            Phone
          </label>
          <input
            id="candidatePhone"
            name="candidatePhone"
            type="tel"
            value={formData.candidatePhone}
            onChange={handleChange}
            required
            placeholder="+8801XXXXXXXXX"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 font-medium">
            Address
          </label>
          <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Your address" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block mb-1 font-medium">
            Date of Birth
          </label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Admission'}
        </button>
      </form>
    </div>
  );
}
