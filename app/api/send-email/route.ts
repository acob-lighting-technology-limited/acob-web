// app/api/send-email/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'message',
    ];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim()
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Send email using Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['chibuikemichaelilonze@gmail.com'], // Replace with your business email
        subject: `New Energy Audit Request from ${formData.firstName} ${formData.lastName}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Energy Audit Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">⚡</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Energy Audit Request</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">You have received a new inquiry</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Client Information Card -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">👤</span>Client Information
                </h2>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px; margin-right: 15px;">Name:</span>
                    <span style="color: #1e293b; font-size: 16px;">${formData.firstName} ${formData.lastName}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px; margin-right: 15px;">Email:</span>
                    <a href="mailto:${formData.email}" style="color: #667eea; text-decoration: none; font-size: 16px; border-bottom: 1px solid transparent; transition: border-color 0.2s;">${formData.email}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px; margin-right: 15px;">Phone:</span>
                    <a href="tel:${formData.phone}" style="color: #1e293b; text-decoration: none; font-size: 16px;">${formData.phone}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px; margin-right: 15px;">Company:</span>
                    <span style="color: #1e293b; font-size: 16px;">${formData.company || '<em style="color: #64748b;">Not provided</em>'}</span>
                  </div>
                </div>
              </div>

              <!-- Project Details Card -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📋</span>Project Details
                </h2>
                
                <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981; line-height: 1.6;">
                  <p style="margin: 0; color: #374151; font-size: 15px; white-space: pre-line;">${formData.message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${formData.email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 0 10px; transition: transform 0.2s;">
                  Reply to Client
                </a>
                <a href="tel:${formData.phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 0 10px; transition: transform 0.2s;">
                  Call Client
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                This message was sent from your website contact form.<br>
                <span style="color: #94a3b8;">Received on ${new Date().toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}</span>
              </p>
            </div>
          </div>
        </body>
        </html>
        `,
        reply_to: formData.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
