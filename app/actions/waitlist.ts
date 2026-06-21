'use server'

import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToWaitlist(email: string) {
  let contactSaved = false
  let emailSent = false

  // Determine the user's rank before inserting
  const currentCount = await getWaitlistCount();
  const rank = currentCount + 1;

  // 1. Always save to Supabase first (this is the critical path)
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
      
    if (!error) {
      contactSaved = true;
    } else {
      console.error('Failed to save to Supabase:', error);
    }
  } catch (supabaseError) {
    console.error('Failed to save to Supabase:', supabaseError);
  }

  // 2. Try to send the welcome email via Resend (optional, won't block success)
  if (process.env.RESEND_API_KEY) {
    try {
      const subject = rank <= 100 
        ? 'Welcome to the DayBricks Waitlist! 🎉' 
        : 'DayBricks Waitlist: You are on the list! 🚀';

      const htmlContent = rank <= 100 
        ? `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>You're in! You are #${rank}/100.</h2>
            <p>Thank you for joining the DayBricks waitlist.</p>
            <p>You have secured your spot as one of our first 100 Founding Explorers for early access.</p>
            <p>We are building the ultimate day-planning experience, and we can't wait to share it with you.</p>
            <br/>
            <p>Talk soon,</p>
            <p><strong>The DayBricks Team</strong></p>
          </div>
        `
        : `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>You're on the list!</h2>
            <p>Thank you for joining the DayBricks waitlist.</p>
            <p>Our first 100 early access slots are currently full, but we will update you as soon as the final launch is out there!</p>
            <p>We are building the ultimate day-planning experience, and we can't wait to share it with you.</p>
            <br/>
            <p>Talk soon,</p>
            <p><strong>The DayBricks Team</strong></p>
          </div>
        `;

      const { data, error } = await resend.emails.send({
        from: 'DayBricks <onboarding@resend.dev>',
        to: email,
        subject: subject,
        html: htmlContent
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

  // As long as the contact was saved, we consider it a success
  if (contactSaved) {
    return { success: true, emailSent }
  }

  // If even the contact creation failed, return error
  return { success: false, error: 'Failed to save submission' }
}

export async function getWaitlistCount() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.error('Failed to fetch count:', error);
      return 0;
    }
    return count || 0;
  } catch (err) {
    console.error('Failed to fetch count:', err);
    return 0;
  }
}

