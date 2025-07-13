'use client';
import { useState, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setLoading(true);
    setNotFound(false);

    try {
      const res = await axiosInstance.get(`/api/colleges/search?name=${searchText}`);
      if (res.data.colleges.length > 0) {
        setResults(res.data.colleges);
      } else {
        setResults([]);
        setNotFound(true);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchText]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search colleges by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
        />
        {searchText && (
          <button
            onClick={() => {
              setSearchText('');
              setResults([]);
              setNotFound(false);
            }}
            className="absolute right-14 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={loading || !searchText.trim()}
          className={`ml-2 px-4 py-3 rounded-lg flex items-center gap-1 transition-all duration-200 ${
            loading || !searchText.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {/* Search Results Dropdown */}
      {(isFocused && results.length > 0) || notFound || loading ? (
        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200">
          {loading && (
            <div className="p-4 flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Searching colleges...</span>
            </div>
          )}

          {notFound && (
            <div className="p-4 text-center text-gray-500">
              <p>No colleges found matching "{searchText}"</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {results.map((college) => (
                <li key={college._id} className="hover:bg-gray-50 transition-colors">
                  <Link href={`/colleges/${college._id}`} className="block p-4" onClick={() => setIsFocused(false)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{college.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Admission:</span> {college.admissionDates}
                        </p>
                        {college.events?.length > 0 && (
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">Events:</span> {college.events.slice(0, 3).join(', ')}
                            {college.events.length > 3 && '...'}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">View</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
