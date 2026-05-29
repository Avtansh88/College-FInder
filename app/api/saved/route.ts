import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-college-app';


export async function POST(request: Request) {
  try {
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    
    const body = await request.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json({ error: "College ID is required" }, { status: 400 });
    }

    
    const saved = await prisma.savedCollege.create({
      data: {
        userId: decoded.userId,
        collegeId: collegeId,
      }
    });

    return NextResponse.json({ message: "College saved successfully!", saved }, { status: 201 });

  } catch (error: any) {
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Yeh college pehle se saved hai" }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    
    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: decoded.userId },
      include: {
        college: true 
      }
    });

    return NextResponse.json(savedColleges);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch saved colleges" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key-for-college-app') as { userId: string };
    
   
    const body = await req.json();
    const { collegeId } = body;


    await prisma.savedCollege.deleteMany({
      where: {
        userId: decoded.userId,
        collegeId: collegeId
      }
    });

    return NextResponse.json({ message: "College removed successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove college" }, { status: 500 });
  }
}