"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteButton({ id }: { id: string }) {
    const supabase = createClient();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Delete this meme?")) return;
        await supabase.from("generations").delete().eq("id", id);
        router.refresh();
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                background: "#c0392b",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 13,
                cursor: "pointer",
            }}
        >
            Delete
        </button>
    );
}