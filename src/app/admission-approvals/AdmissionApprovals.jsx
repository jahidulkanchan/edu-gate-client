'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BadgeCheck, Mail, Phone, User, Book } from 'lucide-react';

export default function PendingAdmissions() {
  const [pendingAdmissions, setPendingAdmissions] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axiosInstance.get('/api/admissions/admin/pending');
        setPendingAdmissions(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch:', err);
        toast.error('Failed to load pending admissions');
      }
    };

    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axiosInstance.patch(`/api/admissions/${id}`, {
        isApproved: true,
      });

      toast.success('Admission approved successfully ✅');

      setPendingAdmissions((prev) => prev.map((item) => (item._id === id ? { ...item, isApproved: true } : item)));
    } catch (err) {
      console.error('❌ Failed to approve:', err);
      toast.error('Approval failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Pending Admission Requests</h1>

      {pendingAdmissions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pending admissions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingAdmissions.map((admission) => (
            <div key={admission._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="w-5 h-5 text-blue-600" />
                  {admission.candidateName}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {admission.candidateEmail}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {admission.candidatePhone}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Book className="w-4 h-4 text-gray-500" />
                  {admission.subject}
                </p>
                <p>
                  <span className="font-medium text-gray-600">College:</span> {admission.collegeId?.name}
                </p>
              </div>

              {!admission.isApproved && (
                <button onClick={() => handleApprove(admission._id)} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                  <BadgeCheck className="inline-block mr-2 w-5 h-5" />
                  Approve
                </button>
              )}

              {admission.isApproved && <div className="mt-4 text-green-600 font-semibold text-center">Already Approved ✅</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
