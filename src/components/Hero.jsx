import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".hero-kicker", { y: 15, opacity: 0, duration: 0.6 })
        .from(".hero-title-line", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.3")
        .from(".hero-description", { y: 15, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-actions", { y: 15, opacity: 0, duration: 0.5 }, "-=0.4");
      
      gsap.to(".hero-orb", { y: -15, x: 10, scale: 1.05, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-24 md:px-10 md:pb-24 md:pt-32">
      <div ref={orbRef} className="hero-orb pointer-events-none absolute left-[55%] top-[40%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/15 blur-[100px] md:h-[500px] md:w-[500px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="hero-content max-w-5xl">
          <p className="hero-kicker mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)] md:text-xs">
            Disponible pour missions Freelance & Télétravail
          </p>

          <h1 className="overflow-hidden text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="hero-title-line block">Je suis Développeur</span>
            <span className="hero-title-line block text-[var(--accent)]">Fullstack & Graphiste</span>
            <span className="hero-title-line block">Designer.</span>
          </h1>

          <div className="hero-description mt-8 max-w-3xl">
            <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
              Je propulse la visibilité de votre entreprise grâce à mes compétences en design graphique 
              et en développement de sites web & applications mobiles. J'intègre la puissance de l'Intelligence Artificielle 
              pour vous livrer des produits modernes, responsives, sécurisés et 100% sur-mesure.
            </p>
          </div>

          <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(30,136,229,0.3)]">
              Démarrer un projet <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to="/a-propos" className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-sm px-6 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Découvrir ma stack technique
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}