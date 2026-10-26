import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (!isAdmin) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "system-ui, sans-serif",
                    background: "#1a1a2e",
                    color: "white",
                }}
            >
                <p>You don&apos;t have access to this area.</p>
            </main>
        );
    }

    return (
        <div style={{ padding: 24, background: "#f4f4f8", minHeight: "100vh" }}>
            {children}
        </div>
    );
}