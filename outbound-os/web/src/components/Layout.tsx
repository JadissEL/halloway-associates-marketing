import { NavLink, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";

const links = [
  { to: "/", label: "Tableau de bord" },
  { to: "/leads", label: "Leads" },
  { to: "/campaigns", label: "Campagnes" },
  { to: "/sequences", label: "Séquences" },
  { to: "/pipeline", label: "Pipeline" },
  { to: "/suppressions", label: "Suppressions" },
  { to: "/settings", label: "Paramètres" },
];

export function Layout() {
  const { user, logout } = useAuth();
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      api<{
        integrations: { dryRun: boolean };
        workspace: { brand: string; dryRun: boolean };
      }>("/api/settings"),
  });

  const dryRun = settings.data?.integrations.dryRun ?? settings.data?.workspace.dryRun ?? true;
  const brand = settings.data?.workspace.brand ?? "Halloway Associates";

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:flex flex-col bg-[var(--sidebar)] text-[var(--sidebar-ink)] min-h-screen px-4 py-5">
        <div className="px-2 mb-8">
          <div className="font-display text-2xl leading-tight">{brand}</div>
          <div className="text-xs opacity-70 mt-1">Outbound OS</div>
          {dryRun && (
            <span className="badge badge-dry mt-3 inline-flex">Mode dry-run</span>
          )}
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-white/10 font-semibold" : "opacity-80 hover:opacity-100 hover:bg-white/5"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-2 pt-4 border-t border-white/10 text-xs opacity-80">
          <div>{user?.name}</div>
          <div className="truncate">{user?.email}</div>
          <button className="btn btn-secondary mt-3 w-full text-xs" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="lg:hidden flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--line)] bg-[var(--bg-elevated)]">
          <div className="font-display text-xl">{brand} Outbound</div>
          {dryRun && <span className="badge badge-dry">Dry-run</span>}
        </header>
        <nav className="lg:hidden flex gap-2 overflow-x-auto px-3 py-2 border-b border-[var(--line)] bg-[var(--bg-elevated)]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-sm border ${isActive ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--line)]"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <main className="px-4 py-5 lg:px-8 lg:py-7 max-w-[1400px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
