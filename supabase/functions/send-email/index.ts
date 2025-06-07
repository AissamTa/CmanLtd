import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "cmanltd7@gmail.com";
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "contact@cman.ma";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    try {
      const { data: userEmailData, error: userEmailError } = await resend.emails
        .send({
          from: `Your Company <${SENDER_EMAIL}>`,
          to: [email],
          subject: "Thank You for Your Message!",
          html: `
          <div style="background:#f4f8fb;padding:40px 0;">
            <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:32px 28px;font-family:'Segoe UI',Arial,sans-serif;">
              <div style="text-align:center;">
                <img src="#" />
                <h2 style="color:#2563eb;margin-bottom:8px;">Thank You, ${name}!</h2>
                <p style="color:#333;font-size:17px;margin-bottom:24px;">
                  We have received your message and will get back to you as soon as possible.
                </p>
              </div>
              <div style="background:#f1f5f9;border-radius:8px;padding:18px 20px;margin-bottom:24px;">
                <h3 style="color:#2563eb;margin:0 0 12px 0;font-size:18px;">Your Message</h3>
                <table style="width:100%;font-size:15px;color:#222;">
                  <tr>
                    <td style="padding:4px 0;width:90px;"><strong>Name:</strong></td>
                    <td>${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;"><strong>Email:</strong></td>
                    <td>${email}</td>
                  </tr>
                  ${
            phone
              ? `
                  <tr>
                    <td style="padding:4px 0;"><strong>Phone:</strong></td>
                    <td>${phone}</td>
                  </tr>`
              : ""
          }
                  <tr>
                    <td style="padding:4px 0;vertical-align:top;"><strong>Message:</strong></td>
                    <td>${message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
              <div style="text-align:center;">
                <p style="color:#555;font-size:15px;margin-bottom:0;">
                  Best regards,<br>
                  <span style="color:#2563eb;font-weight:bold;">The CMAN Ltd Team</span>
                </p>
                <hr style="margin:24px 0 12px 0;border:none;border-top:1px solid #e5e7eb;">
                <small style="color:#aaa;">This is an automated message from <a href="https://cman.ma" style="color:#2563eb;text-decoration:none;">cman.ma</a></small>
              </div>
            </div>
          </div>
          `,
        });

      if (userEmailError) {
        console.error(
          "Error sending confirmation email to user:",
          userEmailError,
        );
      } else {
        console.log("Confirmation email sent to user:", userEmailData);
      }
    } catch (sendError) {
      console.error("Unexpected error during user email send:", sendError);
    }
    try {
      const { data: adminEmailData, error: adminEmailError } = await resend
        .emails.send({
          from: `Contact Form <${SENDER_EMAIL}>`,
          to: [ADMIN_EMAIL],
          subject: `New Contact Form Submission from ${name}`,
          html: `
          <div style="background:#f4f8fb;padding:40px 0;">
            <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.07);padding:32px 28px;font-family:'Segoe UI',Arial,sans-serif;">
              <div style="text-align:center;">
                <img src="#" />
                <h2 style="color:#2563eb;margin-bottom:8px;">New Contact Form Submission</h2>
                <p style="color:#333;font-size:17px;margin-bottom:24px;">
                  You have received a new message from your website contact form.
                </p>
              </div>
              <div style="background:#f1f5f9;border-radius:8px;padding:18px 20px;margin-bottom:24px;">
                <h3 style="color:#2563eb;margin:0 0 12px 0;font-size:18px;">Message Details</h3>
                <table style="width:100%;font-size:15px;color:#222;">
                  <tr>
                    <td style="padding:4px 0;width:90px;"><strong>Name:</strong></td>
                    <td>${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;"><strong>Email:</strong></td>
                    <td>${email}</td>
                  </tr>
                  ${
            phone
              ? `
                  <tr>
                    <td style="padding:4px 0;"><strong>Phone:</strong></td>
                    <td>${phone}</td>
                  </tr>`
              : ""
          }
                  <tr>
                    <td style="padding:4px 0;vertical-align:top;"><strong>Message:</strong></td>
                    <td>${message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
              <div style="text-align:center;">
                <a href="mailto:${email}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-size:15px;font-weight:500;margin-bottom:12px;">Reply to ${name}</a>
                <hr style="margin:24px 0 12px 0;border:none;border-top:1px solid #e5e7eb;">
                <small style="color:#aaa;">This notification was sent by <a href="https://cman.ma" style="color:#2563eb;text-decoration:none;">cman.ma</a></small>
              </div>
            </div>
          </div>
          `,
        });

      if (adminEmailError) {
        console.error(
          "Error sending admin notification email:",
          adminEmailError,
        );
        // Log for debugging
      } else {
        console.log("Admin notification email sent:", adminEmailData);
      }
    } catch (sendError) {
      console.error("Unexpected error during admin email send:", sendError);
    }

    return new Response(
      JSON.stringify({ message: "Contact saved and emails processed!" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "An unknown error occurred";
    console.error("Edge Function error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
