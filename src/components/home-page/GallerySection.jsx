'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaUniversity, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import axiosInstance from '@/lib/axios';

const CollegeCard = ({ college, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <Image
        src={college.imageUrl?.trim()}
        alt={`${college.name} campus`}
        width={600}
        height={400}
        className="object-cover w-full h-64 md:h-80 brightness-90 hover:brightness-100 transition-all duration-500"
        priority={index < 3}
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        <span className="font-bold text-blue-800 flex items-center gap-1">
          <FaUniversity className="text-blue-600" /> {college.name}
        </span>
      </div>
      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
        <FaTrophy /> {college.rating}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <FaCalendarAlt className="text-blue-300" />
          <span className="text-sm">{college.admissionDates}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {college.events?.map((event, i) => (
            <span key={i} className="bg-blue-600/80 text-xs px-2 py-1 rounded-full">
              {event}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function UniversityGallery() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/colleges');
        setColleges(response.data.colleges);
      } catch (err) {
        console.error(err);
        setError('Colleges load করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Decide which colleges to show
  const displayedColleges = showAll ? colleges : colleges.slice(0, 6);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-2 md:px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex justify-center items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            <span>Prestigious Universities of Bangladesh</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore the top universities with their admission timelines, events, and achievements.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading colleges...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedColleges.map((college, index) => (
              <CollegeCard key={college._id} college={college} index={index} />
            ))}
          </div>
        )}

        {colleges.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              {showAll ? 'Show Less' : 'View All Universities'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
