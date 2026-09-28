import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import projects from "../data/projects";

export default function Home() {
  useEffect(() => {
    document.title = "José Nahounmè — Développeur Fullstack & Graphiste";
  }, []);

  return (
    <div className="animate-fade-in">
      <Hero />
      
      {/* 1. CARROUSEL PROJETS */}
      <section className="py-20 overflow-hidden bg-black/20 border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">Projets Récents</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Une sélection de mes dernières réalisations.</p>
          </div>
          <Link to="/projets" className="hidden md:inline-flex text-xs font-bold text-[var(--accent)] hover:underline">
            Voir tout le portfolio →
          </Link>
        </div>
        
        <Link to="/projets" className="relative flex overflow-x-hidden group cursor-pointer">
          <div className="animate-marquee flex whitespace-nowrap gap-6 px-3">
            {[...projects, ...projects].map((p, i) => (
              <div key={i} className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] shrink-0 transition-transform group-hover:opacity-80 hover:!opacity-100 hover:scale-[1.02]">
                <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[9px] font-bold text-[var(--accent)] uppercase">{p.category}</span>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </Link>
        <div className="text-center mt-8 md:hidden">
          <Link to="/projets" className="text-xs font-bold text-[var(--accent)] hover:underline">
            Voir tout le portfolio →
          </Link>
        </div>
      </section>

      {/* 2. COMPÉTENCES */}
      <Skills />

      {/* 3. CLIENTS */}
      <Clients />

      {/* 4. TÉMOIGNAGES */}
      <Testimonials />
    </div>
  );
}