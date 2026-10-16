import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

// --- Security: origin allowlist (extend via ALLOWED_ORIGINS env, comma-separated) ---
const DEFAULT_ORIGINS = [
  "https://cman.ma",
  "https://www.cman.ma",
  "http://localhost:5173",
  "http://localhost:3000",
];
const EXTRA_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);
const ALLOWED_ORIGINS = [...DEFAULT_ORIGINS, ...EXTRA_ORIGINS];

function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    "Vary": "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
}

// --- Security: escape user input before injecting into HTML emails ---
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);
// Main inbox that receives every contact-form submission. Fixed on purpose: an
// old ADMIN_EMAIL secret was overriding it. To change the inbox, edit this line.
const ADMIN_EMAIL = "cmanltd7@gmail.com";
// Backup inbox that also gets a copy. Each inbox is sent separately; the form
// counts as sent if at least one of them receives it. (Until the cman.ma domain
// is verified in Resend, only the Resend account owner's address can receive.)
const EXTRA_ADMIN_EMAILS = ["aissamtaouili39@gmail.com"];
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "contact@cman.ma";
// Resend's shared test sender. It works without a verified domain, but can
// only deliver to the email address that owns the Resend account.
const FALLBACK_SENDER = "onboarding@resend.dev";

type SendOptions = {
  fromName: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
};

// Send from SENDER_EMAIL; if Resend rejects that sender (usually because the
// domain is not verified yet), retry once from Resend's test sender.
async function sendEmail({ fromName, ...rest }: SendOptions) {
  const first = await resend.emails.send({
    from: `${fromName} <${SENDER_EMAIL}>`,
    ...rest,
  });
  if (!first.error || SENDER_EMAIL === FALLBACK_SENDER) return first;
  console.error(`Send from ${SENDER_EMAIL} failed, retrying from ${FALLBACK_SENDER}:`, first.error);
  return await resend.emails.send({
    from: `${fromName} <${FALLBACK_SENDER}>`,
    ...rest,
  });
}

serve(async (req: Request) => {
  const corsHeaders = corsHeadersFor(req);
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const name = escapeHtml(body.name).slice(0, 120);
    const email = escapeHtml(body.email).slice(0, 254);
    const phone = body.phone ? escapeHtml(body.phone).slice(0, 30) : null;
    const message = escapeHtml(body.message).slice(0, 5000);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is not set on this Supabase project.");
      return new Response(
        JSON.stringify({ error: "Email service is not configured (RESEND_API_KEY missing)." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

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
      const { data: userEmailData, error: userEmailError } = await sendEmail({
          fromName: "CMAN Ltd",
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
    // The notification to your inbox is the email that matters: if it fails,
    // report the real reason to the page instead of pretending it worked.
    let adminError: string | null = null;
    const sendAdmin = (to: string) => sendEmail({
          fromName: "Contact Form",
          to: [to],
          // Hitting "Reply" in your inbox answers the visitor directly.
          reply_to: String(body.email ?? "").slice(0, 254),
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

    try {
      const { data: adminEmailData, error: adminEmailError } = await sendAdmin(ADMIN_EMAIL);

      if (adminEmailError) {
        console.error(
          "Error sending admin notification email:",
          adminEmailError,
        );
        adminError = adminEmailError.message || JSON.stringify(adminEmailError);
      } else {
        console.log("Admin notification email sent:", adminEmailData);
      }
    } catch (sendError) {
      console.error("Unexpected error during admin email send:", sendError);
      adminError = sendError instanceof Error ? sendError.message : String(sendError);
    }

    let anyCopySent = false;
    for (const extra of EXTRA_ADMIN_EMAILS) {
      try {
        const { error } = await sendAdmin(extra);
        if (error) console.error(`Copy to ${extra} failed:`, error);
        else {
          anyCopySent = true;
          console.log(`Copy sent to ${extra}`);
        }
      } catch (e) {
        console.error(`Copy to ${extra} failed:`, e);
      }
    }

    // Only report failure when no inbox at all received the message.
    if (adminError && !anyCopySent) {
      return new Response(
        JSON.stringify({ error: `Notification email failed: ${adminError}` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
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
