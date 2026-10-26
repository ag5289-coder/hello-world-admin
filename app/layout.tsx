import "./globals.css";
import Link from "next/link";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                background: "#1a1a2e",
                color: "white",
            }}
        >
            <Link
                href="/"
                style={{ color: "white", fontWeight: 700, textDecoration: "none", fontSize: 18 }}
            >
                Admin
            </Link>

            <div style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 14 }}>
                <Link href="/dashboard" style={navLink}>
                    Dashboard
                </Link>
                <Link href="/users" style={navLink}>
                    Users
                </Link>
                <Link href="/media" style={navLink}>
                    Media
                </Link>
                <Link href="/votes" style={navLink}>
                    Votes
                </Link>
                <Link href="/login" style={navLink}>
                    Log in
                </Link>
            </div>
        </nav>
        {children}
        </body>
        </html>
    );
}

const navLink: React.CSSProperties = {
    color: "#e4def0",
    textDecoration: "none",
};