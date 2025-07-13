'use client';
import ReactStars from 'react-stars';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axios';
import { Activity, Award, BookOpen, Calendar, Edit, Star, MessageSquare, User, Mail, Phone, Home, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function MyCollegeClient({ userId }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For new review form
  const [openReviewId, setOpenReviewId] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 4, message: '' });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (user?.isAdmin) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (!userId) return;

    const fetchMyColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/api/admissions/${userId}`);
        setColleges(res.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load your college data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyColleges();
  }, [userId]);

  const handleOpenReview = (collegeId) => {
    setOpenReviewId(collegeId);
    setNewReview({ rating: 4, message: '' });
  };

  const handleReviewSubmit = async (collegeId) => {
    if (newReview.rating === 0 || newReview.message.trim() === '') {
      toast.error('Please provide rating and review message.');
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await axiosInstance.post('/api/reviews', {
        collegeId,
        userId,
        reviewText: newReview.message,
        rating: newReview.rating,
        userName: user?.name || 'Anonymous',
      });

      setColleges((prev) => prev.map((college) => (college._id === collegeId ? { ...college, review: res.data } : college)));

      setOpenReviewId(null);
      toast.success('Review submitted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit review.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (authLoading || loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading your college data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px- sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-12 h-12 text-blue-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No college applications found</h3>
        <p className="text-gray-500 mb-6">You haven't applied to any colleges yet.</p>
        <Link href="/colleges" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Browse Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My College Applications</h1>

      <div className="space-y-8">
        {colleges.map((college) => {
          const review = college.review || null;

          return (
            <div key={college._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* College Header */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{college.name}</h2>
                    <div className="flex items-center mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${college.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {college.isApproved ? 'Approved' : 'Pending Review'}
                      </span>
                      <span className="ml-3 text-sm opacity-90">Applied on {formatDate(college.applicationDate)}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => router.push(`/colleges/${college._id}`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50">
                      <Bookmark className="w-4 h-4 mr-2" />
                      View College
                    </button>
                  </div>
                </div>
              </div>

              {/* College Content */}
              {/* College Content */}
              <div className="p-6">
                <div className="space-y-8">
                  {/* Key Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-medium text-gray-900">Admission Date</h3>
                      </div>
                      <p className="text-gray-700 font-medium">{formatDate(college.admissionDate)}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-medium text-gray-900">Research Papers</h3>
                      </div>
                      <p className="text-gray-700 font-medium">{college.research || '0'} published</p>
                    </div>

                    {college.events?.length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <Activity className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Upcoming Events</h3>
                        </div>
                        <ul className="text-gray-700 space-y-1">
                          {college.events.slice(0, 2).map((event, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{event}</span>
                            </li>
                          ))}
                          {college.events.length > 2 && <li className="text-sm text-blue-600">+{college.events.length - 2} more</li>}
                        </ul>
                      </div>
                    )}

                    {college.sports?.length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <Activity className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Sports Facilities</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {college.sports.slice(0, 4).map((sport, i) => (
                            <span key={i} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                              {sport}
                            </span>
                          ))}
                          {college.sports.length > 4 && <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">+{college.sports.length - 4}</span>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 text-blue-600 mr-2" />
                      Your Application Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <User className="w-4 h-4 mr-2" /> Full Name
                        </p>
                        <p className="font-medium mt-1">{college.candidateName}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </p>
                        <p className="font-medium mt-1">{college.candidateEmail}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-4 h-4 mr-2" /> Phone
                        </p>
                        <p className="font-medium mt-1">{college.candidatePhone}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" /> Date of Birth
                        </p>
                        <p className="font-medium mt-1">{formatDate(college.dateOfBirth)}</p>
                      </div>
                      <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Home className="w-4 h-4 mr-2" /> Address
                        </p>
                        <p className="font-medium mt-1">{college.address}</p>
                      </div>
                      <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-500 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" /> Subject of Interest
                        </p>
                        <p className="font-medium mt-1">{college.subject}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                      Your Review
                    </h3>

                    {!review && (
                      <button
                        onClick={() => handleOpenReview(college._id)}
                        disabled={!college.isApproved}
                        className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm transition-colors ${
                          college.isApproved ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}>
                        <Star className="w-4 h-4 mr-2" />
                        Add Review
                      </button>
                    )}
                  </div>

                  {openReviewId === college._id && !review ? (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <ReactStars count={5} size={28} color2="#f59e0b" value={newReview.rating} onChange={(newRating) => setNewReview({ ...newReview, rating: newRating })} />
                        </div>

                        <div>
                          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                            Review Message
                          </label>
                          <textarea
                            id="review-text"
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Share your experience with this college..."
                            value={newReview.message}
                            onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                          />
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setOpenReviewId(null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReviewSubmit(college._id)}
                            disabled={!college.isApproved || submitLoading}
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
                              college.isApproved && !submitLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}>
                            {submitLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              'Submit Review'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : review ? (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-gray-600 text-sm ml-2">{review.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-gray-800">{review.reviewText}</p>
                      <p className="text-sm text-gray-500 mt-4">Reviewed on {formatDate(review.createdAt)}</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
                      <p className="text-gray-500">{college.isApproved ? "You haven't reviewed this college yet." : 'Review option will be available after your application is approved.'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
