import { createClient } from "@supabase/supabase-js"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Join a trip on DayBricks",
  description: "You've been invited to plan a trip together on DayBricks.",
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code: token } = await params

  const url = process.env.Project_URL ?? ""
  const key = process.env.Publishable_key ?? ""

  let inviteCode: string | null = null
  let debug = ""
  try {
    const supabase = createClient(url.trim(), key.trim())
    const { data, error } = await supabase.rpc("resolve_invite_token", { p_token: token })
    inviteCode = data ?? null
    debug = `urlLen=${url.length} keyLen=${key.length} err=${error?.message ?? "none"} data=${data ?? "null"}`
  } catch (e) {
    debug = `threw: ${(e as Error).message} urlLen=${url.length} keyLen=${key.length}`
  }

  const expired = !inviteCode

  return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      padding:"24px", background:"#f5f5f5",
      fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      {/* debug: ${debug} */}
      <div style={{ background:"#fff", borderRadius:"16px", padding:"40px 32px",
        maxWidth:"400px", width:"100%", textAlign:"center", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize:"28px", fontWeight:700, color:"#1a1a1a", marginBottom:"8px" }}>DayBricks</div>
        <div style={{ fontSize:"14px", color:"#888", marginBottom:"32px" }}>Plan together. Decide together.</div>
        {expired ? (
          <>
            <h1 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a", marginBottom:"12px" }}>This link has expired</h1>
            <p style={{ fontSize:"14px", color:"#666" }}>Ask the trip organiser to share a new invite link, or enter your code manually under <strong>Trips → Join with code</strong>.</p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a", marginBottom:"8px" }}>You&apos;ve been invited!</h1>
            <p style={{ fontSize:"14px", color:"#666", marginBottom:"32px" }}>Someone wants you to join their trip.</p>
            <div style={{ background:"#f0f4ff", border:"2px dashed #6b80ff", borderRadius:"12px", padding:"20px", marginBottom:"24px" }}>
              <div style={{ fontSize:"12px", color:"#6b80ff", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"8px" }}>Invite code</div>
              <div style={{ fontSize:"32px", fontWeight:700, color:"#1a1a1a", letterSpacing:"0.12em", fontFamily:"monospace" }}>{inviteCode}</div>
            </div>
            <a href={`daybricks://invite/${inviteCode}`} style={{ display:"block", background:"#1a1a1a", color:"#fff", textDecoration:"none", padding:"16px 24px", borderRadius:"12px", fontSize:"16px", fontWeight:600, marginBottom:"16px" }}>Open DayBricks</a>
            <p style={{ fontSize:"13px", color:"#999", lineHeight:1.6 }}>Don&apos;t have the app? Download DayBricks and enter the code above under <strong style={{ color:"#555" }}>Trips → Join with code</strong>.</p>
          </>
        )}
      </div>
    </main>
  )
}
