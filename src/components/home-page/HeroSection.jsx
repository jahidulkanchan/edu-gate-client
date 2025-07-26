'use client';

import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br 2xl:min-h-[700px] from-blue-600 to-indigo-800 text-white py-10 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl flex justify-center items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Animated heading */}
        <div className="animate-fade-in animate-delay-100 mb-5">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  mb-4 leading-20 bg-clip-text text-transparent bg-white">
              Discover Your <span className="block sm:inline-block">Perfect College Match</span>
            </h1>
            <p className="text-lg md:text-lg lg:text-xl mx-auto opacity-90 leading-relaxed text-white">
              Find, compare, and book college facilities with our comprehensive platform.
              Start your educational journey today.
            </p>
          </div>
        </div>

        {/* Using your SearchBar component */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />

          {/* Quick search tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Engineering', 'Medical', 'Business', 'Arts', 'Sports Facilities'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm cursor-pointer transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-8 w-8 rounded-full bg-white border-2 border-blue-600"></div>
              ))}
            </div>
            <span>Trusted by 10,000+ students</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-white/30"></div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.9/5 from 2,500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
