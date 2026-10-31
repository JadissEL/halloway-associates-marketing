import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/States";

type Dashboard = {
  today: { sent: number; replies: number; hotLeads: number };
  campaigns: Array<{
    id: string;
    name: string;
    status: string;
    niche: string;
    city: string;
    leads: number;
    stats: Record<string, number>;
  }>;
  audit: Array<{ id: string; action: string; createdAt: string; actorEmail?: string }>;
  notifications?: Array<{
    id: string;
    type: string;
    title: string;
    body: string;
    read: boolean;
    createdAt: string;
  }>;
};

export function DashboardPage() {
  const q = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api<Dashboard>("/api/stats/dashboard"),
    refetchInterval: 8000,
  });

  if (q.isLoading) return <LoadingState />;
  if (q.isError) return <ErrorState message={(q.error as Error).message} />;
  const data = q.data!;

  return (
    <div>
      <PageHeader
        title="Tableau de bord"
        subtitle="Activité du jour et performance des campagnes"
        actions={
          <Link className="btn btn-primary" to="/campaigns">
            Nouvelle campagne
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[
          { label: "Envoyés aujourd'hui", value: data.today.sent },
          { label: "Réponses aujourd'hui", value: data.today.replies },
          { label: "Leads chauds", value: data.today.hotLeads },
        ].map((s) => (
          <div key={s.label} className="card-panel">
            <div className="text-sm text-[var(--muted)]">{s.label}</div>
            <div className="font-display text-4xl mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-panel p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--line)] font-semibold">Campagnes</div>
          {data.campaigns.length === 0 ? (
            <EmptyState title="Aucune campagne" hint="Créez votre première campagne." />
          ) : (
            <div className="table-wrap border-0 rounded-none">
              <table className="data">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Statut</th>
                    <th>Leads</th>
                    <th>Envoyés</th>
                    <th>Réponses</th>
                  </tr>
                </thead>
                <tbody>
                  {data.campaigns.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link to={`/campaigns/${c.id}`} className="text-[var(--accent)] font-medium">
                          {c.name}
                        </Link>
                        <div className="text-xs text-[var(--muted)]">
                          {c.niche} · {c.city}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-muted">{c.status}</span>
                      </td>
                      <td>{c.leads}</td>
                      <td>{(c.stats.sent ?? 0) + (c.stats.queued ?? 0)}</td>
                      <td>{c.stats.replied ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="card-panel">
          <div className="font-semibold mb-3">Notifications opérateur</div>
          <ul className="space-y-2 m-0 p-0 list-none mb-6">
            {(data.notifications ?? []).length === 0 && (
              <li className="text-sm text-[var(--muted)]">Aucune notification</li>
            )}
            {(data.notifications ?? []).slice(0, 8).map((n) => (
              <li key={n.id} className="text-sm border-b border-[var(--line)] pb-2">
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-[var(--muted)] whitespace-pre-wrap">{n.body}</div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  {new Date(n.createdAt).toLocaleString("fr-FR")}
                  {n.read ? "" : " · non lu"}
                </div>
              </li>
            ))}
          </ul>
          <div className="font-semibold mb-3">Journal d'audit récent</div>
          <ul className="space-y-2 m-0 p-0 list-none">
            {data.audit.map((a) => (
              <li key={a.id} className="text-sm border-b border-[var(--line)] pb-2">
                <div className="font-medium">{a.action}</div>
                <div className="text-xs text-[var(--muted)]">
                  {new Date(a.createdAt).toLocaleString("fr-FR")}
                  {a.actorEmail ? ` · ${a.actorEmail}` : ""}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
