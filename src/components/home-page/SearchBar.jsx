'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
import { useDebounce } from 'use-debounce'; // You'll need to install this package

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 500); // 500ms debounce
  const inputRef = useRef(null);

  useEffect(() => {
    if (debouncedSearchText.trim()) {
      handleSearch(debouncedSearchText);
    } else {
      setResults([]);
      setNotFound(false);
    }
  }, [debouncedSearchText]);

  const handleSearch = async (query) => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await axiosInstance.get(`/api/colleges/search?name=${query}`);
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

  const handleClear = () => {
    setSearchText('');
    setResults([]);
    setNotFound(false);
    inputRef.current.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Input container */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search colleges by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full pl-10 outline-0 pr-10 py-3 rounded-lg border focus:ring-1 border-gray-300 shadow-sm transition-all duration-200"
            autoComplete="off"
          />
          {searchText && (
            <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isFocused && (results.length > 0 || notFound || loading) && (
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
                    <div className="flex justify-between items-center p-4">
                      <div className="text-left">
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
                      <Link
                        href={`/colleges/${college._id}`}
                        className="block w-fit h-fit items-center px-5 py-1.5 rounded-full font-medium bg-blue-100 text-blue-800"
                        onClick={() => setIsFocused(false)}>
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
