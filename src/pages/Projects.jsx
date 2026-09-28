import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import projects from "../data/projects";
import ProjectModal from "../components/ProjectModal";
import Game from "../components/Game";

const CATEGORIES = ["Tous", "Web & Applications", "Design & Logos"];

export default function Projects() {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  useEffect(() => {
    document.title = "Mes Réalisations | José Nahounmè — Projets Design, Web & Expériences";
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "Tous") return true;
    const catLower = project.category.toLowerCase();
    if (activeCategory === "Web & Applications") {
      return catLower.includes("web") || catLower.includes("app") || catLower.includes("saas") || catLower.includes("portfolio") || catLower.includes("client-side");
    }
    if (activeCategory === "Design & Logos") {
      return catLower.includes("design") || catLower.includes("logos") || catLower.includes("création");
    }
    return true;
  });

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || isPlayingGame) return;
    const cards = grid.querySelectorAll("[data-project-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: "auto" });
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory, isPlayingGame]);

  // Effet de parallaxe 3D sur ordinateur
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || isPlayingGame) return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cards = grid.querySelectorAll("[data-project-card]");
    const cleanups = [];

    cards.forEach((card) => {
      const inner = card.querySelector(".project-card-inner");
      const image = card.querySelector(".project-card-image");
      const arrow = card.querySelector(".project-card-arrow");

      if (!inner || !image) return;

      const handleMouseMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(inner, {
          rotateX: y * -6,
          rotateY: x * 6,
          y: -3,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(image, {
          x: x * -12,
          y: y * -12,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 3,
            y: -3,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(inner, { rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        gsap.to(image, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      };

      card.addEventListener("mousemove", handleMouseMove, { passive: true });
      card.addEventListener("mouseleave", handleMouseLeave, { passive: true });

      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [filteredProjects, isPlayingGame]);

  // VUE DU JEU
  if (isPlayingGame) {
    return (
      <div className="animate-fade-in min-h-screen bg-[var(--bg-primary)] py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <button onClick={() => setIsPlayingGame(false)} className="group mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-2.5 text-xs font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--accent)]">
            ← Retourner aux projets
          </button>
          <div className="rounded-[2.5rem] border border-[var(--border)] overflow-hidden bg-black shadow-2xl">
            <Game onBack={() => setIsPlayingGame(false)} darkMode={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article ref={pageRef} className="relative min-h-screen px-6 py-28 md:px-10 md:py-36 overflow-hidden">
      {/* Schema JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Portfolio de José Nahounmè",
          "numberOfItems": filteredProjects.length,
          "itemListElement": filteredProjects.map((proj, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "CreativeWork",
              "name": proj.name,
              "image": proj.cover,
              "description": proj.description,
              "genre": proj.category,
            },
          })),
        })}
      </script>

      <div className="pointer-events-none absolute right-10 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--accent)]/5 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Portfolio</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Mes Réalisations</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] md:text-base md:leading-8">
            Une galerie sélective d'applications web interactives et d'identités visuelles conçues sur-mesure.
          </p>
        </header>

        {/* ONGLETS */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[var(--border)] pb-6">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full px-5 py-2 text-xs font-bold tracking-wide transition-all duration-350 ${activeCategory === cat ? "bg-[var(--accent)] text-white shadow-md" : "bg-[var(--bg-secondary)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE PROJETS */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div key={project.id} data-project-card className="group relative cursor-pointer outline-none [perspective:1000px]" role="button" tabIndex={0} onClick={() => setSelectedProject(project)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedProject(project); } }}>
              <div className="project-card-inner relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-secondary)]/60 backdrop-blur-md transition-all duration-500 group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={project.cover} alt={project.name} className="project-card-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading={index < 3 ? "eager" : "lazy"} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-95" />
                  <span className="project-card-arrow absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[var(--accent)]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                  </span>
                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-bold tracking-[0.15em] text-white/80 backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">{project.category}</span>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight text-white md:text-2xl">{project.name}</h2>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4 bg-black/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-white transition-colors">Explorer l'étude de cas</span>
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(30,136,229,0.8)]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ====================================================
            1. GROS BOUTON RESSOURCES (AVANT LE JEU)
            ==================================================== */}
        <section className="mt-20 p-10 md:p-14 rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col items-center text-center shadow-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4 animate-bounce">
            🎁 Bonus Caché pour les Créateurs
          </span>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] md:text-4xl">
            Découvrez ma boîte à outils secrète
          </h2>
          <p className="mt-3 max-w-lg text-sm text-[var(--text-secondary)]">
            Hébergement gratuit, banques d'images, générateurs IA, et snippets de code React à copier-coller.
          </p>
          
          {/* BOUTON CORRIGÉ — lisible en dark & light */}
          <Link 
            to="/ressources" 
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-8 py-4 text-sm font-extrabold transition-all hover:scale-105 hover:shadow-[0_10px_40px_rgba(30,136,229,0.4)]"
          >
            Ressources pour les Devs & Designers
            <span>→</span>
          </Link>
        </section>

        {/* ====================================================
            2. LE JEU (LAB CRÉATIF)
            ==================================================== */}
        <section className="mt-16 rounded-[2.5rem] border border-[var(--border)] bg-gradient-to-br from-[var(--bg-secondary)]/50 to-black/25 p-8 md:p-14 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Laboratoire Créatif</span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">Prêt pour une expérience interactive ?</h2>
          <div className="mt-8">
            <button onClick={() => setIsPlayingGame(true)} className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5">
              Lancer l'expérience <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>
        </section>

        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </article>
  );
}