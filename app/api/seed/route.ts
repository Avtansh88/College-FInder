import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
  
    await prisma.savedCollege.deleteMany();
    
    
    await prisma.college.deleteMany();
    
   
    await prisma.college.createMany({
      data: [
       
        { name: "IIT Bombay", location: "Mumbai, Maharashtra", fees: 1200000, rating: 4.9, overview: "Premier engineering institute in India known for its tech culture.", courses: ["B.Tech CSE", "B.Tech Chemical"], placements: "Highest: 1.5 Cr | Average: 25 LPA" },
        { name: "IIT Delhi", location: "New Delhi, Delhi", fees: 1150000, rating: 4.9, overview: "Top-tier institute with strong alumni network in startups.", courses: ["B.Tech CSE", "B.Tech Mathematics"], placements: "Highest: 2 Cr | Average: 24 LPA" },
        { name: "IIT Madras", location: "Chennai, Tamil Nadu", fees: 1100000, rating: 4.9, overview: "Ranked #1 in NIRF consistently.", courses: ["B.Tech CSE", "B.Tech Aerospace"], placements: "Highest: 1.9 Cr | Average: 22 LPA" },
        { name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", fees: 1150000, rating: 4.8, overview: "Known for rigorous academics and research.", courses: ["B.Tech CSE", "B.Tech Electrical"], placements: "Highest: 1.9 Cr | Average: 23 LPA" },
        { name: "IIT Kharagpur", location: "Kharagpur, West Bengal", fees: 1250000, rating: 4.7, overview: "Oldest IIT with the largest campus.", courses: ["B.Tech CSE", "B.Tech Mechanical"], placements: "Highest: 2.6 Cr | Average: 21 LPA" },
        { name: "IIT Roorkee", location: "Roorkee, Uttarakhand", fees: 1180000, rating: 4.7, overview: "Excellent infrastructure and legacy.", courses: ["B.Tech CSE", "B.Tech Civil"], placements: "Highest: 1.3 Cr | Average: 20 LPA" },
        { name: "IIT Guwahati", location: "Guwahati, Assam", fees: 1150000, rating: 4.6, overview: "Beautiful campus and growing tech hub.", courses: ["B.Tech CSE", "B.Tech Design"], placements: "Highest: 1.2 Cr | Average: 21 LPA" },
        { name: "IIT (ISM) Dhanbad", location: "Dhanbad, Jharkhand", fees: 1100000, rating: 4.6, overview: "Legacy institute known for core and software engineering excellence.", courses: ["B.Tech CSE", "B.Tech Chemical", "B.Tech Petroleum"], placements: "Highest: 83 LPA | Average: 17 LPA" },
        { name: "IIT Hyderabad", location: "Hyderabad, Telangana", fees: 1200000, rating: 4.7, overview: "Fastest-growing new-gen IIT.", courses: ["B.Tech AI", "B.Tech CSE"], placements: "Highest: 1.5 Cr | Average: 22 LPA" },
        { name: "IIT BHU", location: "Varanasi, Uttar Pradesh", fees: 1150000, rating: 4.5, overview: "Rich legacy integrated with Banaras Hindu University.", courses: ["B.Tech CSE", "B.Tech Mining"], placements: "Highest: 1.2 Cr | Average: 19 LPA" },
        
        // --- NITs ---
        { name: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", fees: 700000, rating: 4.8, overview: "Top-ranked NIT in India.", courses: ["B.Tech CSE", "B.Tech ECE"], placements: "Highest: 1.0 Cr | Average: 18 LPA" },
        { name: "NIT Surathkal", location: "Mangalore, Karnataka", fees: 720000, rating: 4.7, overview: "Private beach and excellent tech placements.", courses: ["B.Tech IT", "B.Tech CSE"], placements: "Highest: 90 LPA | Average: 17 LPA" },
        { name: "NIT Warangal", location: "Warangal, Telangana", fees: 710000, rating: 4.6, overview: "Strong coding culture and alumni base.", courses: ["B.Tech CSE", "B.Tech EEE"], placements: "Highest: 88 LPA | Average: 17.5 LPA" },
        { name: "MNNIT Allahabad", location: "Prayagraj, Uttar Pradesh", fees: 680000, rating: 4.5, overview: "Famous for its stellar CSE placements.", courses: ["B.Tech CSE", "B.Tech IT"], placements: "Highest: 1.1 Cr | Average: 20 LPA" },
        { name: "NIT Rourkela", location: "Rourkela, Odisha", fees: 650000, rating: 4.5, overview: "Great research facilities and diverse branches.", courses: ["B.Tech CSE", "B.Tech Biomedical"], placements: "Highest: 83 LPA | Average: 15 LPA" },
        { name: "MNIT Jaipur", location: "Jaipur, Rajasthan", fees: 690000, rating: 4.4, overview: "Vibrant campus in the Pink City.", courses: ["B.Tech CSE", "B.Tech ECE"], placements: "Highest: 64 LPA | Average: 14 LPA" },
        { name: "NIT Calicut", location: "Kozhikode, Kerala", fees: 700000, rating: 4.4, overview: "Top engineering college in Kerala.", courses: ["B.Tech CSE", "B.Tech Architecture"], placements: "Highest: 67 LPA | Average: 14.5 LPA" },
        { name: "NIT Kurukshetra", location: "Kurukshetra, Haryana", fees: 670000, rating: 4.3, overview: "Strong north Indian presence and coding clubs.", courses: ["B.Tech IT", "B.Tech CSE"], placements: "Highest: 55 LPA | Average: 13 LPA" },
        { name: "VNIT Nagpur", location: "Nagpur, Maharashtra", fees: 710000, rating: 4.3, overview: "Excellent location and core placements.", courses: ["B.Tech CSE", "B.Tech Mechanical"], placements: "Highest: 60 LPA | Average: 12 LPA" },
        { name: "NIT Durgapur", location: "Durgapur, West Bengal", fees: 660000, rating: 4.2, overview: "One of the oldest REC converted to NIT.", courses: ["B.Tech CSE", "B.Tech Metallurgy"], placements: "Highest: 50 LPA | Average: 11 LPA" },

        // --- IIITs ---
        { name: "IIIT Hyderabad", location: "Hyderabad, Telangana", fees: 1400000, rating: 4.9, overview: "Best coding culture and research output in India.", courses: ["B.Tech CSE", "B.Tech ECE"], placements: "Highest: 1.8 Cr | Average: 30 LPA" },
        { name: "IIIT Allahabad", location: "Prayagraj, Uttar Pradesh", fees: 800000, rating: 4.7, overview: "Incredible placements for IT and ECE.", courses: ["B.Tech IT", "B.Tech ECE"], placements: "Highest: 1.2 Cr | Average: 24 LPA" },
        { name: "IIIT Bangalore", location: "Bangalore, Karnataka", fees: 1600000, rating: 4.6, overview: "Located in India's Silicon Valley.", courses: ["iMTech CSE", "iMTech ECE"], placements: "Highest: 1.5 Cr | Average: 25 LPA" },
        { name: "IIIT Delhi", location: "New Delhi, Delhi", fees: 1700000, rating: 4.5, overview: "Great research focus and modern curriculum.", courses: ["B.Tech CSE", "B.Tech CSAM"], placements: "Highest: 90 LPA | Average: 21 LPA" },
        { name: "IIIT Gwalior", location: "Gwalior, Madhya Pradesh", fees: 850000, rating: 4.3, overview: "Provides dual degree programs in IT and MBA.", courses: ["IPG M.Tech", "IPG MBA"], placements: "Highest: 65 LPA | Average: 18 LPA" },
        
        // --- Top Private & State Universities ---
        { name: "BITS Pilani", location: "Pilani, Rajasthan", fees: 2400000, rating: 4.8, overview: "Top private engineering college with zero attendance policy.", courses: ["B.E. CSE", "B.E. EEE"], placements: "Highest: 60 LPA | Average: 20 LPA" },
        { name: "BITS Goa", location: "Zuarinagar, Goa", fees: 2300000, rating: 4.6, overview: "Incredible campus life and strong academics.", courses: ["B.E. CSE", "B.E. Mechanical"], placements: "Highest: 55 LPA | Average: 18 LPA" },
        { name: "BITS Hyderabad", location: "Hyderabad, Telangana", fees: 2350000, rating: 4.5, overview: "Close to IT hubs with fast-growing reputation.", courses: ["B.E. CSE", "B.E. Chemical"], placements: "Highest: 50 LPA | Average: 17 LPA" },
        { name: "VIT Vellore", location: "Vellore, Tamil Nadu", fees: 1800000, rating: 4.2, overview: "Massive campus with huge student intake.", courses: ["B.Tech CSE", "B.Tech IT"], placements: "Highest: 1.0 Cr | Average: 8 LPA" },
        { name: "MIT Manipal", location: "Manipal, Karnataka", fees: 1900000, rating: 4.3, overview: "Famous for student life and Satya Nadella.", courses: ["B.Tech CSE", "B.Tech ECE"], placements: "Highest: 55 LPA | Average: 10 LPA" },
        { name: "Thapar Institute", location: "Patiala, Punjab", fees: 2000000, rating: 4.2, overview: "Well-respected private college in North India.", courses: ["B.Tech CSE", "B.Tech COE"], placements: "Highest: 45 LPA | Average: 11 LPA" },
        { name: "SRM Chennai", location: "Chennai, Tamil Nadu", fees: 1600000, rating: 4.0, overview: "Large infrastructure and active tech clubs.", courses: ["B.Tech CSE", "B.Tech Software"], placements: "Highest: 50 LPA | Average: 7 LPA" },
        { name: "Jadavpur University", location: "Kolkata, West Bengal", fees: 12000, rating: 4.7, overview: "Highest ROI college in India.", courses: ["B.Tech CSE", "B.Tech IT"], placements: "Highest: 1.1 Cr | Average: 21 LPA" },
        { name: "DTU", location: "New Delhi, Delhi", fees: 900000, rating: 4.6, overview: "Formerly DCE, incredible tech hub in Delhi.", courses: ["B.Tech CSE", "B.Tech SE"], placements: "Highest: 1.2 Cr | Average: 16 LPA" },
        { name: "NSUT", location: "New Delhi, Delhi", fees: 920000, rating: 4.5, overview: "Strong competitor to DTU with great coding culture.", courses: ["B.Tech CSE", "B.Tech IT"], placements: "Highest: 1.0 Cr | Average: 15 LPA" },
        { name: "RVCE Bangalore", location: "Bangalore, Karnataka", fees: 1200000, rating: 4.4, overview: "Top state college in Karnataka.", courses: ["B.Tech CSE", "B.Tech ISE"], placements: "Highest: 55 LPA | Average: 11 LPA" },
        { name: "COEP Pune", location: "Pune, Maharashtra", fees: 400000, rating: 4.5, overview: "Legacy state college in Maharashtra.", courses: ["B.Tech CSE", "B.Tech Mechanical"], placements: "Highest: 40 LPA | Average: 10 LPA" },
        { name: "VJTI Mumbai", location: "Mumbai, Maharashtra", fees: 350000, rating: 4.4, overview: "Heart of Mumbai, great local placements.", courses: ["B.Tech IT", "B.Tech CSE"], placements: "Highest: 45 LPA | Average: 9 LPA" },
        { name: "DA-IICT", location: "Gandhinagar, Gujarat", fees: 950000, rating: 4.6, overview: "Focused purely on ICT branches.", courses: ["B.Tech ICT", "B.Tech CS"], placements: "Highest: 55 LPA | Average: 16 LPA" },
        { name: "LNMIIT Jaipur", location: "Jaipur, Rajasthan", fees: 1600000, rating: 4.3, overview: "Fast growing private tech institute.", courses: ["B.Tech CSE", "B.Tech CCE"], placements: "Highest: 40 LPA | Average: 13 LPA" },
        { name: "PEC Chandigarh", location: "Chandigarh", fees: 750000, rating: 4.3, overview: "Kalpana Chawla's alma mater.", courses: ["B.Tech CSE", "B.Tech Aerospace"], placements: "Highest: 42 LPA | Average: 12 LPA" },
        { name: "BMSCE Bangalore", location: "Bangalore, Karnataka", fees: 1100000, rating: 4.2, overview: "Prime location in Bangalore.", courses: ["B.Tech CSE", "B.Tech ECE"], placements: "Highest: 35 LPA | Average: 8 LPA" },
        { name: "Amrita Vishwa Vidyapeetham", location: "Coimbatore, Tamil Nadu", fees: 1500000, rating: 4.1, overview: "Ranked high in NIRF.", courses: ["B.Tech CSE", "B.Tech AIE"], placements: "Highest: 30 LPA | Average: 6 LPA" },
        { name: "KIIT Bhubaneswar", location: "Bhubaneswar, Odisha", fees: 1800000, rating: 3.9, overview: "Known for diverse student crowd.", courses: ["B.Tech CSE", "B.Tech IT"], placements: "Highest: 50 LPA | Average: 7 LPA" },
        { name: "Nirma University", location: "Ahmedabad, Gujarat", fees: 1200000, rating: 4.1, overview: "Top private university in Gujarat.", courses: ["B.Tech CSE", "B.Tech EC"], placements: "Highest: 30 LPA | Average: 8 LPA" }
      ]
    });
    
    return NextResponse.json({ message: "45 Top Colleges seeded successfully!" });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}