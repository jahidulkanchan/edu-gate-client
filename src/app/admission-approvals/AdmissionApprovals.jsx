'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BadgeCheck, Mail, Phone, User, Book, GraduationCap, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PendingAdmissions() {
  const [pendingAdmissions, setPendingAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/api/admissions/admin/pending');
        setPendingAdmissions(res.data);
      } catch (err) {
        console.error('Failed to fetch:', err);
        toast.error('Failed to load pending admissions');
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      setProcessing(id);
      await axiosInstance.patch(`/api/admissions/${id}`, {
        isApproved: true,
      });

      toast.success('Admission approved successfully');
      setPendingAdmissions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to approve:', err);
      toast.error('Approval failed');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessing(id);
      await axiosInstance.delete(`/api/admissions/${id}`);

      toast.success('Admission rejected successfully');
      setPendingAdmissions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to reject:', err);
      toast.error('Rejection failed');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            Pending Admission Requests
          </h1>
          <p className="text-gray-500 mt-2">Review and approve student applications</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full text-blue-800 font-medium flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {pendingAdmissions.length} pending
        </div>
      </div>

      {pendingAdmissions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No pending admissions</h3>
          <p className="text-gray-500 max-w-md mx-auto">All admission requests have been processed. Check back later for new submissions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingAdmissions.map((admission) => (
            <div key={admission._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      {admission.candidateName}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mt-1">{admission.collegeId?.name}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{admission.candidateEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{admission.candidatePhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Book className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="text-gray-900">{admission.subject}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between gap-3">
                <button
                  onClick={() => handleReject(admission._id)}
                  disabled={processing === admission._id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 disabled:opacity-50">
                  {processing === admission._id ? (
                    <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      Reject
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleApprove(admission._id)}
                  disabled={processing === admission._id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50">
                  {processing === admission._id ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <BadgeCheck className="h-5 w-5" />
                      Approve
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
