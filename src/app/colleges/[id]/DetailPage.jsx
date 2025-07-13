'use client';

import axiosInstance from '@/lib/axios';
import { Award, BookOpen, Calendar, Clock, Globe, Library, Mail, MapPin, Phone, Star, Ticket, Trophy, Users } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DetailPage({ id }) {
  const [college, setCollege] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!id) return;
    
    const fetchCollege = async () => {
      try {
        const res = await axiosInstance.get(`api/colleges/${id}`);
        setCollege(res.data.college);
      } catch (err) {
        setError(err.message || 'Failed to load college data');
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading College</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/colleges" className="text-blue-600 hover:underline">
            ← Back to Colleges
          </Link>
        </div>
      </div>
    );

  if (!college)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-yellow-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-yellow-600 mb-4">College Not Found</h2>
          <Link href="/colleges" className="text-blue-600 hover:underline">
            ← Back to Colleges
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>{college.name} | College Details</title>
        <meta name="description" content={`Details about ${college.name}`} />
      </Head>

      <main className="bg-gray-50 min-h-screen pb-16">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 w-full bg-gray-900">
          {college?.imageUrl ? (
            <Image src={college.imageUrl} alt={`${college.name} campus image`} className="w-full h-full object-cover opacity-70" width={1200} height={400} />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center opacity-70">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{college.name}</h1>
              <div className="flex items-center justify-center space-x-4 text-white">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {college.location}
                </span>
                <span className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
                  {college.rating}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  About the College
                </h2>
                <p className="text-gray-700 mb-6">{college.description || 'No description available.'}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 mt-1 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Student Population</h3>
                      <p className="text-gray-600">{college.studentPopulation || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-5 h-5 mr-3 mt-1 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Accreditation</h3>
                      <p className="text-gray-600">{college.accreditation || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 mt-1 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Established</h3>
                      <p className="text-gray-600">{college.establishedYear || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Library className="w-5 h-5 mr-3 mt-1 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Library</h3>
                      <p className="text-gray-600">{college.library ? 'Available' : 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Academics Section */}
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                  Academics
                </h2>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Courses Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.courses?.length > 0 ? (
                      college.courses.map((course, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {course}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No courses listed</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Research History</h3>
                  <p className="text-gray-700">{college.researchHistory || 'No research information available.'}</p>
                </div>
              </section>

              {/* Gallery Section */}
              {college.gallery?.length > 0 && (
                <section className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {college.gallery.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${college.name} gallery ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                        width={300}
                        height={160}
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Admission Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Admission
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">Dates</h3>
                    <p>{college.admissionDates || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">Requirements</h3>
                    {college.admissionRequirements?.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {college.admissionRequirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No requirements listed</p>
                    )}
                  </div>
                  <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">Apply Now</button>
                </div>
              </div>

              {/* Events Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Ticket className="w-5 h-5 mr-2 text-orange-600" />
                  Upcoming Events
                </h2>
                {college.events?.length > 0 ? (
                  <ul className="space-y-3">
                    {college.events.map((event, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <Ticket className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{event.name || event}</h3>
                          {event.date && <p className="text-sm text-gray-500">{event.date}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No upcoming events</p>
                )}
              </div>

              {/* Sports Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                  Sports Facilities
                </h2>
                {college.sports?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {college.sports.map((sport, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {sport}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No sports listed</p>
                )}
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Contact
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 mr-3 mt-1 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Website</h3>
                      {college.website ? (
                        <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {college.website}
                        </a>
                      ) : (
                        <p className="text-gray-600">Not available</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-1 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">{college.email || 'Not available'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">{college.phone || 'Not available'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/colleges" className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            ← Back to Colleges
          </Link>
        </div>
      </main>
    </>
  );
}
