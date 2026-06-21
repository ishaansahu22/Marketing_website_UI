'use server'

import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToWaitlist(email: string) {
  // ONLY save to Supabase — this is fast and returns instantly
  const [countResult, insertResult] = await Promise.all([
    getWaitlistCount(),
    supabase.from('waitlist').insert([{ email }])
  ]);

  const rank = countResult + 1;

  if (insertResult.error) {
    console.error('Failed to save to Supabase:', insertResult.error);
    return { success: false, error: insertResult.error.message || 'Failed to save submission', rank: 0 }
  }

  return { success: true, rank }
}

export async function sendWaitlistEmail(email: string, rank: number) {
  if (!process.env.RESEND_API_KEY) return { sent: false }

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

    await resend.emails.send({
      from: 'DayBricks <onboarding@resend.dev>',
      to: email,
      subject,
      html: htmlContent
    });
    return { sent: true }
  } catch (err) {
    console.error('Email send failed:', err);
    return { sent: false }
  }
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

