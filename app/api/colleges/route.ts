import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get('search') || '';
  const maxFees = searchParams.get('maxFees');
  const minRating = searchParams.get('minRating');
  
 
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
   
    const whereClause: any = {
      name: {
        contains: search,
        mode: 'insensitive', 
      },
    };

   
    if (maxFees) {
      whereClause.fees = { lte: Number(maxFees) }; 
    }
    if (minRating) {
      whereClause.rating = { gte: Number(minRating) }; 
    }

   
    const colleges = await prisma.college.findMany({
      where: whereClause,
      orderBy: { rating: 'desc' }, 
      skip: skip,
      take: limit,
    });

    const totalColleges = await prisma.college.count({ where: whereClause });

    
    return NextResponse.json({
      data: colleges,
      meta: {
        total: totalColleges,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalColleges / limit)
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Data fetch karne me dikkat aayi" }, { status: 500 });
  }
}