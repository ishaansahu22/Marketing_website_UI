'use server'

import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'

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
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_APP_PASSWORD in environment variables")
    return { sent: false }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contact.daybricks@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const subject = rank <= 100 
      ? 'Welcome to the DayBricks Waitlist! 🎉' 
      : 'DayBricks Waitlist: You are on the list! 🚀';

    const htmlContent = rank <= 100 
      ? `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #F3EFE0; font-family: Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F3EFE0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="background-color: #12A798; padding: 40px 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px; font-weight: 900;">DAYBRICKS</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 50px 40px; color: #3A1E14;">
              <h2 style="margin-top: 0; font-size: 24px; color: #E87C48;">You're in! 🎉</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for joining the DayBricks waitlist. You have officially secured your spot as <strong>Explorer #${rank}</strong>!
              </p>
              
              <div style="background-color: #FFFDF1; border-left: 4px solid #E89B68; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; font-size: 15px; font-weight: bold; color: #3A1E14;">As one of our first 100 explorers, you've unlocked:</p>
                <ul style="margin-top: 10px; margin-bottom: 0; font-size: 15px; line-height: 1.6; color: #3A1E14;">
                  <li>Early access before the public launch</li>
                  <li>Our premium plan free for 3 months</li>
                  <li>The "Founding Explorer" badge</li>
                </ul>
              </div>

              <p style="font-size: 16px; line-height: 1.6; color: #3A1E14;">
                We are building the ultimate flexible day-planning experience, and we can't wait to share it with you. Stay tuned for early access details.
              </p>
              
              <br/>
              <p style="font-size: 16px; margin: 0; color: #3A1E14;">Talk soon,</p>
              <p style="font-size: 16px; font-weight: bold; margin-top: 5px; color: #3A1E14;">The DayBricks Team</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color: #f9f9f9; padding: 20px; border-top: 1px solid #eeeeee;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                © 2026 DayBricks. All rights reserved.<br/>
                Building perfect days, brick by brick.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
      : `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #F3EFE0; font-family: Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F3EFE0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="background-color: #12A798; padding: 40px 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px; font-weight: 900;">DAYBRICKS</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 50px 40px; color: #3A1E14;">
              <h2 style="margin-top: 0; font-size: 24px; color: #12A798;">You're on the list! 🚀</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for joining the DayBricks waitlist. You are officially <strong>Explorer #${rank}</strong>.
              </p>
              
              <div style="background-color: #FFFDF1; border-left: 4px solid #12A798; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #3A1E14;">
                  Our first 100 early access slots are currently full, but we will update you the moment we expand access or publicly launch!
                </p>
              </div>

              <p style="font-size: 16px; line-height: 1.6; color: #3A1E14;">
                We are building the ultimate flexible day-planning experience, and we can't wait to share it with you.
              </p>
              
              <br/>
              <p style="font-size: 16px; margin: 0; color: #3A1E14;">Talk soon,</p>
              <p style="font-size: 16px; font-weight: bold; margin-top: 5px; color: #3A1E14;">The DayBricks Team</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color: #f9f9f9; padding: 20px; border-top: 1px solid #eeeeee;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                © 2026 DayBricks. All rights reserved.<br/>
                Building perfect days, brick by brick.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

    await transporter.sendMail({
      from: '"DayBricks" <contact.daybricks@gmail.com>',
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

