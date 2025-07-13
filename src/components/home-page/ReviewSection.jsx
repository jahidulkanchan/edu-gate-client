'use client';
import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Star, Quote, User, ThumbsUp } from 'lucide-react';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/api/reviews');
        setReviews(res.data || []);
      } catch (err) {
        console.error('Failed to load reviews', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <ThumbsUp className="h-5 w-5" />
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Student</span> Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hear what our students say about their college experiences</p>
        </div>

        <Marquee pauseOnHover gradient={false} speed={40}>
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-lg p-6 mx-4 min-w-[320px] max-w-[360px] hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-100" />
                <p className="text-gray-700 italic pl-4">"{review.reviewText}"</p>
                <Quote className="absolute -bottom-2 -right-2 h-6 w-6 text-blue-100 transform rotate-180" />
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.userName}</p>
                  <p className="text-xs text-gray-500">{review.collegeName || 'Anonymous College'}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
