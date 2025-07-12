'use client';
import ReactStars from 'react-stars';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axios';
import { Activity, Award, BookOpen, Calendar, Edit } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function MyCollegeClient({ userId }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(colleges)

  // For new review form
  const [openReviewId, setOpenReviewId] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, message: '' });
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
        // ধরে নিচ্ছি API থেকে array of colleges আসছে
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

      // update colleges state with new review for this college
      setColleges((prev) =>
        prev.map((college) =>
          college._id === collegeId
            ? { ...college, review: res.data } // ধরে নিচ্ছি API response এ নতুন review আসবে
            : college,
        ),
      );

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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (authLoading || loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
        <p className="text-lg font-semibold text-gray-700">Loading, please wait...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );

  if (colleges.length === 0)
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No college data found</h3>
        <p className="text-gray-500">You haven't applied to any colleges yet.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {colleges.map((college) => {
          const review = college.review || null;

          return (
            <div key={college._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* College Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{college.name}</h2>
                    <p className="mt-1 opacity-90">
                      Your application status:
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${college.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {college.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Edit className="w-4 h-4 mr-2" />
                      View Application
                    </button>
                  </div>
                </div>
              </div>

              {/* College Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* College Image */}
                  <div className="lg:w-1/3">
                    <div className="relative h-52 w-full rounded-lg overflow-hidden">
                      <Image src={college.imageUrl || '/school.avif'} alt="school_images" fill className="object-cover" />
                    </div>
                  </div>

                  {/* College Details */}
                  <div className="lg:w-2/3 space-y-6">
                    {/* Admission Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Admission Date</h3>
                        </div>
                        <p className="text-gray-700">{formatDate(college.admissionDate)}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Award className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Research Papers</h3>
                        </div>
                        <p className="text-gray-700">{college.research || 0} published papers</p>
                      </div>

                      {college.events?.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                            <h3 className="font-medium text-gray-900">Upcoming Events</h3>
                          </div>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {college.events.map((event, i) => (
                              <li key={i}>{event}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {college.sports?.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Activity className="w-5 h-5 text-blue-600 mr-2" />
                            <h3 className="font-medium text-gray-900">Sports Facilities</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {college.sports.map((sport, i) => (
                              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Personal Information */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Application Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{college.candidateName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{college.candidateEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{college.candidatePhone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{formatDate(college.dateOfBirth)}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{college.address}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Subject of Interest</p>
                          <p className="font-medium">{college.subject}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Your Review</h3>

                    {/* Add Review button: only enabled if approved and if review doesn't exist */}
                    {!review && (
                      <button
                        onClick={() => handleOpenReview(college._id)}
                        disabled={!college.isApproved}
                        className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded shadow-sm ${
                          college.isApproved ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                        }`}>
                        Add Review
                      </button>
                    )}
                  </div>

                  {openReviewId === college._id && !review ? (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                          <ReactStars count={5} size={28} activeColor="#facc15" value={newReview.rating} onChange={(newRating) => setNewReview({ ...newReview, rating: newRating })} />
                        </div>

                        <div>
                          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">
                            Review
                          </label>
                          <textarea
                            id="review-text"
                            rows={4}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={newReview.message}
                            onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                          />
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setOpenReviewId(null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReviewSubmit(college._id)}
                            disabled={!college.isApproved || submitLoading}
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                              college.isApproved && !submitLoading ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'
                            }`}>
                            {submitLoading ? (
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                              </svg>
                            ) : null}
                            {submitLoading ? 'Submitting...' : 'Submit Review'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : review ? (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        {review.rating && Number.isFinite(review.rating) ? (
                          [...Array(Math.floor(review.rating))].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))
                        ) : (
                          <span className="text-gray-400">NA rating</span>
                        )}

                        <span className="text-gray-500 text-sm ml-1">{review && typeof review.rating === 'number' ? review.rating.toFixed(1) : 'N/A'} rating</span>
                      </div>
                      <p className="text-gray-700">{review.reviewText}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <p className="text-gray-500 italic">You haven't left a review yet.</p>
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
