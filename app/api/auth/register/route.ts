import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are madantory" }, { status: 400 });
    }

   
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User Already resgistered" }, { status: 400 });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User successfully register ho gaya!", userId: newUser.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration mein error aayi" }, { status: 500 });
  }
}