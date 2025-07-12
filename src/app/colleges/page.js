import React from 'react';
import CollegesList from './CollegesList';


export default function CollegesPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Colleges List</h1>
      <CollegesList />
    </main>
  );
}
