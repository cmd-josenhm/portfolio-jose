import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import CustomCursor from "./components/CustomCursor";
import WebGLBackground from "./components/WebGLBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import LiveNotifications from "./components/LiveNotifications";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
    localStorage.setItem("jose-world-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("jose-world-theme");
    if (savedTheme === "light") setDarkMode(false);
    else if (savedTheme === "dark") setDarkMode(true);
  }, []);

  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 flex flex-col ${
        !isAdminPath ? "custom-cursor-active" : ""
      }`}
    >
      <Analytics />
      <ScrollToTop />

      {!isAdminPath && <WebGLBackground />}
      {!isAdminPath && <CustomCursor />}
      {!isAdminPath && <ChatWidget />}
      {!isAdminPath && <LiveNotifications />}
      {!isAdminPath && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />

          {/* Page 404 — toute URL inconnue */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;