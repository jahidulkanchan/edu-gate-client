'use client';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="opacity-0 animate-fade-in [animation-fill-mode:forwards]">
          <GraduationCap className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to find your <span className="text-yellow-300">dream college</span>?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-95">Join {new Intl.NumberFormat('en-US').format(10000)}+ students who discovered their perfect academic match</p>

          <Link
            href="/colleges"
            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-8 w-8 rounded-full bg-white border-2 border-blue-600"></div>
              ))}
            </div>
            <span>Trusted by students worldwide</span>
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
            <span>Rated 4.9/5 by students</span>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or CSS module */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
