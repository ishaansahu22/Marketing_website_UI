'use server'

export async function subscribeToWaitlist(email: string) {
  // Save directly to Google Sheet
  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOIcztY7BQjwVMg7zlFwBhTZJ-v4VcTTgvJ1IPr_z_BvQNV2YkCLa41QD73Eu_NNb6/exec';
  
  try {
    const response = await fetch(sheetWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, date: new Date().toISOString() })
    })

    if (!response.ok) {
      console.error('Failed to save to Google Sheet:', response.statusText)
      return { success: false, error: 'Failed to save submission' }
    }

    return { success: true }
  } catch (error) {
    console.error('Waitlist Error:', error)
    return { success: false, error: 'Failed to save submission' }
  }
}
