'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToWaitlist(email: string) {
  let sheetSaved = false
  let emailSent = false

  // 1. Always save to Google Sheet first (this is the critical path)
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOIcztY7BQjwVMg7zlFwBhTZJ-v4VcTTgvJ1IPr_z_BvQNV2YkCLa41QD73Eu_NNb6/exec';
  
  try {
    await fetch(sheetWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, date: new Date().toISOString() })
    })
    sheetSaved = true
  } catch (sheetError) {
    console.error('Failed to save to Google Sheet:', sheetError)
  }

  // 2. Try to send the welcome email via Resend (optional, won't block success)
  if (process.env.RESEND_API_KEY) {
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

  // As long as the sheet was saved, we consider it a success
  if (sheetSaved) {
    return { success: true, emailSent }
  }

  // If even the sheet failed, return error
  return { success: false, error: 'Failed to save submission' }
}
