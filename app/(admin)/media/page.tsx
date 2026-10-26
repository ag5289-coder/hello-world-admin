import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
    const supabase = await createClient();
    const { data: generations } = await supabase
        .from("generations")
        .select("id, prompt, template, top_text, bottom_text, created_at")
        .order("created_at", { ascending: false });

    return (
        <main style={{ maxWidth: 700, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, margin: "0 0 24px" }}>Media</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {generations?.map((g) => (
                    <div key={g.id} style={{ background: "white", borderRadius: 12, padding: 16 }}>
                        <EditForm generation={g} />
                        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                            <DeleteButton id={g.id} />
                        </div>
                    </div>
                ))}
                {(!generations || generations.length === 0) && (
                    <p style={{ color: "#888" }}>No media yet.</p>
                )}
            </div>
        </main>
    );
}