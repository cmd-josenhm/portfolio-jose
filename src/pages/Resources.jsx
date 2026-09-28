import { useEffect, useState, useMemo } from "react";

// Données initiales des ressources (seront migrées sur Supabase plus tard)
const RESOURCES_DATA = [
  {
    id: 1,
    name: "Supabase",
    description: "L'alternative open-source à Firebase. Base de données PostgreSQL temps réel, authentification et stockage.",
    category: "Outils Dev",
    link: "https://supabase.com/",
    badge: "Backend",
  },
  {
    id: 2,
    name: "Vercel",
    description: "La plateforme d'hébergement par excellence pour le frontend, optimisée pour React, Next.js et la performance SEO.",
    category: "Outils Dev",
    link: "https://vercel.com/",
    badge: "Hébergement",
  },
  {
    id: 3,
    name: "Realtime Colors",
    description: "Visualisez en temps réel des palettes de couleurs complètes sur une fausse page web avant de coder.",
    category: "Design & UI",
    link: "https://realtimecolors.com/",
    badge: "Couleurs",
  },
  {
    id: 4,
    name: "v0.dev",
    description: "Générez instantanément des composants d'interface React/Tailwind complets à partir d'un simple prompt IA.",
    category: "Intelligence Artificielle",
    link: "https://v0.dev/",
    badge: "Code Gen",
  },
  {
    id: 5,
    name: "Fontshare",
    description: "Une bibliothèque extraordinaire de polices de caractères gratuites à usage personnel et commercial.",
    category: "Design & UI",
    link: "https://www.fontshare.com/",
    badge: "Typo",
  },
  {
    id: 6,
    name: "Unsplash API",
    description: "Intégrez gratuitement des millions de photos libres de droits de haute qualité directement dans vos apps.",
    category: "Design & UI",
    link: "https://unsplash.com/developers",
    badge: "Photos",
  },
];

// Code snippet utile à partager
const CODE_SNIPPET = `// hook React pour persister un état dans le LocalStorage
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`;

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Titre SEO de la page
  useEffect(() => {
    document.title = "Ressources & Outils Gratuits pour Développeurs et Créateurs | José Nahounmé";
  }, []);

  // Filtrage combiné (Recherche + Onglets)
  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((res) => {
      const matchesCategory = activeCategory === "Tous" || res.category === activeCategory;
      const matchesSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Copier le code dans le presse-papier
  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="relative min-h-screen px-6 py-28 md:px-10 md:py-36 overflow-hidden">
      {/* JSON-LD de type CollectionPage pour indexation SEO par les IA & Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Ressources & Outils pour Créateurs de Sites",
          "description": "Sélection gratuite d'outils de développement, de design UI/UX et de générateurs IA.",
          "url": "https://josenahounme.vercel.app/ressources",
          "about": ["Web Development", "UI/UX Design", "Artificial Intelligence"],
        })}
      </script>

      {/* Halo d'arrière-plan */}
      <div className="pointer-events-none absolute left-10 bottom-10 h-[450px] w-[450px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        
        {/* ====================================================
            EN-TÊTE DE LA PAGE
            ==================================================== */}
        <header className="mb-12 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Hub de Ressources
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Ressources & Outils
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] md:text-base md:leading-8">
            Une boîte à outils sélectionnée avec rigueur pour booster la productivité de vos projets : 
            du design au déploiement, en passant par l'optimisation par l'Intelligence Artificielle.
          </p>
        </header>

        {/* ====================================================
            BENTO GRID LAYOUT
            ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* GAUCHE : OUTILS & RECHERCHE (COL-SPAN 7) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Barre de Filtres & Recherche */}
            <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un outil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[var(--border)] bg-black/10 px-5 py-3 pl-11 text-xs outline-none transition-all focus:border-[var(--accent)]"
                />
                <svg className="absolute left-4 top-3.5 h-4 w-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Sélecteur de filtres rapide */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
                {["Tous", "Outils Dev", "Design & UI", "Intelligence Artificielle"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-[10px] font-bold transition-all ${
                      activeCategory === cat
                        ? "bg-[var(--accent)] text-white"
                        : "bg-black/10 text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    {cat.split(" ")[0]} {/* Raccourcir le texte sur mobile */}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille Bento de Ressources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredResources.map((res) => (
                <a
                  key={res.id}
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 backdrop-blur-md transition-all duration-300 hover:border-[var(--accent)]/30 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[9px] font-bold tracking-wider text-[var(--accent)]">
                      {res.badge}
                    </span>
                    <svg className="h-4 w-4 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
                    {res.name}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
                    {res.description}
                  </p>
                </a>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="py-12 text-center rounded-3xl border border-dashed border-[var(--border)] text-xs text-[var(--text-secondary)]">
                Aucune ressource trouvée pour cette recherche.
              </div>
            )}
          </section>

          {/* DROITE : SNIPPETS COPIABLES INTERACTIFS (COL-SPAN 5) */}
          <section className="lg:col-span-5">
            <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--bg-secondary)]/80 to-black/30 backdrop-blur-md shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
              <header className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent)]">React Hook</span>
                  <h3 className="text-base font-extrabold tracking-tight text-white mt-1">
                    Snippet de code utile
                  </h3>
                </div>

                {/* Bouton copier performant */}
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold transition-all ${
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copié !
                    </>
                  ) : (
                    <>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copier le code
                    </>
                  )}
                </button>
              </header>

              {/* Visualisateur de code stylisé */}
              <div className="mt-4 overflow-x-auto rounded-2xl bg-[#080808] border border-white/5 p-4 font-mono text-[11px] leading-relaxed text-gray-300">
                <pre>{CODE_SNIPPET}</pre>
              </div>

              <footer className="mt-4 flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
                <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>Utilisez ce hook pour gérer des états d'interfaces persistants.</span>
              </footer>
            </div>
          </section>

        </div>
      </div>
    </article>
  );
}