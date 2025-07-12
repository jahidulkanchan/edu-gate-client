'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios'; // তোমার axios ইনস্ট্যান্স
import Link from 'next/link';
import {Star, Calendar, Ticket, Trophy, ArrowRight} from "lucide-react";

export default function CollegesList() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/colleges');
        setColleges(response.data.colleges);
      } catch (err) {
        console.error(err);
        setError('Failed to load colleges.');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) return <p>Loading colleges...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (colleges.length === 0) return <p>No colleges found.</p>;

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {colleges.map((college) => (
          <div key={college._id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
            {/* Image with overlay */}
            <div className="relative h-56 overflow-hidden">
              <img src={college.imageUrl || '/default-college.jpg'} alt={college.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{college.name}</h2>
              </div>
              {college.rating && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium text-sm">{college.rating}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Admission: {college.admissionDates}</span>
                </div>

                {college.events?.length > 0 && (
                  <div className="flex items-start text-sm text-gray-600 mb-2">
                    <Ticket className="w-4 h-4 mr-2 mt-0.5" />
                    <span>Events: {college.events.slice(0, 2).join(', ')}</span>
                  </div>
                )}

                {college.sports?.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span>Sports: {college.sports.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Link href={`/colleges/${college._id}`} className="w-full">
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
