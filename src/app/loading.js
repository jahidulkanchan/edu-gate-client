// src/app/loading.js'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
      <Loader2 className="animate-spin text-blue-600" size={48} />
      <p className="mt-4 text-gray-700 text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
}

