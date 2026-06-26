import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — DayBricks',
  description: 'Read the DayBricks Terms of Service governing your use of the platform.',
}

export default function TermsOfServicePage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#12A798] mb-2">
          Legal
        </p>
        <h1>Terms of Service</h1>
        <p className="text-sm text-[#0a1413]/40 mt-1">
          Effective Date: June 2026
        </p>
      </div>

      <p>
        By accessing or using DayBricks, you agree to be bound by these Terms of Service.
        If you disagree with any part of these terms, you may not access the platform.
      </p>

      <h2>Account Responsibilities</h2>
      <ul>
        <li>You are responsible for safeguarding your account credentials.</li>
        <li>You must provide accurate and complete information when creating an account.</li>
        <li>You may not use the Platform for any illegal or unauthorized purpose.</li>
      </ul>

      <h2>User-Generated Content &amp; Community Intelligence</h2>
      <p>
        DayBricks relies on accurate, real-time community intelligence. By submitting content
        (reports, reviews, place submissions, etc.):
      </p>
      <ul>
        <li>
          <strong>License:</strong> You grant DayBricks a worldwide, non-exclusive, royalty-free
          license to use, reproduce, modify, and display your content as part of our intelligence
          network.
        </li>
        <li>
          <strong>Accuracy:</strong> You agree to submit truthful, accurate, and relevant
          information. Submitting false reports, spoofing your location, or deliberately
          manipulating the community intelligence graph is strictly prohibited.
        </li>
        <li>
          <strong>Moderation:</strong> DayBricks reserves the right to review, modify, or remove
          any content at our sole discretion. We employ rate limiting and abuse prevention
          mechanisms to ensure data integrity.
        </li>
      </ul>

      <h2>Trust &amp; Reputation System</h2>
      <p>DayBricks operates a Trust System to maintain the quality of our data.</p>
      <ul>
        <li>
          Your account will accumulate a &ldquo;Trust Score&rdquo; based on the accuracy and
          verification of your reports.
        </li>
        <li>
          Violation of these Terms, including rapid spam reporting, automated behavior (bots), or
          mass voting manipulation, may result in a reduction of your Trust Score, flagging for
          moderation, or immediate account suspension.
        </li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        The DayBricks platform, including its original features, functionality, and the aggregated
        community intelligence graph, are owned by DayBricks and are protected by international
        copyright, trademark, and other intellectual property laws.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        DayBricks provides information &ldquo;as is&rdquo; based on community contributions. We do
        not guarantee the accuracy, completeness, or real-time validity of any report (e.g., wait
        times, opening hours). DayBricks shall not be liable for any indirect, incidental, or
        consequential damages resulting from your use of the Platform or reliance on its
        intelligence.
      </p>
    </>
  )
}
