import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { ErrorState, LoadingState, PageHeader } from "../components/States";

type Settings = {
  workspace: {
    brand: string;
    founderName: string;
    contactEmail: string;
    contactPhone: string;
    defaultCity: string;
    dryRun: boolean;
    warmUpMode: boolean;
    maxEmailsPerDay: number;
    requireWebsite: boolean;
    excludeFreeEmailDomains: boolean;
  };
  mailboxes: Array<{
    id: string;
    fromName: string;
    fromEmail: string;
    provider: string;
    dailyCap: number;
    warmUp: boolean;
  }>;
  integrations: Record<string, string | boolean>;
  placeholders: Record<string, string>;
};

export function SettingsPage() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["settings"],
    queryFn: () => api<Settings>("/api/settings"),
  });
  const [form, setForm] = useState<Settings["workspace"] | null>(null);

  useEffect(() => {
    if (q.data) setForm(q.data.workspace);
  }, [q.data]);

  const save = useMutation({
    mutationFn: () =>
      api("/api/settings", {
        method: "PATCH",
        body: JSON.stringify(form),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });

  if (q.isLoading || !form) return <LoadingState />;
  if (q.isError) return <ErrorState message={(q.error as Error).message} />;

  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Marque, conformité, boîtes mail, statut des clés API" />

      {form.dryRun && (
        <div className="card-panel mb-4 badge-dry" style={{ background: "var(--dry-bg)", color: "var(--dry)" }}>
          Mode dry-run actif — les emails sont composés et journalisés, pas envoyés chez le provider.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-panel space-y-3">
          <h2 className="text-xl mt-0">Marque & placeholders</h2>
          {(
            [
              ["brand", "Marque"],
              ["founderName", "Fondateur"],
              ["contactEmail", "Email"],
              ["contactPhone", "Téléphone"],
              ["defaultCity", "Ville"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="text-sm">{label}</label>
              <input
                className="input"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}
          <div className="text-xs text-[var(--muted)]">
            Placeholders runtime :{" "}
            {Object.entries(q.data!.placeholders)
              .map(([k, v]) => `{{${k}}}=${v}`)
              .join(" · ")}
          </div>
        </section>

        <section className="card-panel space-y-3">
          <h2 className="text-xl mt-0">Conformité</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.dryRun}
              onChange={(e) => setForm({ ...form, dryRun: e.target.checked })}
            />
            Dry-run (recommandé jusqu'à validation légale)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.warmUpMode}
              onChange={(e) => setForm({ ...form, warmUpMode: e.target.checked })}
            />
            Mode warm-up (volume bas)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.requireWebsite}
              onChange={(e) => setForm({ ...form, requireWebsite: e.target.checked })}
            />
            Exiger un site web avant envoi
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.excludeFreeEmailDomains}
              onChange={(e) => setForm({ ...form, excludeFreeEmailDomains: e.target.checked })}
            />
            Exclure Gmail/Hotmail/etc.
          </label>
          <div>
            <label className="text-sm">Max emails / jour (workspace)</label>
            <input
              className="input"
              type="number"
              value={form.maxEmailsPerDay}
              onChange={(e) => setForm({ ...form, maxEmailsPerDay: Number(e.target.value) })}
            />
          </div>
          <button className="btn btn-primary" onClick={() => save.mutate()} disabled={save.isPending}>
            Enregistrer
          </button>
        </section>

        <section className="card-panel">
          <h2 className="text-xl mt-0">Intégrations (sans secrets)</h2>
          <ul className="m-0 p-0 list-none space-y-2">
            {Object.entries(q.data!.integrations).map(([k, v]) => (
              <li key={k} className="flex justify-between text-sm border-b border-[var(--line)] pb-2">
                <span>{k}</span>
                <span className={`badge ${v === "missing" || v === false ? "badge-muted" : ""}`}>
                  {String(v)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--muted)] mt-3 mb-0">
            Ajoutez RESEND_API_KEY / OPENAI_API_KEY / SMTP_* dans <code>.env</code> puis redémarrez l'API.
            Sans clés, le système reste en mock / dry-run.
          </p>
        </section>

        <section className="card-panel">
          <h2 className="text-xl mt-0">Boîtes mail</h2>
          <div className="space-y-3">
            {q.data!.mailboxes.map((m) => (
              <div key={m.id} className="rounded-lg border border-[var(--line)] p-3 bg-white">
                <div className="font-medium">
                  {m.fromName} &lt;{m.fromEmail}&gt;
                </div>
                <div className="text-sm text-[var(--muted)]">
                  {m.provider} · plafond {m.dailyCap}/j · warm-up {m.warmUp ? "oui" : "non"}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
