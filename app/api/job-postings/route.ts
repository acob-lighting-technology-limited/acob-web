import { NextResponse } from 'next/server';
import { getJobPostings } from '@/sanity/lib/client';

export async function GET() {
  try {
    const jobPostings = await getJobPostings();
    return NextResponse.json(jobPostings);
  } catch (error) {
    console.error('Error fetching job postings:', error);
    return NextResponse.json([], { status: 500 });
  }
}
