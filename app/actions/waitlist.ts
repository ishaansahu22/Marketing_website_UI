'use server'

import { Resend } from 'resend'
import { headers } from 'next/headers'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxBdYkD06WdJ0KxCPWqSCRm-Dxsyg6pFTJv2HybE9YD7fygInm68oGAis0OhpvwTeY0/exec';

export async function getWaitlistCount(): Promise<number> {
  try {
    const response = await fetch(SHEET_WEBHOOK, {
      method: 'GET',
      cache: 'no-store',
    })
    if (response.ok) {
      const data = await response.json()
      return data.count ?? 0
    }
  } catch (error) {
    console.error('Failed to fetch waitlist count:', error)
  }
  return 0
}

export async function subscribeToWaitlist(email: string) {
  let sheetSaved = false
  let emailSent = false

  // Fetch the user's IP Address
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP'

  try {
    const now = new Date()
    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000
    const ist = new Date(now.getTime() + istOffset)
    const date = ist.toISOString().split('T')[0]
    const time = ist.toISOString().split('T')[1].split('.')[0] + ' IST'

    const response = await fetch(SHEET_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ email, date, time, ip }),
      redirect: 'follow',
    })

    sheetSaved = true
  } catch (sheetError) {
    console.error('Failed to save to Google Sheet:', sheetError)
    sheetSaved = true
  }

  // Try to send the welcome email via Resend if configured
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

  // Fetch the updated count after saving
  const count = await getWaitlistCount()

  return { success: true, emailSent, count }
}
