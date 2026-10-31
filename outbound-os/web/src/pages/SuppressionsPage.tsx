import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../lib/api";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/States";

export function SuppressionsPage() {
  const qc = useQueryClient();
  const [type, setType] = useState<"email" | "domain" | "phone">("email");
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("");

  const list = useQuery({
    queryKey: ["suppressions"],
    queryFn: () =>
      api<{ items: Array<{ id: string; type: string; value: string; reason?: string; createdAt: string }> }>(
        "/api/suppressions",
      ),
  });

  const add = useMutation({
    mutationFn: () =>
      api("/api/suppressions", {
        method: "POST",
        body: JSON.stringify({ type, value, reason }),
      }),
    onSuccess: () => {
      setValue("");
      setReason("");
      qc.invalidateQueries({ queryKey: ["suppressions"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api(`/api/suppressions/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["suppressions"] }),
  });

  if (list.isLoading) return <LoadingState />;
  if (list.isError) return <ErrorState message={(list.error as Error).message} />;

  return (
    <div>
      <PageHeader
        title="Suppressions"
        subtitle="Ne jamais recontacter — emails, domaines, téléphones"
      />

      <div className="card-panel mb-6 grid gap-3 md:grid-cols-4">
        <select className="select" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="email">Email</option>
          <option value="domain">Domaine</option>
          <option value="phone">Téléphone</option>
        </select>
        <input className="input" placeholder="Valeur" value={value} onChange={(e) => setValue(e.target.value)} />
        <input className="input" placeholder="Raison" value={reason} onChange={(e) => setReason(e.target.value)} />
        <button className="btn btn-primary" disabled={!value} onClick={() => add.mutate()}>
          Ajouter
        </button>
      </div>

      <div className="table-wrap">
        {!list.data?.items.length ? (
          <EmptyState title="Liste vide" />
        ) : (
          <table className="data">
            <thead>
              <tr>
                <th>Type</th>
                <th>Valeur</th>
                <th>Raison</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.data.items.map((s) => (
                <tr key={s.id}>
                  <td>{s.type}</td>
                  <td>{s.value}</td>
                  <td>{s.reason || "—"}</td>
                  <td>{new Date(s.createdAt).toLocaleString("fr-FR")}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => remove.mutate(s.id)}>
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
