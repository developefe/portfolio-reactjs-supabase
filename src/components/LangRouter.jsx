import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";

function LangRouter() {

  const lang = localStorage.getItem("lang") || "tr";

  return (
    <Routes>

      {/* Dil ana path'leri */}
      <Route path="/tr/*" element={<Home lang="tr" />} />
      <Route path="/en/*" element={<Home lang="en" />} />

      {/* Hiçbiri eşleşmezse */}
      <Route path="*" element={<Navigate to={`/${lang}`} replace />} />

    </Routes>
  );
}

export default LangRouter;