'use client';


import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyCollegeClient({ college, previousReview }) {
  const router = useRouter();
  const [review, setReview] = useState(previousReview?.message || '');
  const [rating, setRating] = useState(previousReview?.rating || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে POST API কল করে রিভিউ সাবমিট করো
    console.log('Review Submitted:', { rating, review });
     router.push('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={college.image} alt={college.name} className="w-full md:w-1/3 rounded-md object-cover" />
        <div>
          <h2 className="text-2xl font-semibold">{college.name}</h2>
          <p>
            <strong>Admission Date:</strong> {college.admissionDate}
          </p>
          <p>
            <strong>Research Papers:</strong> {college.research}
          </p>
          <p>
            <strong>Events:</strong> {college.events.join(', ')}
          </p>
          <p>
            <strong>Sports:</strong> {college.sports.join(', ')}
          </p>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <h3 className="text-xl font-semibold">Leave a Review</h3>

        <div>
          <label className="block mb-1 font-medium">Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border px-3 py-2 rounded w-full" required>
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val} Star{val > 1 && 's'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Review:</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your feedback..." className="border px-3 py-2 rounded w-full h-24" required />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Submit Review
        </button>
      </form>
    </div>
  );
}
