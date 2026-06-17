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

    return { success: true, data }
  } catch (error) {
    console.error('Waitlist Error:', error)
    return { success: false, error }
  }
}
