import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    path: "/",
    label: "Accueil",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    path: "/projets",
    label: "Projets",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    path: "/a-propos",
    label: "À propos",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    path: "/blog",
    label: "Blog",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
      </svg>
    ),
  },
  {
    path: "/contact",
    label: "Contact",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const openChatMobile = () => {
    window.dispatchEvent(new Event("toggle-chat"));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-5 z-[100] hidden w-[calc(100%-40px)] max-w-5xl -translate-x-1/2 md:block transition-all duration-300">
        <div className={`flex items-center justify-between rounded-full border border-[var(--border)] px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "bg-[var(--bg-primary)]/85 shadow-[0_15px_40px_rgba(0,0,0,0.25)]" : "bg-[var(--bg-primary)]/50"}`}>
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 ${isActive ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5"}`}>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)]">
            {darkMode ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div className="fixed bottom-4 left-1/2 z-[100] w-[calc(100%-24px)] max-w-sm -translate-x-1/2 md:hidden">
        {isMobileMenuOpen && (
          <div className="mb-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)]/95 p-3 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all ${isActive ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                    <div className="flex items-center gap-3">{link.icon}<span>{link.label}</span></div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between rounded-full border border-[var(--border)] bg-[var(--bg-primary)]/95 p-2 shadow-2xl backdrop-blur-2xl">
          <Link to="/" className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${location.pathname === "/" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)]"}`}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--text-primary)]/5 px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] transition-all">
            <span>{isMobileMenuOpen ? "Fermer" : "Menu"}</span>
          </button>

          <div className="flex items-center gap-1">
            <button onClick={openChatMobile} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-green-500"></span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}