'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToWaitlist(email: string) {
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

    if (error) {
      console.error('Resend Error:', error)
      return { success: false, error }
    }

    // Save to Google Sheet using the webhook URL
    const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOIcztY7BQjwVMg7zlFwBhTZJ-v4VcTTgvJ1IPr_z_BvQNV2YkCLa41QD73Eu_NNb6/exec';
    
    if (sheetWebhookUrl) {
      try {
        await fetch(sheetWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, date: new Date().toISOString() })
        })
      } catch (sheetError) {
        console.error('Failed to save to Google Sheet:', sheetError)
        // We don't fail the whole request just because the sheet failed
      }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Waitlist Error:', error)
    return { success: false, error }
  }
}
