"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function SavedColleges() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedColleges();
  }, []);

  const fetchSavedColleges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/saved', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setSavedItems(data);
    } catch (err) {
      console.error("Saved colleges fetch karne me error:", err);
    }
    setLoading(false);
  };

  
  const handleRemove = async (collegeId: string, e: any) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/saved', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId })
      });

      if (res.ok) {
      
        setSavedItems(prevItems => prevItems.filter((item: any) => item.college.id !== collegeId));
      }
    } catch (error) {
      alert("Failed to remove college");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6 sm:p-8 mt-4">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Your Shortlisted Colleges</h1>
          <p className="text-slate-500 text-lg">Saved Colleges.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium text-lg flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading saved colleges...
          </div>
        ) : savedItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-slate-500 text-xl font-medium">You Have Not Saved Any College yet</p>
            <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition mt-6 inline-block shadow-md">
              Browse Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item: any) => (
              <Link href={`/college/${item.college.id}`} key={item.id} className="block h-full outline-none">
                <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full relative">
                  
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-3 gap-3">
                        <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {item.college.name}
                        </h2>
                        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-sm font-bold border border-emerald-100">
                          ★ {item.college.rating}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm mb-5 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.college.location}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Fees</p>
                        <p className="text-lg font-bold text-slate-900">₹{item.college.fees.toLocaleString()}<span className="text-xs font-normal text-slate-500 ml-1">/yr</span></p>
                      </div>
                      
                      
                      <button 
                        onClick={(e) => handleRemove(item.college.id, e)}
                        className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-100 py-2.5 rounded-xl font-semibold hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove from List
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}