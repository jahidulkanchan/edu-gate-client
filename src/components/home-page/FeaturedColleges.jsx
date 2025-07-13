'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';

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

  if (loading) return <p className="text-center">Loading colleges...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">🌟 Featured Colleges</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div key={college._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-all">
            <img src={college.imageUrl} alt={college.name} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{college.name}</h3>
              <p className="text-sm text-gray-600">🎓 Admission Dates: {college.admissionDates}</p>
              <p className="text-sm text-gray-600">🎉 Events: {college.events.join(', ')}</p>
              <p className="text-sm text-gray-600">📚 Research: {college.researchHistory}</p>
              <p className="text-sm text-gray-600">🏆 Sports: {college.sports.join(', ')}</p>
              <p className="text-sm text-yellow-600 font-semibold">⭐ Rating: {college.rating}</p>
              <Link href={`/colleges/${college._id}`} className="inline-block text-blue-500 underline hover:text-blue-700 mt-2">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
