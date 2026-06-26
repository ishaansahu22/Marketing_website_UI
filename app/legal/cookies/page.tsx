import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — DayBricks',
  description: 'Understand how DayBricks uses cookies and tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#12A798] mb-2">
          Legal
        </p>
        <h1>Cookie Policy</h1>
        <p className="text-sm text-[#0a1413]/40 mt-1">
          Effective Date: June 2026
        </p>
      </div>

      <p>
        DayBricks uses cookies and similar tracking technologies to track activity on our Platform
        and store certain information.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are files with a small amount of data which may include an anonymous unique
        identifier. They are sent to your browser from a website and stored on your device.
      </p>

      <h2>How We Use Cookies</h2>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Required to authenticate users securely and prevent
          fraudulent use of user accounts.
        </li>
        <li>
          <strong>Session Cookies:</strong> Used to operate our Platform and remember your
          preferences (like your current active Group Trip).
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Used to understand how our community interacts with the
          platform so we can improve the user experience.
        </li>
      </ul>

      <h2>Your Choices</h2>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being
        sent. However, if you do not accept essential and session cookies, you may not be able to use
        the authenticated features of DayBricks.
      </p>
    </>
  )
}
