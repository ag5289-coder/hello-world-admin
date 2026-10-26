import { createClient } from "@/lib/supabase/server";
import TermsManager from "./TermsManager";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
    const supabase = await createClient();
    const { data: terms } = await supabase.from("terms").select("*").order("term");

    return (
        <main style={{ maxWidth: 700, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, margin: "0 0 24px" }}>Terms</h1>
            <TermsManager initialTerms={terms ?? []} />
        </main>
    );
}