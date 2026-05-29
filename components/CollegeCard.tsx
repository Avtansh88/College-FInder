"use client";
import Link from 'next/link';

export default function CollegeCard({ college }: { college: any }) {
  
  const handleSave = async (e: any) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Please login to save colleges!");
      return;
    }

    try {
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId: college.id })
      });
      const data = await res.json();
      if (res.ok) alert("College saved successfully!");
      else alert(data.error);
    } catch (err) {
      alert("Failed to save college");
    }
  };

  return (
    <Link href={`/college/${college.id}`} className="block h-full outline-none">
      <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full relative">
        
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
          
      
          <div>
            <div className="flex justify-between items-start mb-3 gap-3">
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {college.name}
              </h2>
           
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-sm font-bold border border-emerald-100 whitespace-nowrap">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {college.rating}
              </span>
            </div>
            
            
            <p className="text-slate-500 text-sm mb-5 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {college.location}
            </p>
          </div>
          
         
          <div className="mt-auto">
          
            <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Fees</p>
              <p className="text-lg font-bold text-slate-900">
                ₹{college.fees.toLocaleString()}<span className="text-xs font-normal text-slate-500 ml-1">/yr</span>
              </p>
            </div>
            
           
            <button 
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 py-2.5 rounded-xl font-semibold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save College
            </button>
          </div>
          
        </div>
      </div>
    </Link>
  );
}