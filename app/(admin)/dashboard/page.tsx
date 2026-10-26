import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    const { count: memeCount } = await supabase
        .from("generations")
        .select("*", { count: "exact", head: true });

    const { count: voteCount } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true });

    const { data: generations } = await supabase
        .from("generations")
        .select("id, prompt, template, user_id");

    const { data: votes } = await supabase.from("votes").select("generation_id, value");

    const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name");

    const scoreByGen = new Map<string, number>();
    votes?.forEach((v) => {
        scoreByGen.set(v.generation_id, (scoreByGen.get(v.generation_id) ?? 0) + v.value);
    });

    const topMeme = generations
        ?.map((g) => ({ ...g, score: scoreByGen.get(g.id) ?? 0 }))
        .sort((a, b) => b.score - a.score)[0];

    const genByUser = new Map<string, number>();
    generations?.forEach((g) => {
        genByUser.set(g.user_id, (genByUser.get(g.user_id) ?? 0) + 1);
    });
    const topCreatorId = [...genByUser.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    const topCreator = profiles?.find((p) => p.id === topCreatorId);

    const templateCounts = new Map<string, number>();
    generations?.forEach((g) => {
        templateCounts.set(g.template, (templateCounts.get(g.template) ?? 0) + 1);
    });
    const favoriteTemplate = [...templateCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    const totalUpvotes = votes?.filter((v) => v.value === 1).length ?? 0;
    const totalDownvotes = votes?.filter((v) => v.value === -1).length ?? 0;

    return (
        <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ fontSize: 28, margin: "0 0 24px" }}>Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                    marginBottom: 32,
                }}
            >
                <StatCard label="Users" value={userCount ?? 0} />
                <StatCard label="Memes created" value={memeCount ?? 0} />
                <StatCard label="Total votes" value={voteCount ?? 0} />
                <StatCard label="Upvote ratio" value={`${voteCount ? Math.round((totalUpvotes / voteCount) * 100) : 0}%`} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Card title="Top meme">
                    {topMeme ? (
                        <>
                            <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{topMeme.prompt}</p>
                            <p style={{ margin: 0, color: "#666" }}>Score: {topMeme.score}</p>
                        </>
                    ) : (
                        <p style={{ color: "#888" }}>No memes yet</p>
                    )}
                </Card>

                <Card title="Top creator">
                    {topCreator ? (
                        <p style={{ margin: 0, fontWeight: 600 }}>
                            {topCreator.first_name} {topCreator.last_name} ({genByUser.get(topCreatorId!)} memes)
                        </p>
                    ) : (
                        <p style={{ color: "#888" }}>No creators yet</p>
                    )}
                </Card>

                <Card title="Favorite template">
                    {favoriteTemplate ? (
                        <p style={{ margin: 0, fontWeight: 600 }}>
                            {favoriteTemplate[0]} ({favoriteTemplate[1]} uses)
                        </p>
                    ) : (
                        <p style={{ color: "#888" }}>No data yet</p>
                    )}
                </Card>

                <Card title="Votes breakdown">
                    <p style={{ margin: 0 }}>
                        👍 {totalUpvotes} &nbsp;&nbsp; 👎 {totalDownvotes}
                    </p>
                </Card>
            </div>
        </main>
    );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <div style={{ fontSize: 13, color: "#888" }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{value}</div>
        </div>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{title}</div>
            {children}
        </div>
    );
}