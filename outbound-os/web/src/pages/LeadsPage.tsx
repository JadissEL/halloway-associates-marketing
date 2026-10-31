import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "../lib/api";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/States";

type Lead = {
  id: string;
  businessName: string;
  niche: string;
  city: string;
  email?: string | null;
  website?: string | null;
  phone?: string | null;
  status: string;
  source: string;
};

export function LeadsPage() {
  const qc = useQueryClient();
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [hasEmail, setHasEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [csv, setCsv] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [msg, setMsg] = useState("");

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (niche) p.set("niche", niche);
    if (city) p.set("city", city);
    if (hasEmail) p.set("hasEmail", hasEmail);
    if (search) p.set("search", search);
    p.set("take", "100");
    return p.toString();
  }, [niche, city, hasEmail, search]);

  const leads = useQuery({
    queryKey: ["leads", query],
    queryFn: () => api<{ items: Lead[]; total: number }>(`/api/leads?${query}`),
  });

  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => api<{ items: Array<{ id: string; name: string }> }>("/api/campaigns"),
  });

  const discover = useMutation({
    mutationFn: () =>
      api("/api/leads/discover", {
        method: "POST",
        body: JSON.stringify({
          niche: niche || "coiffeurs",
          city: city || "Lyon",
          count: 20,
        }),
      }),
    onSuccess: () => {
      setMsg("20 leads découverts (mock).");
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const enrich = useMutation({
    mutationFn: () =>
      api("/api/leads/enrich", {
        method: "POST",
        body: JSON.stringify({ leadIds: selected }),
      }),
    onSuccess: () => {
      setMsg("Enrichissement terminé.");
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const importCsv = useMutation({
    mutationFn: () =>
      api<{
        created: number;
        skipped?: number;
        errors?: Array<{ row: number; message: string }>;
      }>("/api/leads/import-csv", {
        method: "POST",
        body: JSON.stringify({
          csv,
          mapping: {
            businessName: "businessName",
            niche: "niche",
            city: "city",
            email: "email",
            website: "website",
            phone: "phone",
          },
        }),
      }),
    onSuccess: (res) => {
      const parts = [`${res.created} leads importés`];
      if (res.skipped) parts.push(`${res.skipped} ignorés`);
      if (res.errors?.length) {
        parts.push(res.errors.slice(0, 3).map((e) => e.message).join(" · "));
      }
      setMsg(parts.join(" — "));
      if (res.created > 0) setCsv("");
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const addToCampaign = useMutation({
    mutationFn: () =>
      api<{ added: number }>(`/api/campaigns/${campaignId}/leads`, {
        method: "POST",
        body: JSON.stringify({ leadIds: selected }),
      }),
    onSuccess: (res) => {
      setMsg(`${res.added} leads ajoutés à la campagne.`);
      setSelected([]);
    },
  });

  const createManual = useMutation({
    mutationFn: () =>
      api("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          businessName: "Nouveau commerce",
          niche: niche || "salon",
          city: city || "Lyon",
          source: "manual",
        }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  if (leads.isLoading) return <LoadingState />;
  if (leads.isError) return <ErrorState message={(leads.error as Error).message} />;

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle={`${leads.data?.total ?? 0} prospects · sélection multiple pour campagnes`}
        actions={
          <>
            <button className="btn btn-secondary" onClick={() => discover.mutate()} disabled={discover.isPending}>
              Découvrir (mock)
            </button>
            <button className="btn btn-secondary" onClick={() => createManual.mutate()}>
              Créer
            </button>
          </>
        }
      />

      {msg && <div className="card-panel mb-4 text-sm text-[var(--accent)]">{msg}</div>}

      <div className="grid gap-3 md:grid-cols-4 mb-4">
        <input className="input" placeholder="Recherche" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input className="input" placeholder="Niche" value={niche} onChange={(e) => setNiche(e.target.value)} />
        <input className="input" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
        <select className="select" value={hasEmail} onChange={(e) => setHasEmail(e.target.value)}>
          <option value="">Email : tous</option>
          <option value="true">Avec email</option>
          <option value="false">Sans email</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          className="btn btn-secondary"
          disabled={!selected.length || enrich.isPending}
          onClick={() => enrich.mutate()}
        >
          Enrichir ({selected.length})
        </button>
        <select className="select max-w-xs" value={campaignId} onChange={(e) => setCampaignId(e.target.value)}>
          <option value="">Campagne…</option>
          {campaigns.data?.items.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          disabled={!selected.length || !campaignId}
          onClick={() => addToCampaign.mutate()}
        >
          Ajouter à la campagne
        </button>
      </div>

      <div className="table-wrap mb-6">
        {!leads.data?.items.length ? (
          <EmptyState title="Aucun lead" hint="Importez un CSV ou lancez une découverte mock." />
        ) : (
          <table className="data">
            <thead>
              <tr>
                <th></th>
                <th>Entreprise</th>
                <th>Niche</th>
                <th>Ville</th>
                <th>Email</th>
                <th>Site</th>
                <th>Statut</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.data.items.map((l) => (
                <tr key={l.id}>
                  <td>
                    <input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggle(l.id)} />
                  </td>
                  <td className="font-medium">{l.businessName}</td>
                  <td>{l.niche}</td>
                  <td>{l.city}</td>
                  <td>{l.email || "—"}</td>
                  <td className="max-w-[180px] truncate">{l.website || "—"}</td>
                  <td>
                    <span className="badge badge-muted">{l.status}</span>
                  </td>
                  <td>{l.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <section className="card-panel">
        <h2 className="text-xl mt-0">Import CSV</h2>
        <p className="text-sm text-[var(--muted)]">
          Colonnes attendues : businessName, niche, city, email, website, phone
        </p>
        <textarea
          className="textarea"
          placeholder={"businessName,niche,city,email,website\nSalon Demo,salon,Lyon,hello@demo.fr,https://demo.fr"}
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />
        <button className="btn btn-primary mt-3" disabled={!csv || importCsv.isPending} onClick={() => importCsv.mutate()}>
          Importer
        </button>
      </section>
    </div>
  );
}
