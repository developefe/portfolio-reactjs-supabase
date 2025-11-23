import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './home/Home';
import NotFound from './not-found/NotFound';

function LangRouter() {
    const location = useLocation();
    const path = location.pathname;

    const hasLangPrefix = path.startsWith("/tr") || path.startsWith("/en");
    const pathCount = path.length == 3 ? true : false;

    return (
        <Routes>
            <Route path="/tr" element={<Home lang="tr" />} />
            <Route path="/en" element={<Home lang="en" />} />
            
            <Route path="*" element={<Navigate to={localStorage.getItem('lang')} replace />} />

            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}

export function getLangFromPath(pathname) {
  if (pathname.startsWith("/en")) return "en";
  return "tr";
}

export default LangRouter;