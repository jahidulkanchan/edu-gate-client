// src/app/page.js
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
  {/* <!-- Hero Section --> */}
  <section className="bg-gradient-to-r text-black from-blue-800 to-blue-600 text-white py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to College Booking</h1>
      <p className="text-xl md:text-2xl mb-8">Find and book the perfect college for your future</p>
      
      {/* <!-- Search Box --> */}
      <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto overflow-hidden">
        {/* <!-- Tabs --> */}
        <div className="flex border-b">
          <button className="flex-1 py-4 px-6 font-medium text-blue-600 border-b-2 border-blue-600">Find Colleges</button>
          <button className="flex-1 py-4 px-6 font-medium text-gray-500 hover:text-blue-600">Compare Colleges</button>
          <button className="flex-1 py-4 px-6 font-medium text-gray-500 hover:text-blue-600">Book Visits</button>
        </div>
        
        {/* <!-- Search Fields --> */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 text-black gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input type="text" placeholder="City or State" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Program</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Select a program</option>
              <option>Engineering</option>
              <option>Business</option>
              <option>Arts</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200">
              Search Colleges
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- Features Section --> */}
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Why Use College Booking?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* <!-- Feature 1 --> */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-200">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
          <p className="text-gray-600">Schedule campus visits with just a few clicks</p>
        </div>
        
        {/* <!-- Feature 2 --> */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-200">
          <div className="text-4xl mb-4">🏫</div>
          <h3 className="text-xl font-semibold mb-2">500+ Colleges</h3>
          <p className="text-gray-600">Access to institutions nationwide</p>
        </div>
        
        {/* <!-- Feature 3 --> */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-200">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
          <p className="text-gray-600">Real student experiences and ratings</p>
        </div>
        
        {/* <!-- Feature 4 --> */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-200">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Smart Filters</h3>
          <p className="text-gray-600">Find your perfect college match</p>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- Popular Colleges Section --> */}
  <section className="py-16 px-4 bg-gray-100">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Colleges</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <!-- College Card 1 --> */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200">
          <div className="h-48 bg-blue-500 flex items-center justify-center text-white text-4xl">SU</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">State University</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-2 text-gray-600">4.5</span>
            </div>
            <p className="text-gray-600 mb-4">New York, NY</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200">
              Book Visit
            </button>
          </div>
        </div>
        
        {/* <!-- College Card 2 --> */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200">
          <div className="h-48 bg-green-500 flex items-center justify-center text-white text-4xl">TU</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Tech University</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-600 mb-4">San Francisco, CA</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200">
              Book Visit
            </button>
          </div>
        </div>
        
        {/* <!-- College Card 3 --> */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200">
          <div className="h-48 bg-purple-500 flex items-center justify-center text-white text-4xl">AU</div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Arts University</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★☆☆</span>
              <span className="ml-2 text-gray-600">3.8</span>
            </div>
            <p className="text-gray-600 mb-4">Chicago, IL</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200">
              Book Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- CTA Section --> */}
  <section className="py-20 px-4 bg-blue-700 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your future college?</h2>
      <p className="text-xl mb-8">Join thousands of students who found their perfect match</p>
      <button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full text-lg transition duration-200">
        Get Started Now
      </button>
    </div>
  </section>
</main>
  );
}
