import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/States";

export function CampaignsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    niche: "salon",
    city: "Lyon",
    mailboxId: "",
    sequenceId: "",
    dailyLimit: 15,
  });

  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: () =>
      api<{
        items: Array<{
          id: string;
          name: string;
          status: string;
          niche: string;
          city: string;
          dailyLimit: number;
          mailbox: { fromEmail: string };
          sequence: { name: string };
          _count: { leads: number };
        }>;
      }>("/api/campaigns"),
  });

  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      api<{
        mailboxes: Array<{ id: string; fromEmail: string }>;
      }>("/api/settings"),
  });

  const sequences = useQuery({
    queryKey: ["sequences"],
    queryFn: () => api<{ items: Array<{ id: string; name: string; niche: string }> }>("/api/sequences"),
  });

  const create = useMutation({
    mutationFn: () =>
      api<{ campaign: { id: string } }>("/api/campaigns", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          mailboxId: form.mailboxId || settings.data?.mailboxes[0]?.id,
          sequenceId:
            form.sequenceId ||
            sequences.data?.items.find((s) => s.niche === form.niche)?.id ||
            sequences.data?.items[0]?.id,
        }),
      }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["campaigns"] });
      setOpen(false);
      navigate(`/campaigns/${res.campaign.id}`);
    },
  });

  if (campaigns.isLoading) return <LoadingState />;
  if (campaigns.isError) return <ErrorState message={(campaigns.error as Error).message} />;

  return (
    <div>
      <PageHeader
        title="Campagnes"
        subtitle="Wizard niche + ville + boîte + séquence + limites"
        actions={
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            Créer une campagne
          </button>
        }
      />

      {open && (
        <form
          className="card-panel mb-6 grid gap-3 md:grid-cols-2"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            create.mutate();
          }}
        >
          <div>
            <label className="text-sm">Nom</label>
            <input
              className="input"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Niche</label>
            <select
              className="select"
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
            >
              <option value="salon">Salon / coiffeur</option>
              <option value="lawyer">Avocat</option>
              <option value="cafe">Café / restaurant</option>
              <option value="courier">Coursier</option>
              <option value="influencer">Créateur</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Ville</label>
            <input
              className="input"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm">Limite / jour</label>
            <input
              className="input"
              type="number"
              min={1}
              value={form.dailyLimit}
              onChange={(e) => setForm({ ...form, dailyLimit: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-sm">Boîte mail</label>
            <select
              className="select"
              value={form.mailboxId}
              onChange={(e) => setForm({ ...form, mailboxId: e.target.value })}
            >
              <option value="">Par défaut</option>
              {settings.data?.mailboxes.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fromEmail}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm">Séquence</label>
            <select
              className="select"
              value={form.sequenceId}
              onChange={(e) => setForm({ ...form, sequenceId: e.target.value })}
            >
              <option value="">Auto (selon niche)</option>
              {sequences.data?.items.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button className="btn btn-primary" disabled={create.isPending}>
              Créer
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        {!campaigns.data?.items.length ? (
          <EmptyState title="Aucune campagne" />
        ) : (
          <table className="data">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Statut</th>
                <th>Niche / ville</th>
                <th>Leads</th>
                <th>Limite</th>
                <th>Boîte</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.data.items.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link className="text-[var(--accent)] font-medium" to={`/campaigns/${c.id}`}>
                      {c.name}
                    </Link>
                  </td>
                  <td>
                    <span className="badge badge-muted">{c.status}</span>
                  </td>
                  <td>
                    {c.niche} · {c.city}
                  </td>
                  <td>{c._count.leads}</td>
                  <td>{c.dailyLimit}/j</td>
                  <td>{c.mailbox.fromEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function CampaignDetailPage() {
  const { id } = useParams();
  const qc = useQueryClient();
  const detail = useQuery({
    queryKey: ["campaign", id],
    queryFn: () =>
      api<{
        campaign: {
          id: string;
          name: string;
          status: string;
          niche: string;
          city: string;
          dailyLimit: number;
          sequence: { name: string; steps: Array<{ order: number; subjectTemplate: string }> };
          leads: Array<{
            id: string;
            status: string;
            lead: { businessName: string; email?: string | null };
          }>;
        };
        stats: Record<string, number>;
        interested: number;
      }>(`/api/campaigns/${id}`),
    refetchInterval: 5000,
  });

  const outbox = useQuery({
    queryKey: ["outbox", id],
    queryFn: () =>
      api<{
        items: Array<{
          id: string;
          toEmail: string;
          subject: string;
          status: string;
          scheduledAt: string;
          sentAt?: string;
        }>;
      }>(`/api/outbox?campaignId=${id}&take=40`),
    refetchInterval: 5000,
  });

  const act = useMutation({
    mutationFn: (action: "start" | "pause" | "resume") =>
      api(`/api/campaigns/${id}/${action}`, { method: "POST", body: "{}" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["campaign", id] });
      qc.invalidateQueries({ queryKey: ["outbox", id] });
    },
  });

  const processNow = useMutation({
    mutationFn: () => api("/api/outbox/process", { method: "POST", body: "{}" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["outbox", id] });
      qc.invalidateQueries({ queryKey: ["campaign", id] });
    },
  });

  if (detail.isLoading) return <LoadingState />;
  if (detail.isError) return <ErrorState message={(detail.error as Error).message} />;
  const c = detail.data!.campaign;
  const stats = detail.data!.stats;

  return (
    <div>
      <PageHeader
        title={c.name}
        subtitle={`${c.niche} · ${c.city} · ${c.sequence.name}`}
        actions={
          <>
            {c.status !== "running" && (
              <button className="btn btn-primary" onClick={() => act.mutate(c.status === "paused" ? "resume" : "start")}>
                {c.status === "paused" ? "Reprendre" : "Démarrer"}
              </button>
            )}
            {c.status === "running" && (
              <button className="btn btn-secondary" onClick={() => act.mutate("pause")}>
                Pause
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => processNow.mutate()}>
              Traiter outbox
            </button>
            <Link className="btn btn-secondary" to="/campaigns">
              Retour
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge badge-muted">statut: {c.status}</span>
        <span className="badge">limite {c.dailyLimit}/j</span>
        {Object.entries(stats).map(([k, v]) => (
          <span key={k} className="badge badge-muted">
            {k}: {v}
          </span>
        ))}
        <span className="badge">intéressés: {detail.data!.interested}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-panel p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--line)] font-semibold">Leads campagne</div>
          <div className="table-wrap border-0 rounded-none max-h-[420px]">
            <table className="data">
              <thead>
                <tr>
                  <th>Entreprise</th>
                  <th>Email</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {c.leads.map((cl) => (
                  <tr key={cl.id}>
                    <td>{cl.lead.businessName}</td>
                    <td>{cl.lead.email || "—"}</td>
                    <td>
                      <span className="badge badge-muted">{cl.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card-panel p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--line)] font-semibold">Outbox</div>
          <div className="table-wrap border-0 rounded-none max-h-[420px]">
            {!outbox.data?.items.length ? (
              <EmptyState title="Outbox vide" hint="Démarrez la campagne pour enqueuer." />
            ) : (
              <table className="data">
                <thead>
                  <tr>
                    <th>À</th>
                    <th>Sujet</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {outbox.data.items.map((m) => (
                    <tr key={m.id}>
                      <td>{m.toEmail}</td>
                      <td>{m.subject}</td>
                      <td>
                        <span className={`badge ${m.status.includes("dry") ? "badge-dry" : "badge-muted"}`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
