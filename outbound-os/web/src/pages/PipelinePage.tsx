import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/api";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/States";

const STAGE_LABELS: Record<string, string> = {
  new_reply: "Nouvelle réponse",
  hot: "Chaud",
  audit_booked: "Audit réservé",
  proposal_sent: "Proposition envoyée",
  won: "Gagné",
  lost: "Perdu",
};

type Item = {
  id: string;
  stage: string;
  notes?: string | null;
  suggestedReply?: string | null;
  nextActionAt?: string | null;
  lead: { id: string; businessName: string; email?: string | null; city: string };
  reply?: { rawText: string; classification: string; confidence: number } | null;
};

export function PipelinePage() {
  const qc = useQueryClient();
  const [leadId, setLeadId] = useState("");
  const [rawText, setRawText] = useState("");
  const [toast, setToast] = useState("");

  const pipeline = useQuery({
    queryKey: ["pipeline"],
    queryFn: () => api<{ items: Item[]; stages: string[] }>("/api/pipeline"),
    refetchInterval: 6000,
  });

  const leads = useQuery({
    queryKey: ["leads-hot"],
    queryFn: () => api<{ items: Array<{ id: string; businessName: string }> }>("/api/leads?take=50"),
  });

  const ingest = useMutation({
    mutationFn: () =>
      api<{ classification: { classification: string } }>("/api/replies/manual", {
        method: "POST",
        body: JSON.stringify({ leadId, rawText }),
      }),
    onSuccess: (res) => {
      setToast(`Classifié : ${res.classification.classification}`);
      setRawText("");
      qc.invalidateQueries({ queryKey: ["pipeline"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const update = useMutation({
    mutationFn: (payload: { id: string; stage?: string; notes?: string }) =>
      api(`/api/pipeline/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pipeline"] }),
  });

  if (pipeline.isLoading) return <LoadingState />;
  if (pipeline.isError) return <ErrorState message={(pipeline.error as Error).message} />;

  const byStage = (pipeline.data?.stages ?? Object.keys(STAGE_LABELS)).map((stage) => ({
    stage,
    items: pipeline.data?.items.filter((i) => i.stage === stage) ?? [],
  }));

  return (
    <div>
      <PageHeader
        title="Pipeline"
        subtitle="Handoff humain — réponses classifiées, brouillons suggérés (jamais auto-envoyés)"
      />

      {toast && <div className="card-panel mb-4 text-[var(--accent)]">{toast}</div>}

      <section className="card-panel mb-6">
        <h2 className="text-xl mt-0">Coller une réponse (MVP)</h2>
        <div className="grid gap-3 md:grid-cols-[240px_1fr]">
          <select className="select" value={leadId} onChange={(e) => setLeadId(e.target.value)}>
            <option value="">Lead…</option>
            {leads.data?.items.map((l) => (
              <option key={l.id} value={l.id}>
                {l.businessName}
              </option>
            ))}
          </select>
          <textarea
            className="textarea"
            placeholder="Ex: Oui je suis intéressé, on peut faire un appel mardi ?"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          disabled={!leadId || !rawText || ingest.isPending}
          onClick={() => ingest.mutate()}
        >
          Classer & router
        </button>
      </section>

      <div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-6">
        {byStage.map((col) => (
          <div key={col.stage} className="card-panel min-h-[220px]">
            <div className="font-semibold mb-3 flex justify-between gap-2">
              <span>{STAGE_LABELS[col.stage] ?? col.stage}</span>
              <span className="badge badge-muted">{col.items.length}</span>
            </div>
            {!col.items.length ? (
              <div className="text-sm text-[var(--muted)]">Vide</div>
            ) : (
              <div className="space-y-3">
                {col.items.map((item) => (
                  <article key={item.id} className="rounded-lg border border-[var(--line)] bg-white p-3">
                    <div className="font-medium">{item.lead.businessName}</div>
                    <div className="text-xs text-[var(--muted)] mb-2">
                      {item.lead.email} · {item.reply?.classification}
                    </div>
                    {item.reply?.rawText && (
                      <p className="text-sm m-0 mb-2 line-clamp-3">{item.reply.rawText}</p>
                    )}
                    {item.suggestedReply && (
                      <button
                        className="btn btn-secondary w-full text-xs mb-2"
                        onClick={() => {
                          void navigator.clipboard.writeText(item.suggestedReply || "");
                          setToast("Brouillon copié");
                        }}
                      >
                        Copier réponse suggérée
                      </button>
                    )}
                    <select
                      className="select text-sm"
                      value={item.stage}
                      onChange={(e) => update.mutate({ id: item.id, stage: e.target.value })}
                    >
                      {Object.entries(STAGE_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!pipeline.data?.items.length && (
        <div className="mt-4">
          <EmptyState title="Pipeline vide" hint="Collez une réponse positive pour créer un lead chaud." />
        </div>
      )}
    </div>
  );
}
