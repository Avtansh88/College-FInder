import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';


export default async function CollegeDetail({ params }: { params: Promise<{ id: string }> }) {
  
  
  const resolvedParams = await params;
  const collegeId = resolvedParams.id;


  const college = await prisma.college.findUnique({
    where: { id: collegeId }
  });

  if (!college) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6 sm:p-8 mt-6 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        
       
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-8 group transition-colors">
          <svg className="w-5 h-5 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{college.name}</h1>
            <p className="text-slate-500 text-lg mt-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {college.location}
            </p>
          </div>
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xl font-bold border border-emerald-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {college.rating}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <div className="bg-indigo-50 p-6 rounded-2xl flex-1 text-center border border-indigo-100">
            <p className="text-sm text-indigo-600 font-bold uppercase tracking-widest mb-2">Annual Fees</p>
            <p className="text-3xl font-extrabold text-slate-900">₹{college.fees.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl flex-1 text-center border border-purple-100">
            <p className="text-sm text-purple-600 font-bold uppercase tracking-widest mb-2">Placements</p>
            <p className="text-lg font-bold text-slate-800">{college.placements}</p>
          </div>
        </div>

        <div className="mt-12 space-y-10">
         <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Overview
            </h3>
            
           
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-start">
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {college.overview}
              </p>
              
           
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' official website')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-indigo-600 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors shadow-sm active:scale-95"
              >
                Website Search
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Top Courses
            </h3>
            <div className="flex flex-wrap gap-3">
              {college.courses.map((course, idx) => (
                <span key={idx} className="bg-white border-2 border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                  {course}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}