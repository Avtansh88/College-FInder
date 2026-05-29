"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CollegeCard from "@/components/CollegeCard";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [loading, setLoading] = useState(true);

  // Jab bhi search ya fees change ho, API call hogi
  useEffect(() => {
    fetchColleges();
  }, [search, maxFees]);

  const fetchColleges = async () => {
    setLoading(true);
    let url = `/api/colleges?search=${search}`;
    if (maxFees) url += `&maxFees=${maxFees}`;
    
    try {
      const res = await fetch(url);
      const result = await res.json();
      setColleges(result.data || []);
    } catch (err) {
      console.error("Error fetching colleges", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Discover Top Colleges</h1>
        
        {/* Search & Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <input
            type="text"
            placeholder="Search colleges by name..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <select 
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
          >
            <option value="">Any Fees</option>
            <option value="1000000">Under ₹10 Lakhs</option>
            <option value="1500000">Under ₹15 Lakhs</option>
            <option value="2000000">Under ₹20 Lakhs</option>
          </select>
        </div>

        {/* Loading State & Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading colleges...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No colleges found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college: any) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}