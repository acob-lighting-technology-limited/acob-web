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
          <title>New Quote Request - ACOB Lighting Technology</title>
          <style>
            @media only screen and (max-width: 600px) {
              .email-container {
                width: 100% !important;
                margin: 0 !important;
              }
              .header-content {
                padding: 20px 15px !important;
              }
              .content-section {
                padding: 20px 15px !important;
              }
              .action-buttons {
                flex-direction: column !important;
                gap: 10px !important;
              }
              .action-button {
                width: 100% !important;
                margin: 0 !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #fafafa; line-height: 1.6;">
          <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Company Logo -->
            <div class="header-content" style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); padding: 40px 30px; text-align: center; position: relative;">
              <!-- Company Logo -->
              <div style="margin-bottom: 25px;">
                <img src="https://acoblighting.com/images/acob-logo-light.png" alt="ACOB Lighting Technology" style="height: 60px; width: auto; max-width: 200px;">
              </div>
              
              <!-- Header Text -->
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                New Quote Request
              </h1>
              <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0; font-size: 16px; font-weight: 400;">
                You have received a new solar energy quote inquiry
              </p>
              
              <!-- Decorative Element -->
              <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #22c55e, #16a34a); margin: 20px auto 0; border-radius: 2px;"></div>
            </div>

            <!-- Content Section -->
            <div class="content-section" style="padding: 40px 30px;">
              
              <!-- Client Information Card -->
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #15803d; box-shadow: 0 2px 8px rgba(21, 128, 61, 0.1);">
                <h2 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                  <span style="margin-right: 12px; font-size: 24px;">👤</span>Client Information
                </h2>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="font-weight: 600; color: #374151; min-width: 80px; margin-right: 15px;">Name:</span>
                    <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${formData.firstName} ${formData.lastName}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="font-weight: 600; color: #374151; min-width: 80px; margin-right: 15px;">Email:</span>
                    <a href="mailto:${formData.email}" style="color: #15803d; text-decoration: none; font-size: 16px; font-weight: 500; border-bottom: 1px solid #15803d; transition: all 0.2s;">${formData.email}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="font-weight: 600; color: #374151; min-width: 80px; margin-right: 15px;">Phone:</span>
                    <a href="tel:${formData.phone}" style="color: #1f2937; text-decoration: none; font-size: 16px; font-weight: 500;">${formData.phone}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="font-weight: 600; color: #374151; min-width: 80px; margin-right: 15px;">Company:</span>
                    <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${formData.company || '<em style="color: #6b7280; font-style: italic;">Not provided</em>'}</span>
                  </div>
                </div>
              </div>

              <!-- Quote Details Card -->
              <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 30px;">
                <h2 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                  <span style="margin-right: 12px; font-size: 24px;">⚡</span>Quote Request Details
                </h2>
                
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e; line-height: 1.6;">
                  <div style="color: #374151; font-size: 15px; white-space: pre-line;">${formData.message ? formData.message.replace(/\n/g, '<br>') : 'No additional message provided'}</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons" style="margin-top: 30px; text-align: center; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="mailto:${formData.email}" class="action-button" style="display: inline-block; background: linear-gradient(135deg, #15803d 0%, #166534 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(21, 128, 61, 0.2);">
                  📧 Reply to Client
                </a>
                <a href="tel:${formData.phone}" class="action-button" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);">
                  📞 Call Client
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <!-- Company Info -->
              <div style="margin-bottom: 20px;">
                <img src="https://acoblighting.com/images/acob-logo-dark.png" alt="ACOB Lighting Technology" style="height: 40px; width: auto; margin-bottom: 10px;">
                <p style="margin: 0; color: #374151; font-size: 14px; font-weight: 500;">
                  ACOB Lighting Technology Limited
                </p>
                <p style="margin: 5px 0 0; color: #6b7280; font-size: 13px;">
                  Leading supplier of solar materials for manufacturers, installers & contractors
                </p>
              </div>
              
              <!-- Timestamp -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                  This message was sent from your website quote request form.<br>
                  <span style="color: #9ca3af; font-weight: 500;">Received on ${new Date().toLocaleDateString(
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
