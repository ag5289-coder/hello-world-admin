"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Term = { id: string; term: string; definition: string | null };

export default function TermsManager({ initialTerms }: { initialTerms: Term[] }) {
    const supabase = createClient();
    const [terms, setTerms] = useState(initialTerms);
    const [newTerm, setNewTerm] = useState("");
    const [newDef, setNewDef] = useState("");

    const handleCreate = async () => {
        if (!newTerm.trim()) return;
        const { data, error } = await supabase
            .from("terms")
            .insert({ term: newTerm, definition: newDef })
            .select()
            .single();
        if (!error && data) {
            setTerms([...terms, data]);
            setNewTerm("");
            setNewDef("");
        }
    };

    const handleUpdate = async (id: string, field: "term" | "definition", value: string) => {
        setTerms(terms.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
        await supabase.from("terms").update({ [field]: value }).eq("id", id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this term?")) return;
        await supabase.from("terms").delete().eq("id", id);
        setTerms(terms.filter((t) => t.id !== id));
    };

    return (
        <div>
            <div style={{ background: "white", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <input
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    placeholder="New term"
                    style={inputStyle}
                />
                <input
                    value={newDef}
                    onChange={(e) => setNewDef(e.target.value)}
                    placeholder="Definition"
                    style={{ ...inputStyle, marginTop: 8 }}
                />
                <button onClick={handleCreate} style={{ ...btn, marginTop: 8 }}>
                    Add term
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {terms.map((t) => (
                    <div key={t.id} style={{ background: "white", borderRadius: 12, padding: 16 }}>
                        <input
                            value={t.term}
                            onChange={(e) => handleUpdate(t.id, "term", e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            value={t.definition ?? ""}
                            onChange={(e) => handleUpdate(t.id, "definition", e.target.value)}
                            style={{ ...inputStyle, marginTop: 8 }}
                        />
                        <button onClick={() => handleDelete(t.id)} style={{ ...deleteBtn, marginTop: 8 }}>
                            Delete
                        </button>
                    </div>
                ))}
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

const btn: React.CSSProperties = {
    background: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
};

const deleteBtn: React.CSSProperties = { ...btn, background: "#c0392b" };