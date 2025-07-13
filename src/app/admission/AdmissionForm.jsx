'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { GraduationCap, User, BookOpen, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export default function AdmissionForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    collegeId: '',
    candidateName: user?.name || '',
    subject: '',
    candidateEmail: user?.email || '',
    candidatePhone: '',
    address: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await axiosInstance.get('/api/colleges');
        setColleges(response.data.colleges || []);
      } catch (err) {
        toast.error('Failed to load colleges. Please try again later.');
      }
    }
    fetchColleges();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.collegeId) newErrors.collegeId = 'Please select a college';
    if (!formData.candidateName.trim()) newErrors.candidateName = 'Full name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.candidateEmail)) {
      newErrors.candidateEmail = 'Please enter a valid email';
    }
    if (!formData.candidatePhone.trim()) {
      newErrors.candidatePhone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.candidatePhone)) {
      newErrors.candidatePhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/admissions', formData);
      toast.success(response.data.message || 'Admission submitted successfully!');

      // Reset form but keep user's basic info
      setFormData((prev) => ({
        collegeId: '',
        candidateName: prev.candidateName,
        subject: '',
        candidateEmail: prev.candidateEmail,
        candidatePhone: '',
        address: '',
        dateOfBirth: '',
      }));

      router.push('/my-college');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit admission. Please try again.');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8" />
            <h2 className="text-2xl md:text-3xl font-bold text-center">College Admission Application</h2>
          </div>
          <p className="text-center text-blue-100 mt-2">Fill out the form to apply to your chosen college</p>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* College Selection */}
              <div className="col-span-2">
                <label htmlFor="collegeId" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  Select College <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="collegeId"
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${
                    errors.collegeId ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors`}>
                  <option value="">-- Select a college --</option>
                  {colleges.map((college) => (
                    <option key={college._id} value={college._id}>
                      {college.name}
                    </option>
                  ))}
                </select>
                {errors.collegeId && <p className="mt-1 text-sm text-red-600">{errors.collegeId}</p>}
              </div>

              {/* Personal Information */}
              <div>
                <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Full Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="candidateName"
                  name="candidateName"
                  type="text"
                  value={formData.candidateName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border ${
                    errors.candidateName ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors`}
                />
                {errors.candidateName && <p className="mt-1 text-sm text-red-600">{errors.candidateName}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  Subject <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Your subject of interest"
                  className={`w-full px-4 py-3 border ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="candidateEmail"
                  name="candidateEmail"
                  type="email"
                  value={formData.candidateEmail}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border ${
                    errors.candidateEmail ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors`}
                />
                {errors.candidateEmail && <p className="mt-1 text-sm text-red-600">{errors.candidateEmail}</p>}
              </div>

              <div>
                <label htmlFor="candidatePhone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  Phone <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="candidatePhone"
                  name="candidatePhone"
                  type="tel"
                  value={formData.candidatePhone}
                  onChange={handleChange}
                  required
                  placeholder="+8801XXXXXXXXX"
                  className={`w-full px-4 py-3 border ${
                    errors.candidatePhone ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors`}
                />
                {errors.candidatePhone && <p className="mt-1 text-sm text-red-600">{errors.candidatePhone}</p>}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="Your complete address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 w-full md:w-auto rounded-lg font-medium text-white transition-colors duration-300 ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md'
                }`}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Application...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
