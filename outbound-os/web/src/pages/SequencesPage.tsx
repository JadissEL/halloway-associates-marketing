import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/api";
import { ErrorState, LoadingState, PageHeader } from "../components/States";

type Step = {
  id: string;
  order: number;
  delayDays: number;
  subjectTemplate: string;
  bodyTemplate: string;
  subjectB?: string | null;
  channel: string;
};

type Sequence = {
  id: string;
  name: string;
  niche: string;
  locale: string;
  description?: string | null;
  steps: Step[];
};

export function SequencesPage() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string>("");
  const [leadId, setLeadId] = useState("");
  const [preview, setPreview] = useState<{ subject: string; body: string; provider: string } | null>(null);

  const sequences = useQuery({
    queryKey: ["sequences"],
    queryFn: () => api<{ items: Sequence[] }>("/api/sequences"),
  });

  const leads = useQuery({
    queryKey: ["leads-preview"],
    queryFn: () => api<{ items: Array<{ id: string; businessName: string }> }>("/api/leads?take=20&hasEmail=true"),
  });

  const selected =
    sequences.data?.items.find((s) => s.id === selectedId) ?? sequences.data?.items[0] ?? null;

  const previewMut = useMutation({
    mutationFn: async () => {
      if (!selected || !leadId) throw new Error("Sélectionnez une séquence et un lead");
      const step = selected.steps[0];
      return api<{ personalized: { subject: string; body: string; provider: string } }>(
        "/api/leads/preview-message",
        {
          method: "POST",
          body: JSON.stringify({
            leadId,
            subjectTemplate: step.subjectTemplate,
            bodyTemplate: step.bodyTemplate,
          }),
        },
      );
    },
    onSuccess: (res) => setPreview(res.personalized),
  });

  if (sequences.isLoading) return <LoadingState />;
  if (sequences.isError) return <ErrorState message={(sequences.error as Error).message} />;

  return (
    <div>
      <PageHeader
        title="Séquences"
        subtitle="Templates FR multi-étapes · canaux sociaux = manuel/assisté uniquement"
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="card-panel p-2">
          {sequences.data?.items.map((s) => (
            <button
              key={s.id}
              className={`w-full text-left rounded-lg px-3 py-2 mb-1 ${
                (selected?.id === s.id ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "hover:bg-black/5")
              }`}
              onClick={() => setSelectedId(s.id)}
            >
              <div className="font-medium text-sm">{s.name}</div>
              <div className="text-xs text-[var(--muted)]">{s.niche}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="space-y-4">
            <div className="card-panel">
              <h2 className="text-2xl mt-0 mb-1">{selected.name}</h2>
              <p className="text-[var(--muted)] mt-0">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mt-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm">Lead pour prévisualisation</label>
                  <select className="select" value={leadId} onChange={(e) => setLeadId(e.target.value)}>
                    <option value="">Choisir…</option>
                    {leads.data?.items.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.businessName}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary" onClick={() => previewMut.mutate()} disabled={!leadId}>
                  Prévisualiser étape 1
                </button>
              </div>
              {preview && (
                <div className="mt-4 p-3 rounded-lg bg-white border border-[var(--line)]">
                  <div className="text-xs text-[var(--muted)] mb-1">IA: {preview.provider}</div>
                  <div className="font-semibold">{preview.subject}</div>
                  <pre className="whitespace-pre-wrap text-sm mt-2 mb-0 font-[inherit]">{preview.body}</pre>
                </div>
              )}
            </div>

            {selected.steps.map((step) => (
              <StepEditor
                key={step.id}
                sequenceId={selected.id}
                step={step}
                onSaved={() => qc.invalidateQueries({ queryKey: ["sequences"] })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StepEditor({
  sequenceId,
  step,
  onSaved,
}: {
  sequenceId: string;
  step: Step;
  onSaved: () => void;
}) {
  const [subject, setSubject] = useState(step.subjectTemplate);
  const [body, setBody] = useState(step.bodyTemplate);
  const [subjectB, setSubjectB] = useState(step.subjectB ?? "");
  const save = useMutation({
    mutationFn: () =>
      api(`/api/sequences/${sequenceId}/steps/${step.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          subjectTemplate: subject,
          bodyTemplate: body,
          subjectB: subjectB || null,
        }),
      }),
    onSuccess: onSaved,
  });

  return (
    <div className="card-panel">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="font-semibold">
          Étape {step.order} · +{step.delayDays} j · {step.channel}
          {step.channel !== "email" && <span className="badge badge-muted ml-2">manuel</span>}
        </div>
        <button className="btn btn-secondary" onClick={() => save.mutate()} disabled={save.isPending}>
          Enregistrer
        </button>
      </div>
      <label className="text-sm">Sujet A</label>
      <input className="input mb-2" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <label className="text-sm">Sujet B (A/B optionnel)</label>
      <input className="input mb-2" value={subjectB} onChange={(e) => setSubjectB(e.target.value)} />
      <label className="text-sm">Corps</label>
      <textarea className="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
    </div>
  );
}
