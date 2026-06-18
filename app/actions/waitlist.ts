'use server'

import { headers } from 'next/headers'

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

  // Fetch the updated count after saving
  const count = await getWaitlistCount()

  // We are using Google Apps Script's MailApp to send the email now,
  // so emailSent is true if sheetSaved is true since Google handles it.
  return { success: true, emailSent: sheetSaved, count }
}
