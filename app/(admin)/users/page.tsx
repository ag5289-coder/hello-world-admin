import { createClient } from "@/lib/supabase/server";

export default async function UsersPage() {
    const supabase = await createClient();
    const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, is_superadmin, avatar_url");

    return (
        <main style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, margin: "0 0 24px" }}>Users</h1>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                <tr style={{ background: "#f0f0f5", textAlign: "left" }}>
                    <th style={th}>Avatar</th>
                    <th style={th}>First name</th>
                    <th style={th}>Last name</th>
                    <th style={th}>Admin</th>
                </tr>
                </thead>
                <tbody>
                {profiles?.map((p) => (
                    <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                        <td style={td}>
                            {p.avatar_url ? (
                                <img src={p.avatar_url} alt="" width={32} height={32} style={{ borderRadius: "50%" }} />
                            ) : (
                                "—"
                            )}
                        </td>
                        <td style={td}>{p.first_name ?? "—"}</td>
                        <td style={td}>{p.last_name ?? "—"}</td>
                        <td style={td}>{p.is_superadmin ? "Yes" : "No"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
}

const th: React.CSSProperties = { padding: "10px 16px", fontSize: 13, color: "#666" };
const td: React.CSSProperties = { padding: "10px 16px", fontSize: 14 };