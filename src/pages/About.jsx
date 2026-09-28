import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export default function About() {
  const pageRef = useRef(null);
  const mainImageRef = useRef(null);
  const secondaryImageRef = useRef(null);
  const thirdImageRef = useRef(null);

  useEffect(() => {
    document.title = "À propos de José Nahounmè | Développeur Fullstack & Graphiste";
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(".about-header", { y: 30, opacity: 0, duration: 0.8 })
        .from(".about-gallery", { scale: 0.95, opacity: 0, duration: 1 }, "-=0.5")
        .from(".about-body p", { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.6")
        .from(".about-stack", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".about-actions", { y: 15, opacity: 0, duration: 0.5 }, "-=0.3");

      gsap.to(".floating-polaroid-1", { rotate: -3, y: -6, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".floating-polaroid-2", { rotate: 4, y: 6, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, pageRef);

    const handleMouseMove = (event) => {
      const page = pageRef.current;
      if (!page) return;
      const rect = page.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(mainImageRef.current, { x: mouseX * 8, y: mouseY * 6, rotateY: mouseX * 4, rotateX: mouseY * -4, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      gsap.to(secondaryImageRef.current, { x: mouseX * -15, y: mouseY * -12, rotate: -4 + mouseX * -3, duration: 0.7, ease: "power2.out", overwrite: "auto" });
      gsap.to(thirdImageRef.current, { x: mouseX * 12, y: mouseY * -15, rotate: 6 + mouseX * 3, duration: 0.7, ease: "power2.out", overwrite: "auto" });
    };

    const handleMouseLeave = () => {
      gsap.to([mainImageRef.current, secondaryImageRef.current, thirdImageRef.current], { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(secondaryImageRef.current, { rotate: -6 });
      gsap.to(thirdImageRef.current, { rotate: 8 });
    };

    const page = pageRef.current;
    page.addEventListener("mousemove", handleMouseMove, { passive: true });
    page.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      page.removeEventListener("mousemove", handleMouseMove);
      page.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <article ref={pageRef} className="relative min-h-screen px-6 py-28 md:px-10 md:py-36 overflow-hidden flex flex-col">
      
      {/* Schema Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "José Nahounmè",
          "jobTitle": "Développeur Web Fullstack & Graphiste",
          "url": "https://josenahounme.vercel.app",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cotonou",
            "addressCountry": "Benin"
          },
          "knowsAbout": ["React", "Node.js", "PostgreSQL", "Graphic Design"]
        })}
      </script>

      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-20">
          
          {/* VISUELS (GAUCHE) */}
          <div className="about-gallery lg:col-span-5 flex justify-center order-last lg:order-first pt-10">
            <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5]">
              <div ref={mainImageRef} className="relative z-10 w-[80%] mx-auto overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-secondary)] shadow-[0_30px_80px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-[1.02]">
                <img src="/profill.PNG" alt="José Nahounmè" className="aspect-[4/5] w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#111111]/40 via-transparent to-[var(--accent)]/10" />
              </div>

              <div ref={secondaryImageRef} className="floating-polaroid-1 absolute -left-4 top-[22%] z-20 w-[115px] md:w-[140px] -rotate-6 rounded-2xl border border-white/10 bg-[#151515] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden rounded-lg">
                  <img src="/images/profil.png" alt="Design Graphique" className="aspect-[1/1] w-full object-cover opacity-85 hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-2 text-center text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">UI/UX Design</p>
              </div>

              <div ref={thirdImageRef} className="floating-polaroid-2 absolute -right-4 bottom-[15%] z-20 w-[125px] md:w-[150px] rotate-8 rounded-2xl border border-white/10 bg-[#151515] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden rounded-lg">
                  <img src="/projects/mon-portfolio/profile.jpeg" alt="Code" className="aspect-[1/1] w-full object-cover opacity-85 hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-2 text-center text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">Fullstack Dev</p>
              </div>
            </div>
          </div>

          {/* CONTENU (DROITE) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <header className="about-header">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Profil Professionnel
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                José Nahounmè
              </h1>
              <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                Développeur Web Fullstack & Graphiste
              </p>
            </header>

            <div className="about-body mt-8 space-y-6 text-sm md:text-base leading-8 text-[var(--text-secondary)]">
              <p>
                Passionné par la création de solutions digitales performantes, j'évolue à l'intersection parfaite entre la conception visuelle et l'ingénierie logicielle. Avec <strong>plus de 4 ans d'expérience</strong>, j'accompagne les entreprises de la conceptualisation graphique jusqu'au déploiement technique de leurs projets web.
              </p>
              <p>
                Mon parcours est marqué par l'entrepreneuriat : ancien <strong>PDG de Véritable Prod (Imprimerie)</strong>, j'ai acquis une solide expérience en gestion d'équipe et en relation client. Aujourd'hui, je mets cette vision business au service du code, pour concevoir des applications web robustes, centrées sur l'utilisateur et pensées pour le référencement (SEO).
              </p>
            </div>

            {/* STACK TECHNIQUE (BENTO GRID) */}
            <div className="about-stack mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Frontend */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">Frontend</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
                  React, Next.js, TypeScript, JavaScript, TailwindCSS, HTML/CSS
                </p>
              </div>

              {/* Backend & DevOps */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">Backend & Cloud</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
                  Node.js, Express, PHP, PostgreSQL, Prisma, Supabase, Vercel
                </p>
              </div>

              {/* Design & CMS */}
              <div className="sm:col-span-2 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">Design, CMS & IA</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
                  Photoshop, Illustrator, InDesign, Canva, WordPress, Shopify, ChatGPT, Claude
                </p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="about-actions mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/mon-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--bg-secondary)] to-[#202020] border border-[var(--border)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg"
              >
                <svg className="h-4 w-4 text-[var(--accent)] transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Visualiser mon CV complet
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(30,136,229,0.25)]"
              >
                Me recruter / Collaborer
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* BOUTON ADMIN SECRET (Easter Egg) */}
      <Link 
        to="/admin" 
        className="absolute bottom-4 right-4 w-4 h-4 rounded-full opacity-0 hover:opacity-100 hover:bg-[var(--accent)] transition-all"
        title="Admin Portal"
      />
    </article>
  );
}