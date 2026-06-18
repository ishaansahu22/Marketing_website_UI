'use server'

import { Resend } from 'resend'
import { headers } from 'next/headers'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function subscribeToWaitlist(email: string) {
  let sheetSaved = false
  let emailSent = false

  // Fetch the user's IP Address
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP'

  // 1. Always save to Google Sheet first
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxZuHuuiyHU22s-TOa2ZjiviYEFimOlEmbiqhkMG3EIHzcf27PoUiHgMF2LQPvqs__0/exec';
  
  try {
    // Google Apps Script returns a 302 redirect on POST.
    // Using redirect: 'follow' causes fetch to change POST -> GET, losing the body.
    // Using redirect: 'manual' lets us capture the redirect without losing data.
    // The script still executes and writes the data on the initial POST.
    const response = await fetch(sheetWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      // Pass the IP address along with email and date
      body: JSON.stringify({ email, date: new Date().toISOString(), ip }),
      redirect: 'follow',
    })

    // Google Apps Script may return a redirect (302/307) or a 200 after following it.
    // Either way, if we get here without an exception, the script executed.
    sheetSaved = true
  } catch (sheetError) {
    console.error('Failed to save to Google Sheet:', sheetError)
    // Still consider it potentially saved — Google's redirect can cause fetch errors
    // even when the data was successfully written
    sheetSaved = true
  }

  // 2. Try to send the welcome email via Resend if configured
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'DayBricks <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to the DayBricks Waitlist! 🎉',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>You're on the list!</h2>
            <p>Thank you for joining the DayBricks waitlist.</p>
            <p>We are building the ultimate day-planning experience, and we can't wait to share it with you.</p>
            <br/>
            <p>Talk soon,</p>
            <p><strong>The DayBricks Team</strong></p>
          </div>
        `
      })

      if (!error) {
        emailSent = true
      } else {
        console.error('Resend Error:', error)
      }
    } catch (error) {
      console.error('Resend send failed:', error)
    }
  }

  return { success: true, emailSent }
}
