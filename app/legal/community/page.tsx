import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Guidelines — DayBricks',
  description: 'DayBricks community guidelines for maintaining a trusted travel intelligence network.',
}

export default function CommunityGuidelinesPage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#12A798] mb-2">
          Legal
        </p>
        <h1>Community Guidelines</h1>
        <p className="text-sm text-[#0a1413]/40 mt-1">
          Effective Date: June 2026
        </p>
      </div>

      <p>
        DayBricks is built on the belief that <em>people trust people</em>. To keep our real-time
        travel intelligence useful and trustworthy, all users must adhere to these guidelines:
      </p>

      <ol>
        <li>
          <strong>Be Honest and Accurate:</strong> Only submit reports for places you have genuinely
          visited or have current knowledge of. Do not manipulate crowd levels, wait times, or
          ratings.
        </li>
        <li>
          <strong>Respect the Real-Time Nature:</strong> Do not submit historical data as current
          real-time data. If you left a location 3 hours ago, do not submit a report saying it is
          currently empty.
        </li>
        <li>
          <strong>No Spam or Manipulation:</strong> Do not use automated tools to submit reports,
          vote on group trips, or create fake accounts. Our systems actively detect and ban location
          spoofing and mass voting.
        </li>
        <li>
          <strong>Be Constructive:</strong> When adding new places (like hidden student hangouts or
          local cafes), provide accurate categorization and details so others can make informed
          decisions.
        </li>
        <li>
          <strong>Respect Privacy:</strong> Do not include personal information about other patrons
          or staff members in your reports or images.
        </li>
      </ol>

      <p>
        Failure to follow these guidelines will result in a lowered Trust Score and potential removal
        from the DayBricks platform.
      </p>
    </>
  )
}
