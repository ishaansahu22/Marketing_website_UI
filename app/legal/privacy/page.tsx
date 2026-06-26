import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — DayBricks',
  description: 'Learn how DayBricks collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#12A798] mb-2">
          Legal
        </p>
        <h1>Privacy Policy</h1>
        <p className="text-sm text-[#0a1413]/40 mt-1">
          Effective Date: June 2026
        </p>
      </div>

      <p>
        Welcome to DayBricks. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website or use our mobile applications and
        services (collectively, the &ldquo;Platform&rdquo;). DayBricks is a community-powered travel
        intelligence platform, and protecting your privacy while enabling a trusted community is our
        priority.
      </p>

      <h2>Information We Collect</h2>
      <ol>
        <li>
          <strong>Personal Information:</strong> When you register, we collect personal information
          such as your email address, name, and authentication data provided by third-party services
          (e.g., Google Sign-In).
        </li>
        <li>
          <strong>Location Data:</strong> To verify the accuracy of community reports, we collect
          precise or approximate location data from your device when you use specific features (e.g.,
          submitting a real-time report about a place). We use this to tag reports as
          &ldquo;Verified&rdquo; if you are within the location&rsquo;s radius.
        </li>
        <li>
          <strong>User-Generated Content:</strong> We collect the information you voluntarily submit,
          including place reports (crowd levels, wait times, parking availability), votes, trip plans,
          saved places, and newly submitted locations.
        </li>
        <li>
          <strong>Usage Data &amp; Device Information:</strong> We automatically collect data about
          your interaction with the Platform, including IP addresses, browser types, operating
          systems, and access times.
        </li>
      </ol>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>
          <strong>To Provide and Maintain the Service:</strong> To create your account, authenticate
          you securely, and operate the platform.
        </li>
        <li>
          <strong>To Power Community Intelligence:</strong> Your reports, votes, and submitted places
          are used to build the DayBricks intelligence network, helping others make real-time travel
          decisions.
        </li>
        <li>
          <strong>To Ensure Trust and Safety:</strong> We use location data and behavioral patterns
          to verify reports, prevent abuse (e.g., location spoofing or spam), and maintain our Trust
          &amp; Reputation System.
        </li>
        <li>
          <strong>To Communicate:</strong> To send administrative information, updates, and respond
          to inquiries.
        </li>
      </ul>

      <h2>Sharing Your Information</h2>
      <ul>
        <li>
          <strong>Publicly Shared Content:</strong> Information you submit as a report, place
          submission, or public vote is visible to the DayBricks community.
        </li>
        <li>
          <strong>Group Trips:</strong> If you participate in a Group Trip, members of that trip can
          see your suggestions, votes, and membership status.
        </li>
        <li>
          <strong>Service Providers:</strong> We may share data with third-party vendors (like
          Supabase for database and authentication) who assist us in operating our Platform. All
          vendors are bound by strict data protection agreements.
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose your information if required by law or
          in response to valid requests by public authorities.
        </li>
      </ul>

      <h2>Your Choices and Rights</h2>
      <p>
        You can update or delete your account information at any time through your account settings.
        You can also disable location permissions in your device settings, though this may limit your
        ability to submit &ldquo;Verified&rdquo; reports and affect your Trust Score.
      </p>
    </>
  )
}
