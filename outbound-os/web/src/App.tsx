import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./lib/auth";
import { api, getToken } from "./lib/api";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LeadsPage } from "./pages/LeadsPage";
import { CampaignsPage, CampaignDetailPage } from "./pages/CampaignsPage";
import { SequencesPage } from "./pages/SequencesPage";
import { PipelinePage } from "./pages/PipelinePage";
import { SuppressionsPage } from "./pages/SuppressionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LoadingState } from "./components/States";

function Protected({ children }: { children: React.ReactNode }) {
  const { token, setSession, logout } = useAuth();
  const [booting, setBooting] = useState(Boolean(getToken()));

  useEffect(() => {
    const t = getToken();
    if (!t) {
      setBooting(false);
      return;
    }
    api<{ user: { id: string; email: string; name: string } }>("/api/auth/me")
      .then((res) => setSession(t, res.user))
      .catch(() => logout())
      .finally(() => setBooting(false));
  }, []);

  if (booting) return <LoadingState label="Session…" />;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="campaigns/:id" element={<CampaignDetailPage />} />
        <Route path="sequences" element={<SequencesPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="suppressions" element={<SuppressionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
