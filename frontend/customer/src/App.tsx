import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "./routes/AppShell";

function App() {
  return (
    <Routes>
      <Route path="/b/:businessSlug/:locationSlug" element={<AppShell />} />
      <Route path="*" element={<Navigate to="/b/demo/main" replace />} />
    </Routes>
  );
}

export default App;
