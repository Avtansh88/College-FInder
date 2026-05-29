"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function QAPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchQuestions();
    if (localStorage.getItem('token')) setIsLoggedIn(true);
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Error fetching questions");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) return alert("Please login to ask a question!");

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        fetchQuestions(); 
      }
    } catch (error) {
      alert("Failed to post question");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      <div className="max-w-5xl mx-auto p-6 sm:p-8 mt-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Student Community</h1>
          <p className="text-slate-500 text-lg">Ask questions, share experiences, and help fellow students.</p>
        </div>

        
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
            <h3 className="text-xl font-bold mb-4 text-indigo-600">Ask a Question</h3>
            <input 
              type="text" 
              placeholder="Question Title (e.g., How are the CSE placements at NIT Warangal?)" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mb-4 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
            <textarea 
              placeholder="Provide some details..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={3}
              className="w-full mb-4 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Post Question
            </button>
          </form>
        ) : (
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-10 text-center">
            <p className="text-indigo-700 font-medium mb-3">You need to be logged in to ask a question.</p>
            <Link href="/login" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Login Here</Link>
          </div>
        )}

        
        <div className="space-y-4">
          {loading ? <p className="text-center text-slate-500">Loading discussions...</p> : 
            questions.map((q: any) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{q.title}</h2>
                <p className="text-slate-600 line-clamp-2 mb-4">{q.content}</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span className="font-medium bg-slate-100 px-3 py-1 rounded-full">Asked by {q.user?.name || "Student"}</span>
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    {q._count?.answers || 0} Answers
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}