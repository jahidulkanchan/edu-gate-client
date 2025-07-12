// src/app/my-college/page.js
import MyCollegeClient from './MyCollegeClient';

export const metadata = {
  title: 'My College',
  description: 'View your booked college and add reviews.',
};

export default async function MyCollegePage() {
  // এখানে ইউজারের বুক করা কলেজ ডাটাবেজ থেকে ফেচ করতে পারো (auth token check করতে হবে)
  const bookedCollege = {
    name: 'ABC International College',
    image: 'https://thumbs.dreamstime.com/b/hall-building-college-sunrise-63035568.jpg',
    admissionDate: '2025-08-01',
    events: ['Orientation', 'Tech Fest'],
    research: 12,
    sports: ['Football', 'Basketball'],
  };

  // ইউজারের আগের রিভিউ থাকলে সেটাও পাঠাতে পারো
  const previousReview = {
    rating: 4,
    message: 'Great campus and excellent teachers!',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My College Info</h1>
      <MyCollegeClient college={bookedCollege} previousReview={previousReview} />
    </div>
  );
}
