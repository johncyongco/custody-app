import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import HomePage from "@/pages/HomePage";
import HumanMapPage from "@/pages/HumanMapPage";
import ConsecratePage from "@/pages/ConsecratePage";
import CustodyPage from "@/pages/CustodyPage";
import ProfilePage from "@/pages/ProfilePage";
import LifeVersesPage from "@/pages/LifeVersesPage";
import ConsecrationStatusPage from "@/pages/ConsecrationStatusPage";
import FriendsOfTheSpiritPage from "@/pages/FriendsOfTheSpiritPage";
import BookOfPraisePage from "@/pages/BookOfPraisePage";
import NovenaPage from "@/pages/NovenaPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-glow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<HumanMapPage />} />
          <Route path="/consecrate" element={<ConsecratePage />} />
          <Route path="/custody" element={<CustodyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/life-verses" element={<LifeVersesPage />} />
          <Route path="/consecration-status" element={<ConsecrationStatusPage />} />
          <Route path="/friends-of-the-spirit" element={<FriendsOfTheSpiritPage />} />
          <Route path="/magnify" element={<BookOfPraisePage />} />
          <Route path="/novena" element={<NovenaPage />} />
        </Routes>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
