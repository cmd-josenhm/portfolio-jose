import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import supabase from "../lib/supabase";
import emailjs from "@emailjs/browser";

const initialForm = {
  nom: "",
  prenoms: "",
  email: "",
  tel: "",
  ville: "",
  typeProjet: "Site Web & Application",
  message: "",
};

export default function Contact() {
  const pageRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [isFocused, setIsFocused] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.title =
      "Contactez José Nahounmè | Développeur Fullstack & Graphiste à Cotonou";
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".contact-panel", {
        y: 35,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSubmitted(false);

    try {
      const { error: dbError } = await supabase.from("messages").insert([
        {
          nom: form.nom,
          prenoms: form.prenoms,
          email: form.email,
          tel: form.tel || "",
          ville: form.ville || "",
          type_projet: form.typeProjet,
          message: form.message,
        },
      ]);

      if (dbError) throw dbError;

      const templateParams = {
        from_name: `${form.nom} ${form.prenoms}`,
        from_email: form.email,
        project_type: form.typeProjet,
        message: `Téléphone : ${form.tel || "Non renseigné"}\nVille : ${form.ville || "Non renseignée"}\n\nMessage :\n${form.message}`,
      };

      await emailjs.send(
        "service_2j9oyiq",
        "template_6114jod",
        templateParams,
        "24rzy-9wloVu4L7LF"
      );

      setForm(initialForm);
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      setErrorMsg(
        "Une erreur est survenue. Réessayez ou contactez-moi directement via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article
      ref={pageRef}
      className="relative min-h-screen px-6 py-28 md:px-10 md:py-36 overflow-hidden"
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact — José Nahounmè",
          description:
            "Formulaire de contact de José Nahounmè, développeur web fullstack et graphiste designer à Cotonou, Bénin.",
          url: "https://josenahounme.vercel.app/contact",
          mainEntity: {
            "@type": "Person",
            name: "José Nahounmè",
            email: "josenahounme@gmail.com",
            telephone: "+2290151370949",
            jobTitle: "Développeur Web Fullstack & Graphiste",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Cotonou",
              addressCountry: "Benin",
            },
          },
        })}
      </script>

      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[450px] w-[450px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="contact-header mb-12 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Démarrer une collaboration
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] md:text-base md:leading-8">
            Vous avez une idée ambitieuse, un site internet à concevoir ou une
            marque à valoriser ? Envoyez-moi un message pour en discuter et
            donner vie à vos objectifs.
          </p>
        </header>

        <div className="contact-panel grid overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-secondary)]/60 backdrop-blur-md lg:grid-cols-12 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
          <div className="p-8 md:p-12 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--border)] flex flex-col justify-between bg-[var(--bg-primary)]/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-bold text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Disponible pour de nouveaux projets
              </div>

              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-3xl leading-snug">
                Construisons quelque chose de mémorable ensemble.
              </h2>

              <p className="mt-4 text-xs leading-6 text-[var(--text-secondary)]">
                Je réponds sous 24 heures. Vous pouvez aussi me joindre
                directement via mes canaux prioritaires.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:josenahounme@gmail.com"
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Email Professionnel
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)] break-all">
                      josenahounme@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/2290151370949?text=Bonjour%20José%2C%20je%20souhaite%20collaborer%20sur%20un%20projet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-all duration-300 hover:border-green-500/40 hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 transition-colors group-hover:bg-green-500 group-hover:text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5zM12 18.75l-4.5 2.25 1.5-4.5"/></svg>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      WhatsApp Direct
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      +229 01 51 37 09 49
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <p className="mt-8 text-[10px] text-[var(--text-secondary)]">
              Horaires : Lundi — Samedi (08h00 – 20h00 GMT+1)
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 lg:col-span-7 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  Type de projet *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    "Site Web & Application",
                    "Design & Logo",
                    "Autre demande",
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, typeProjet: type }))
                      }
                      className={`rounded-xl px-3 py-2.5 text-[10px] font-bold transition-all text-center border ${
                        form.typeProjet === type
                          ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-md"
                          : "bg-[var(--bg-primary)]/50 text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Nom *
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("nom")}
                    onBlur={() => setIsFocused("")}
                    className={`w-full rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                      isFocused === "nom"
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)]"
                    }`}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="prenoms" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Prénoms *
                  </label>
                  <input
                    id="prenoms"
                    name="prenoms"
                    type="text"
                    required
                    value={form.prenoms}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("prenoms")}
                    onBlur={() => setIsFocused("")}
                    className={`w-full rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                      isFocused === "prenoms"
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)]"
                    }`}
                    placeholder="Vos prénoms"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused("")}
                    className={`w-full rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                      isFocused === "email"
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)]"
                    }`}
                    placeholder="adresse@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="tel" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    value={form.tel}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("tel")}
                    onBlur={() => setIsFocused("")}
                    className={`w-full rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                      isFocused === "tel"
                        ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--border)]"
                    }`}
                    placeholder="+229 01 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ville" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Ville / Pays
                </label>
                <input
                  id="ville"
                  name="ville"
                  type="text"
                  value={form.ville}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("ville")}
                  onBlur={() => setIsFocused("")}
                  className={`w-full rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                    isFocused === "ville"
                      ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                      : "border-[var(--border)]"
                  }`}
                  placeholder="Cotonou, Bénin"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Détails de votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("message")}
                  onBlur={() => setIsFocused("")}
                  className={`w-full resize-none rounded-xl border bg-[var(--bg-primary)]/50 px-4 py-3 text-xs text-[var(--text-primary)] outline-none transition-all ${
                    isFocused === "message"
                      ? "border-[var(--accent)] ring-1 ring-[var(--accent)]"
                      : "border-[var(--border)]"
                  }`}
                  placeholder="Décrivez brièvement vos objectifs, vos délais estimés ou votre budget..."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-[var(--text-secondary)]">
                * Champs requis.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[rgba(30,136,229,0.35)] disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                {!isSubmitting && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                )}
              </button>
            </div>

            {submitted && (
              <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-xs font-semibold text-green-600 dark:text-green-400">
                ✓ Message envoyé avec succès ! Je vous recontacte très
                rapidement par email.
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-600 dark:text-red-400">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </article>
  );
}