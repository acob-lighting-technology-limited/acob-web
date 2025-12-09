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
    const formData = await request.formData();

    // Extract form fields
    const jobTitle = formData.get('jobTitle') as string;
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const linkedin = formData.get('linkedin') as string;
    const portfolio = formData.get('portfolio') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const experience = formData.get('experience') as string;
    const education = formData.get('education') as string;
    const availability = formData.get('availability') as string;
    const resumeFile = formData.get('resume') as globalThis.Blob | null;

    // Validate required fields
    const requiredFields = [
      'jobTitle',
      'fullName',
      'email',
      'phone',
      'coverLetter',
    ];
    const missingFields = requiredFields.filter(
      field => !formData.get(field)?.toString().trim(),
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Handle resume file
    let resumeAttachment = null;
    let resumeFileName = '';
    if (resumeFile && resumeFile instanceof globalThis.File) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      resumeFileName = resumeFile.name;

      resumeAttachment = {
        filename: resumeFileName,
        content: base64,
      };
    }

    // Send email using Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.error('RESEND_API_KEY is not configured');
      }
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    // Use environment variable for recipient email, fallback to main email
    const CAREERS_RECIPIENT_EMAIL =
      process.env.CAREERS_RECIPIENT_EMAIL || 'info@acoblighting.com';

    const emailBody = {
      from: 'onboarding@resend.dev',
      to: [CAREERS_RECIPIENT_EMAIL],
      subject: `New Job Application - ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Job Application - ACOB Lighting Technology</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #fafafa; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); padding: 40px 30px; text-align: center;">
              <div style="margin-bottom: 25px;">
                <img src="https://www.acoblighting.com/images/acob-logo-light.png" alt="ACOB Lighting Technology" style="height: 60px; width: auto; max-width: 200px;">
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                New Job Application
              </h1>
              <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0; font-size: 16px;">
                Application for ${jobTitle}
              </p>
              <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #22c55e, #16a34a); margin: 20px auto 0; border-radius: 2px;"></div>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">

              <!-- Applicant Information -->
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #15803d;">
                <h2 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 700;">
                  <span style="margin-right: 12px;">👤</span>Applicant Information
                </h2>

                <div style="display: grid; gap: 15px;">
                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">Full Name:</span>
                    <span style="color: #1f2937; font-size: 16px;">${fullName}</span>
                  </div>

                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">Email:</span>
                    <span style="color: #1f2937; font-size: 16px;">${email}</span>
                  </div>

                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">Phone:</span>
                    <span style="color: #1f2937; font-size: 16px;">${phone}</span>
                  </div>

                  ${
                    location
                      ? `
                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">Location:</span>
                    <span style="color: #1f2937; font-size: 16px;">${location}</span>
                  </div>
                  `
                      : ''
                  }

                  ${
                    linkedin
                      ? `
                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">LinkedIn:</span>
                    <a href="${linkedin}" style="color: #15803d; font-size: 16px; text-decoration: none;">${linkedin}</a>
                  </div>
                  `
                      : ''
                  }

                  ${
                    portfolio
                      ? `
                  <div>
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 5px;">Portfolio:</span>
                    <a href="${portfolio}" style="color: #15803d; font-size: 16px; text-decoration: none;">${portfolio}</a>
                  </div>
                  `
                      : ''
                  }
                </div>
              </div>

              <!-- Cover Letter -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                <h2 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 700;">
                  <span style="margin-right: 12px;">📝</span>Cover Letter
                </h2>
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e;">
                  <p style="color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-line; margin: 0;">${coverLetter}</p>
                </div>
              </div>

              ${
                experience
                  ? `
              <!-- Experience -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                <h2 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 700;">
                  <span style="margin-right: 12px;">💼</span>Relevant Experience
                </h2>
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e;">
                  <p style="color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-line; margin: 0;">${experience}</p>
                </div>
              </div>
              `
                  : ''
              }

              ${
                education
                  ? `
              <!-- Education -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                <h2 style="color: #166534; margin: 0 0 15px; font-size: 20px; font-weight: 700;">
                  <span style="margin-right: 12px;">🎓</span>Education
                </h2>
                <p style="color: #374151; font-size: 15px; margin: 0;">${education}</p>
              </div>
              `
                  : ''
              }

              ${
                availability
                  ? `
              <!-- Availability -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                <h2 style="color: #166534; margin: 0 0 15px; font-size: 20px; font-weight: 700;">
                  <span style="margin-right: 12px;">📅</span>Availability
                </h2>
                <p style="color: #374151; font-size: 15px; margin: 0;">${availability}</p>
              </div>
              `
                  : ''
              }

              ${
                resumeFileName
                  ? `
              <!-- Resume -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%); border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
                <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                  📎 Resume attached: ${resumeFileName}
                </p>
              </div>
              `
                  : ''
              }

              <!-- Action Button -->
              <div style="margin-top: 30px; text-align: center;">
                <div style="display: inline-block; background: linear-gradient(135deg, #15803d 0%, #166534 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                  💼 New Application Received
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <div style="margin-bottom: 20px;">
                <img src="https://www.acoblighting.com/images/acob-logo-dark.png" alt="ACOB Lighting Technology" style="height: 40px; width: auto; margin-bottom: 10px;">
                <p style="margin: 0; color: #374151; font-size: 14px; font-weight: 500;">
                  ACOB Lighting Technology Limited
                </p>
                <p style="margin: 5px 0 0; color: #6b7280; font-size: 13px;">
                  Careers & Talent Acquisition
                </p>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                  This application was submitted via the ACOB Lighting careers page.<br>
                  <span style="color: #9ca3af;">Received on ${new Date().toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    },
                  )}</span>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: email,
      ...(resumeAttachment && { attachments: [resumeAttachment] }),
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend API error:', errorData);
      }
      return NextResponse.json(
        { error: 'Failed to send application' },
        { status: 500 },
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, messageId: result.id });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in job-application API:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
