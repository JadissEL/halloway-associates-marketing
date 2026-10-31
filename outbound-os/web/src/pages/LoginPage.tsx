import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export function LoginPage() {
  const { token, login } = useAuth();
  const [email, setEmail] = useState("jadisselantaki@hallowayassociates.com");
  const [password, setPassword] = useState("change-me-now");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form onSubmit={onSubmit} className="card-panel w-full max-w-md shadow-sm">
        <div className="font-display text-3xl mb-1">Halloway Associates</div>
        <p className="text-[var(--muted)] mt-0 mb-6">Outbound OS — accès opérateur</p>
        <label className="block text-sm mb-1" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="input mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm mb-1" htmlFor="login-password">
          Mot de passe
        </label>
        <input
          id="login-password"
          className="input mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-[var(--danger)] text-sm mb-3">{error}</div>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
