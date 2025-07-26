// app/api/send-email/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "message",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missingFields },
        { status: 400 }
      );
    }

    // Send email using Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["chibuikemichaelilonze@gmail.com"], // Replace with your business email
        subject: `New Energy Audit Request from ${formData.firstName} ${formData.lastName}`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 6px;">
          <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px;">🔋 New Energy Audit Request</h2>
          
          <p><strong>👤 Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${formData.email}" style="color: #1e88e5;">${formData.email}</a></p>
          <p><strong>📞 Phone:</strong> ${formData.phone}</p>
          <p><strong>🏢 Company:</strong> ${formData.company || "Not provided"}</p>
      
          <hr style="margin: 20px 0;" />
      
          <p style="margin-bottom: 5px;"><strong>📋 Project Details:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1e88e5; white-space: pre-line;">
            ${formData.message.replace(/\n/g, "<br>")}
          </div>
      
          <hr style="margin: 30px 0;" />
          <footer style="font-size: 12px; color: #777;">
            This message was sent from your website contact form.
          </footer>
        </div>
      `,
        reply_to: formData.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error("Error in send-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
