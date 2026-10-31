export function LoadingState({ label = "Chargement…" }: { label?: string }) {
  return <div className="empty">{label}</div>;
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="card-panel border-[var(--danger)] text-[var(--danger)]">
      Erreur : {message}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="empty">
      <div className="font-display text-2xl text-[var(--ink)]">{title}</div>
      {hint && <p className="mt-2">{hint}</p>}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl lg:text-4xl m-0">{title}</h1>
        {subtitle && <p className="text-[var(--muted)] mt-1 mb-0">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
