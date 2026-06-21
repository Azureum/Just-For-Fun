import { useParams } from "react-router-dom";

export function AppShell() {
  const { businessSlug, locationSlug } = useParams();

  return (
    <div className="app-shell-placeholder">
      <p className="app-shell-eyebrow">AI Host</p>
      <h1>Coming soon</h1>
      <p className="app-shell-note">
        {businessSlug}/{locationSlug}
      </p>
    </div>
  );
}
