"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function EditForm({
                                     generation,
                                 }: {
    generation: { id: string; prompt: string; template: string; top_text: string; bottom_text: string };
}) {
    const supabase = createClient();
    const [topText, setTopText] = useState(generation.top_text);
    const [bottomText, setBottomText] = useState(generation.bottom_text);
    const [status, setStatus] = useState("");

    const handleSave = async () => {
        setStatus("Saving...");
        const { error } = await supabase
            .from("generations")
            .update({ top_text: topText, bottom_text: bottomText })
            .eq("id", generation.id);
        setStatus(error ? `Error: ${error.message}` : "Saved!");
    };

    return (
        <div>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 8px" }}>
                {generation.template} — &quot;{generation.prompt}&quot;
            </p>
            <input
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                style={inputStyle}
                placeholder="Top text"
            />
            <input
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                style={{ ...inputStyle, marginTop: 8 }}
                placeholder="Bottom text"
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <button onClick={handleSave} style={saveBtn}>
                    Save
                </button>
                {status && <span style={{ fontSize: 12, color: "#888" }}>{status}</span>}
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
};

const saveBtn: React.CSSProperties = {
    background: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
};