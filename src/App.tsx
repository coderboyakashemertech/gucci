import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Camera } from "./pages/Camera";
import { Tag } from "./pages/Tag";
import { My } from "./pages/My";
import { Eshop } from "./pages/Eshop";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/my" element={<My />} />
        <Route path="/eshop" element={<Eshop />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
