"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const supabase = createClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1a1a2e",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "40px 48px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    maxWidth: 380,
                    textAlign: "center",
                }}
            >
                <h1 style={{ margin: "0 0 8px", fontSize: 24, color: "#2d2d2d" }}>
                    Admin Login
                </h1>
                <p style={{ margin: "0 0 24px", color: "#666", fontSize: 14 }}>
                    Restricted to admins only
                </p>
                <button
                    onClick={handleLogin}
                    style={{
                        background: "#1a1a2e",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 20px",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Sign in with Google
                </button>
            </div>
        </main>
    );
}