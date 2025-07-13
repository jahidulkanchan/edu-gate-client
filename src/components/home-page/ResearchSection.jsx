'use client';
import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function ResearchSection() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axiosInstance.get('/api/colleges');
        setColleges(res.data.colleges || []);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleCount(showAll ? 6 : colleges.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Recommended</span> Research Papers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover groundbreaking research contributions from top colleges across various disciplines.</p>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No research papers available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {colleges.slice(0, visibleCount).map((college) => (
                <div key={college._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-4">{college.researchHistory || 'This college has not shared research details yet.'}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Published: {college.researchDate || 'N/A'}</span>
                      <a href={college.researchLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Read Paper
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {colleges.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={toggleShowAll}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  {showAll ? (
                    <>
                      <ChevronUp className="mr-2 h-5 w-5" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-5 w-5" />
                      View All Research Papers
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
