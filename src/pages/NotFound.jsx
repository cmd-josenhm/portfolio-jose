import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page introuvable — José Nahounmè";
  }, []);

  return (
    <section className="not-found-page">
      <div className="not-found-container">
        <span className="not-found-code">404</span>

        <h1 className="not-found-title">
          Oups, cette page n’existe pas.
        </h1>

        <p className="not-found-text">
          Le lien est peut-être incorrect, ou la page a été déplacée.
          Pas de panique — revenons sur un terrain plus sûr.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn-primary">
            Retour à l’accueil
            <span>→</span>
          </Link>

          <Link to="/contact" className="not-found-btn-secondary">
            Me contacter
          </Link>
        </div>

        <div className="not-found-links">
          <Link to="/projets">Projets</Link>
          <span className="not-found-dot" />
          <Link to="/a-propos">À propos</Link>
          <span className="not-found-dot" />
          <Link to="/blog">Blog</Link>
        </div>
      </div>
    </section>
  );
}