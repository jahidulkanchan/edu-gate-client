'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RxCross2 } from 'react-icons/rx';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const mobileMenuRef = useRef(null);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isAdmin = user?.isAdmin;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-700 shadow-lg' : 'bg-blue-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl flex items-center gap-1.5 font-bold text-white hover:text-blue-100 transition-colors" onClick={handleMobileLinkClick}>
            <Image className="w-[50px]" width={100} height={100} src="/logo.png" alt="logo" />
            EduGate
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            <NavLink className="hover:!bg-btn-bg !bg-transparent" href="/" text="Home" />
            <NavLink className="hover:!bg-btn-bg !bg-transparent" href="/colleges" text="Colleges" />

            {!isAdmin && (
              <>
                <NavLink className="hover:!bg-btn-bg !bg-transparent" href="/admission" text="Admission" />
                <NavLink className="hover:!bg-btn-bg !bg-transparent" href="/my-college" text="My College" />
              </>
            )}

            {isAdmin && <NavLink href="/admission-approvals" text="Approvals" className="hover:!bg-btn-bg !bg-transparent" />}

            {user && <NavLink className="hover:!bg-btn-bg !bg-transparent" href="/profile" text="Profile" />}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-white/80 px-4 py-2 rounded transition-colors text-blue-500 ml-2 font-medium cursor-pointer duration-200 flex items-center gap-1">
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-btn-bg  hover:bg-green-600 ml-10 px-4 py-2 rounded transition-colors text-white duration-200 flex items-center gap-1">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition-colors" aria-label="Toggle menu">
              {isOpen ? <RxCross2 size={35} /> : <HiOutlineMenuAlt4 size={35} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Animated */}
      <div ref={mobileMenuRef} className={`md:hidden bg-blue-700 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1">
          <MobileNavLink href="/" text="Home" onClick={handleMobileLinkClick} />
          <MobileNavLink href="/colleges" text="Colleges" onClick={handleMobileLinkClick} />

          {!isAdmin && (
            <>
              <MobileNavLink href="/admission" text="Admission" onClick={handleMobileLinkClick} />
              <MobileNavLink href="/my-college" text="My College" onClick={handleMobileLinkClick} />
            </>
          )}

          {isAdmin && <MobileNavLink href="/admission-approvals" text="Admission Approvals" className="bg-yellow-500 hover:bg-yellow-600" onClick={handleMobileLinkClick} />}

          {user && <MobileNavLink href="/profile" text="Profile" onClick={handleMobileLinkClick} />}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                handleMobileLinkClick();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors">
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for desktop
function NavLink({ href, text, className = '' }) {
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-800 transition-colors duration-200 ${className}`}>
      {text}
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({ href, text, onClick, className = '' }) {
  return (
    <Link href={href} onClick={onClick} className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 transition-colors ${className}`}>
      {text}
    </Link>
  );
}
