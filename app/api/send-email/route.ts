// app/api/send-email/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/utils/rate-limit';
import { RATE_LIMITS } from '@/lib/constants/ui';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const isRateLimited = rateLimit(request, {
    interval: RATE_LIMITS.EMAIL_API.interval,
    uniqueTokenPerInterval: RATE_LIMITS.EMAIL_API.maxRequests,
  });

  if (isRateLimited) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again in a few minutes.',
        code: 'RATE_LIMIT_EXCEEDED',
      },
      {
        status: 429,
        headers: { 'Retry-After': '300' },
      },
    );
  }

  try {
    const formData = await request.json();

    // Validate quote form fields
    const requiredFields = [
      'installer',
      'completionTime',
      'systemType',
      'panelPlace',
      'roofMaterial',
    ];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 },
      );
    }

    // Email functionality disabled per user request
    return NextResponse.json(
      {
        success: true,
        message:
          'Quote request received. Our team will contact you shortly via your preferred contact method.',
        disabled: true,
      },
      { status: 200 },
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in send-email API:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
