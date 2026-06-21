import { useAuth } from "../../auth/AuthContext";

export function OverviewPage() {
  const { business } = useAuth();

  return (
    <div>
      <h2 className="page-title">Overview</h2>
      <p className="page-placeholder-note">
        Welcome to {business?.name ?? "your"} dashboard. Conversation and scan analytics will
        appear here once your AI Host is published.
      </p>
    </div>
  );
}
