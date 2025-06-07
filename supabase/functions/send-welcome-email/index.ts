import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";
const RESEND_FROM_EMAIL = "contact@cman.ma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // --- 1. Get Resend API key and initialize Resend client ---
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error(
        "RESEND_API_KEY is not set in environment variables. Please set it in Supabase secrets.",
      );
    }
    const resend = new Resend(resendApiKey);

    // --- 2. Extract user's email from the request body ---
    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required in the request body." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400, // Bad Request
        },
      );
    }

    // --- 3. Define the stunning HTML email template ---
    const stunningEmailHtml = `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <title>Welcome to CMAN Ltd!</title>
      <style>
        .hover-bg-blue-700:hover {
          background-color: #1d4ed8 !important;
        }
        @media (max-width: 600px) {
          .sm-w-full {
            width: 100% !important;
          }
          .sm-px-24 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .sm-py-32 {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f3f4f6;">
      <div role="article" aria-roledescription="email" aria-label="Welcome to CMAN Ltd!" lang="en">
        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="background-color: #f3f4f6; padding-top: 24px; padding-bottom: 24px;">
              <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-py-32 sm-px-24" style="background-color: #ffffff; padding: 48px; text-align: center; border-radius: 12px 12px 0 0;">
                    <a href="https://your-website.com">
                      <img src="#" width="100" alt="CMAN Ltd Logo" style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%; margin-bottom: 32px;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="sm-px-24" style="background-color: #ffffff; padding-left: 48px; padding-right: 48px; padding-bottom: 48px;">
                    <h1 style="margin: 0; margin-bottom: 24px; font-size: 28px; font-weight: 700; color: #111827;">
                      Welcome Aboard!
                    </h1>
                    <p style="margin: 0; margin-bottom: 24px; font-size: 16px; line-height: 26px; color: #374151;">
                      Thank you for subscribing to the CMAN Ltd newsletter! You're all set to receive the latest news, industry insights, and exclusive updates directly in your inbox.
                    </p>
                    <p style="margin: 0; margin-bottom: 32px; font-size: 16px; line-height: 26px; color: #374151;">
                      We're thrilled to have you with us. If you'd like to learn more about our services, please visit our website.
                    </p>
                    <table align="center" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="hover-bg-blue-700" style="background-color: #2563eb; border-radius: 8px;">
                          <a href="https://cman.ma" target="_blank" style="display: inline-block; padding: 14px 24px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                            Explore Our Services &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="height: 2px; background-color: #e5e7eb;"></td>
                </tr>
                <tr>
                  <td style="background-color: #ffffff; padding: 32px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px;">
                    <p style="margin: 0; margin-bottom: 12px;">
                      <a href="#" target="_blank" style="margin-right: 12px; color: #6b7280; text-decoration: none;">Facebook</a>
                      <a href="#" target="_blank" style="margin-right: 12px; color: #6b7280; text-decoration: none;">Twitter</a>
                      <a href="#" target="_blank" style="color: #6b7280; text-decoration: none;">LinkedIn</a>
                    </p>
                    <p style="margin: 0; margin-bottom: 8px;">CMAN Ltd,Tangier, Morocco</p>
                    <p style="margin: 0;">
                      Don't want to receive these emails? <a href="#" target="_blank" style="color: #2563eb; text-decoration: none;">Unsubscribe</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
    `;

    // --- 4. Send the email using Resend ---
    const { data: _data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [email],
      subject: "Welcome to the CMAN Ltd Newsletter!",
      html: stunningEmailHtml, // Pass the HTML template here
    });

    if (error) {
      // Log the detailed error from Resend for debugging on the server
      console.error({ error });
      return new Response(JSON.stringify({ error: "Failed to send email." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // --- 5. Return a success response to the client ---
    return new Response(
      JSON.stringify({
        message: "Subscription successful! Please check your email.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // OK
      },
    );
  } catch (error) {
    // Catch any other errors (e.g., JSON parsing, missing API key)
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500, // Internal Server Error
    });
  }
});
