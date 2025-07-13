'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
import { Star, CalendarDays, Trophy, BookText, GraduationCap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/colleges');
        const topRated = response.data.colleges.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setColleges(topRated);
      } catch (err) {
        console.error(err);
        setError('Failed to load colleges.');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg max-w-2xl mx-auto text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
          Try Again
        </button>
      </div>
    );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Colleges</h2>
          <p className="mt-3 text-xl text-gray-500">Top-rated institutions based on student reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div key={college._id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-56 overflow-hidden">
                <Image src={college.imageUrl} alt={college.name} fill className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span>{college.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>

                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <CalendarDays className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Admission: {college.admissionDates}</span>
                  </div>

                  {college.events?.length > 0 && (
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Events: {college.events.join(', ')}</span>
                    </div>
                  )}

                  {college.researchHistory && (
                    <div className="flex items-start">
                      <BookText className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Research: {college.researchHistory}</span>
                    </div>
                  )}

                  {college.sports?.length > 0 && (
                    <div className="flex items-start">
                      <Trophy className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Sports: {college.sports.join(', ')}</span>
                    </div>
                  )}
                </div>

                <Link href={`/colleges/${college._id}`} className="mt-6 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  View details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/colleges"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Browse All Colleges
          </Link>
        </div>
      </div>
    </section>
  );
}
