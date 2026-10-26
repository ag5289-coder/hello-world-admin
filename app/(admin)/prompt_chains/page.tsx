import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
    const supabase = await createClient();
    const { data: rows } = await supabase.from("prompt_chains").select("*");
    return (
        <main style={{ maxWidth: 700, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28 }}>Prompt Chains</h1>
            <pre style={{ background: "white", padding: 16, borderRadius: 12, overflow: "auto" }}>
        {JSON.stringify(rows, null, 2)}
      </pre>
        </main>
    );
}