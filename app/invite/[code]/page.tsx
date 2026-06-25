import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export default async function InvitePage({
  params,
}: { params: Promise<{ code: string }> }) {
  const { code: token } = await params

  const url = process.env.Project_URL ?? "MISSING"
  const key = process.env.Publishable_key ?? "MISSING"

  let result = "(not attempted)"
  try {
    const supabase = createClient(url.trim(), key.trim())
    const { data, error } = await supabase.rpc("resolve_invite_token", { p_token: token })
    result = `data=${JSON.stringify(data)} error=${error ? JSON.stringify(error.message) : "none"}`
  } catch (e) {
    result = `THREW: ${(e as Error).message}`
  }

  return (
    <pre style={{ padding: 24, fontSize: 14, whiteSpace: "pre-wrap" }}>
{`DIAGNOSTIC
token: ${token}
Project_URL present: ${url !== "MISSING"}  length: ${url.length}
Project_URL starts: ${url.slice(0, 12)}
Project_URL ends:   ${url.slice(-16)}
Publishable_key present: ${key !== "MISSING"}  length: ${key.length}
Publishable_key starts: ${key.slice(0, 14)}
rpc: ${result}`}
    </pre>
  )
}
