import { useEffect } from "react";
import { Link } from "react-router-dom";

const ARTICLES = [
  {
    slug: "convertir-video-en-audio-gratuitement-navigateur",
    title: "Comment convertir une vidéo en audio gratuitement directement dans votre navigateur",
    excerpt: "Découvrez comment extraire le son d'une vidéo YouTube, TikTok ou Instagram en quelques secondes, sans installer de logiciel, sans serveur et en toute confidentialité.",
    category: "Outils Web",
    date: "2025-01-15",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "alternative-linktree-gratuite-creer-page-liens-bio",
    title: "Créer sa page de liens en bio gratuite : la meilleure alternative à Linktree en 2025",
    excerpt: "Linktree est lent, limité et payant pour les fonctionnalités essentielles. Voici comment créer votre propre page de bio en moins de 30 secondes, gratuitement et sans inscription.",
    category: "Productivité",
    date: "2025-01-10",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "meilleurs-outils-gratuits-developpeurs-web-2025",
    title: "Les 10 meilleurs outils gratuits pour développeurs web en 2025",
    excerpt: "De l'hébergement à la génération de code par IA, en passant par le design UI et les bases de données temps réel : la boîte à outils ultime du développeur moderne.",
    category: "Développement",
    date: "2025-01-05",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "optimiser-seo-portfolio-developpeur-2025",
    title: "Comment optimiser le SEO de son portfolio de développeur en 2025",
    excerpt: "90% des portfolios de développeurs sont invisibles sur Google. Voici les techniques concrètes de référencement naturel, de JSON-LD et de maillage interne pour sortir du lot.",
    category: "SEO & Marketing",
    date: "2024-12-28",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "react-19-nouveautes-guide-complet",
    title: "React 19 : le guide complet des nouveautés qui changent tout",
    excerpt: "Actions, useOptimistic, Server Components stabilisés, nouveau compilateur : décryptage complet de la version la plus importante de React depuis les Hooks.",
    category: "Développement",
    date: "2024-12-20",
    readTime: "10 min",
    featured: false,
  },
];

export default function Blog() {
  useEffect(() => {
    document.title = "Blog & Articles | José Nahounmé — Développement Web, Design & SEO";
  }, []);

  const featuredArticles = ARTICLES.filter((a) => a.featured);
  const regularArticles = ARTICLES.filter((a) => !a.featured);

  return (
    <article className="blog-page">
      {/* JSON-LD Blog SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog de José Nahounmé",
          "description": "Articles sur le développement web, le design UI/UX, le SEO et les outils gratuits pour créateurs.",
          "url": "https://josenahounme.vercel.app/blog",
          "author": {
            "@type": "Person",
            "name": "José Nahounmé",
          },
          "blogPost": ARTICLES.map((a) => ({
            "@type": "BlogPosting",
            "headline": a.title,
            "datePublished": a.date,
            "url": `https://josenahounme.vercel.app/blog/${a.slug}`,
          })),
        })}
      </script>

      <div className="blog-container">
        {/* En-tête */}
        <header className="blog-header">
          <span className="blog-kicker">Blog & Ressources</span>
          <h1 className="blog-title">Articles & Guides</h1>
          <p className="blog-subtitle">
            Des guides pratiques, des tutoriels et des analyses sur le développement web, 
            le design d'interface et le référencement naturel. Écrits pour être utiles, pas pour faire joli.
          </p>
        </header>

        {/* Articles en vedette */}
        {featuredArticles.length > 0 && (
          <section className="blog-featured-section">
            <span className="blog-section-label">À la une</span>
            <div className="blog-featured-grid">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="blog-featured-card"
                >
                  <div className="blog-featured-badge">{article.category}</div>
                  <h2 className="blog-featured-title">{article.title}</h2>
                  <p className="blog-featured-excerpt">{article.excerpt}</p>
                  <div className="blog-featured-meta">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="blog-meta-dot" />
                    <span>{article.readTime} de lecture</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Articles réguliers */}
        {regularArticles.length > 0 && (
          <section className="blog-regular-section">
            <span className="blog-section-label">Tous les articles</span>
            <div className="blog-regular-list">
              {regularArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="blog-regular-card"
                >
                  <div className="blog-regular-content">
                    <span className="blog-regular-category">{article.category}</span>
                    <h3 className="blog-regular-title">{article.title}</h3>
                    <p className="blog-regular-excerpt">{article.excerpt}</p>
                  </div>
                  <div className="blog-regular-meta">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span className="blog-meta-dot" />
                    <span>{article.readTime}</span>
                  </div>
                  <svg className="blog-regular-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA final */}
        <section className="blog-cta">
          <h2 className="blog-cta-title">Une question ou un projet ?</h2>
          <p className="blog-cta-text">
            Ces articles vous ont été utiles ? Imaginez ce que je peux faire pour votre projet.
          </p>
          <Link to="/contact" className="blog-cta-button">
            Me contacter
            <span>→</span>
          </Link>
        </section>
      </div>
    </article>
  );
}