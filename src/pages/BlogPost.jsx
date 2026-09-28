import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

const ALL_ARTICLES = {
  "convertir-video-en-audio-gratuitement-navigateur": {
    title: "Comment convertir une vidéo en audio gratuitement directement dans votre navigateur",
    category: "Outils Web",
    date: "2025-01-15",
    readTime: "4 min",
    author: "José Nahounmé",
    content: `
      <p>Vous avez trouvé une vidéo inspirante sur YouTube, un podcast filmé sur TikTok ou une interview sur Instagram et vous souhaitez en extraire uniquement le son ? La plupart des solutions en ligne vous obligent à uploader votre fichier sur un serveur tiers, ce qui pose un problème majeur de <strong>confidentialité</strong> et de <strong>rapidité</strong>.</p>

      <h2>Le problème des convertisseurs classiques</h2>
      <p>Les sites traditionnels de conversion vidéo en MP3 fonctionnent tous sur le même modèle : vous collez un lien, leur serveur télécharge la vidéo, la convertit, puis vous renvoie le fichier audio. Ce processus est lent, expose vos données à des tiers et dépend entièrement de la disponibilité de leurs serveurs.</p>

      <h2>La solution : la conversion côté client (dans votre navigateur)</h2>
      <p>Grâce aux technologies web modernes comme la <strong>Web Audio API</strong> et le <strong>WebCodecs API</strong>, il est désormais possible d'extraire et de convertir l'audio d'une vidéo <strong>directement dans votre navigateur</strong>, sans jamais envoyer le moindre octet à un serveur externe.</p>

      <p>Les avantages sont considérables :</p>
      <ul>
        <li><strong>Confidentialité totale</strong> : vos fichiers ne quittent jamais votre ordinateur.</li>
        <li><strong>Vitesse instantanée</strong> : la conversion utilise la puissance de votre processeur local.</li>
        <li><strong>Aucune inscription</strong> : pas de compte, pas d'email, pas de publicité.</li>
        <li><strong>Gratuit et illimité</strong> : aucune restriction de taille ou de nombre de conversions.</li>
      </ul>

      <h2>Comment ça marche techniquement ?</h2>
      <p>Le processus repose sur trois étapes clés :</p>
      <ol>
        <li><strong>Lecture du fichier</strong> : la vidéo est chargée dans le navigateur via l'API File.</li>
        <li><strong>Extraction de la piste audio</strong> : le WebCodecs API décode le flux audio de la vidéo.</li>
        <li><strong>Encodage en MP3/WAV</strong> : l'audio extrait est ré-encodé dans le format de votre choix et proposé au téléchargement.</li>
      </ol>

      <h2>Essayez par vous-même</h2>
      <p>J'ai développé <strong>Music Vivi</strong>, une application web gratuite et open-source qui implémente exactement ce processus. Glissez-déposez votre vidéo, choisissez le format de sortie, et téléchargez votre audio en quelques secondes.</p>
      <p><a href="https://music-vivi.netlify.app/" target="_blank" rel="noopener">→ Essayer Music Vivi gratuitement</a></p>
    `,
  },

  "alternative-linktree-gratuite-creer-page-liens-bio": {
    title: "Créer sa page de liens en bio gratuite : la meilleure alternative à Linktree en 2025",
    category: "Productivité",
    date: "2025-01-10",
    readTime: "5 min",
    author: "José Nahounmé",
    content: `
      <p>Linktree est devenu le standard pour les pages de liens en bio sur Instagram, TikTok et Twitter. Mais derrière sa simplicité apparente se cachent des <strong>limitations frustrantes</strong> : design générique, analytics payants, chargement lent et dépendance totale à une plateforme tierce.</p>

      <h2>Pourquoi quitter Linktree ?</h2>
      <p>Voici les 5 raisons principales qui poussent les créateurs à chercher une alternative :</p>
      <ul>
        <li><strong>Personnalisation limitée</strong> : tous les Linktree se ressemblent.</li>
        <li><strong>Performance médiocre</strong> : temps de chargement supérieur à 2 secondes.</li>
        <li><strong>Données captives</strong> : vos statistiques et vos liens appartiennent à Linktree.</li>
        <li><strong>Coût caché</strong> : les fonctionnalités essentielles nécessitent un abonnement Pro à 9$/mois.</li>
        <li><strong>SEO inexistant</strong> : votre page Linktree n'apparaîtra jamais dans les résultats Google.</li>
      </ul>

      <h2>La solution : créer votre propre bio-link en 30 secondes</h2>
      <p>J'ai développé <strong>Josee</strong>, une alternative 100% gratuite, ultra-légère et entièrement personnalisable. Aucune inscription requise, aucun serveur, tout fonctionne directement dans votre navigateur grâce au Local Storage.</p>

      <p>En moins de 30 secondes, vous pouvez :</p>
      <ul>
        <li>Ajouter autant de liens que vous le souhaitez.</li>
        <li>Personnaliser les couleurs, la photo de profil et la biographie.</li>
        <li>Prévisualiser le rendu en temps réel.</li>
        <li>Exporter votre page et l'héberger gratuitement sur Netlify ou Vercel.</li>
      </ul>

      <h2>Essayez Josee maintenant</h2>
      <p><a href="https://joseee.netlify.app/" target="_blank" rel="noopener">→ Créer ma page de bio gratuitement avec Josee</a></p>
    `,
  },

  "meilleurs-outils-gratuits-developpeurs-web-2025": {
    title: "Les 10 meilleurs outils gratuits pour développeurs web en 2025",
    category: "Développement",
    date: "2025-01-05",
    readTime: "7 min",
    author: "José Nahounmé",
    content: `
      <p>L'écosystème du développement web évolue à une vitesse fulgurante. Chaque mois, de nouveaux outils promettent de révolutionner votre workflow. Mais lesquels méritent vraiment votre attention ? Voici ma sélection personnelle des <strong>10 outils gratuits</strong> que j'utilise quotidiennement.</p>

      <h2>1. Supabase — Le backend en 5 minutes</h2>
      <p>Alternative open-source à Firebase, Supabase vous offre une base de données PostgreSQL complète, un système d'authentification et un stockage de fichiers, le tout gratuitement jusqu'à 500 Mo. C'est le choix idéal pour les projets de portfolio, les SaaS MVP et les applications temps réel.</p>

      <h2>2. Vercel — Le déploiement instantané</h2>
      <p>Connectez votre repo GitHub et Vercel déploie automatiquement votre site à chaque commit. Le CDN mondial, le SSL automatique et les previews par branche en font la plateforme de référence pour le frontend moderne.</p>

      <h2>3. v0.dev — Le code généré par IA</h2>
      <p>Décrivez l'interface que vous imaginez en langage naturel et v0 génère instantanément le code React/Tailwind complet. Un gain de temps colossal pour le prototypage rapide.</p>

      <h2>4. Realtime Colors — Le design en temps réel</h2>
      <p>Visualisez vos palettes de couleurs appliquées à une vraie interface web avant même d'écrire une ligne de code. Indispensable pour les designers et les développeurs frontend.</p>

      <h2>5. Fontshare — La typographie libre</h2>
      <p>Une collection croissante de polices de caractères professionnelles, 100% gratuites pour un usage personnel et commercial. La qualité rivalise avec les fonderies payantes.</p>

      <p><em>Retrouvez la liste complète et les liens directs sur ma <a href="/ressources">page de ressources</a>.</em></p>
    `,
  },

  "optimiser-seo-portfolio-developpeur-2025": {
    title: "Comment optimiser le SEO de son portfolio de développeur en 2025",
    category: "SEO & Marketing",
    date: "2024-12-28",
    readTime: "8 min",
    author: "José Nahounmé",
    content: `
      <p>Vous avez passé des semaines à concevoir un portfolio visuellement époustouflant avec des animations WebGL, des transitions GSAP et un design sombre minimaliste. Le problème ? <strong>Google ne voit rien de tout cela.</strong></p>

      <p>Les moteurs de recherche et les IA comme ChatGPT, Perplexity et Claude indexent du <strong>texte sémantique structuré</strong>, pas des pixels animés. Voici les 7 techniques concrètes que j'ai appliquées sur mon propre portfolio pour passer de 0 à une indexation complète en moins de 30 jours.</p>

      <h2>1. Le HTML sémantique avant tout</h2>
      <p>Remplacez vos <code>&lt;div&gt;</code> génériques par des balises HTML5 porteuses de sens : <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>. Chaque balise est un signal pour les crawlers.</p>

      <h2>2. Le JSON-LD structuré</h2>
      <p>Ajoutez des blocs de données structurées de type <code>Person</code>, <code>CreativeWork</code>, <code>BlogPosting</code> et <code>Review</code> dans chaque page. C'est le langage que Google et les IA utilisent pour comprendre qui vous êtes et ce que vous faites.</p>

      <h2>3. Le blog comme aimant à trafic</h2>
      <p>Chaque article de blog est une porte d'entrée supplémentaire depuis les moteurs de recherche. Rédigez des articles qui répondent à des questions réelles que vos clients potentiels tapent sur Google.</p>

      <h2>4. Le maillage interne stratégique</h2>
      <p>Chaque page de votre site doit contenir au moins 2 à 3 liens vers d'autres pages de votre site. Cela crée un réseau sémantique que les crawlers adorent parcourir.</p>

      <h2>5. La performance comme facteur de classement</h2>
      <p>Un site lent est un site pénalisé. Optimisez vos images, supprimez les scripts inutiles et visez un score Lighthouse supérieur à 90.</p>
    `,
  },

  "react-19-nouveautes-guide-complet": {
    title: "React 19 : le guide complet des nouveautés qui changent tout",
    category: "Développement",
    date: "2024-12-20",
    readTime: "10 min",
    author: "José Nahounmé",
    content: `
      <p>React 19 est officiellement disponible et c'est la mise à jour la plus significative depuis l'introduction des Hooks en 2019. Cette version introduit un nouveau paradigme de gestion des données, stabilise les Server Components et embarque un compilateur révolutionnaire.</p>

      <h2>Les Actions : la fin de useState pour les formulaires</h2>
      <p>Les Actions simplifient radicalement la gestion des soumissions de formulaires et des mutations de données. Fini le combo <code>useState</code> + <code>useEffect</code> + <code>try/catch</code> pour gérer un simple envoi de formulaire.</p>

      <h2>useOptimistic : l'UI instantanée</h2>
      <p>Ce nouveau hook permet d'afficher immédiatement le résultat d'une action avant même que le serveur ne confirme. L'expérience utilisateur devient instantanée, même sur des connexions lentes.</p>

      <h2>Le nouveau compilateur React</h2>
      <p>React 19 embarque un compilateur qui optimise automatiquement les re-rendus. Vous n'avez plus besoin de <code>useMemo</code>, <code>useCallback</code> ou <code>React.memo</code> dans la majorité des cas. Le compilateur fait le travail pour vous.</p>

      <h2>Server Components stabilisés</h2>
      <p>Les React Server Components (RSC) sont désormais stables et prêts pour la production. Ils permettent de rendre des composants directement sur le serveur, réduisant drastiquement la taille du bundle JavaScript envoyé au navigateur.</p>

      <h2>Comment migrer ?</h2>
      <p>La migration depuis React 18 est relativement simple. Mettez à jour vos dépendances avec <code>npm install react@latest react-dom@latest</code> et suivez le guide de migration officiel pour les breaking changes mineurs.</p>
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const article = ALL_ARTICLES[slug];

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Blog de José Nahounmé`;
    }
  }, [article]);

  // Redirection si l'article n'existe pas
  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="blog-post-page">
      {/* JSON-LD Article SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "datePublished": article.date,
          "author": {
            "@type": "Person",
            "name": article.author,
            "url": "https://josenahounme.vercel.app/a-propos",
          },
          "publisher": {
            "@type": "Person",
            "name": "José Nahounmé",
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://josenahounme.vercel.app/blog/${slug}`,
          },
        })}
      </script>

      <div className="blog-post-container">
        {/* Bouton retour */}
        <Link to="/blog" className="blog-post-back">
          <svg className="blog-post-back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au blog
        </Link>

        {/* En-tête de l'article */}
        <header className="blog-post-header">
          <span className="blog-post-category">{article.category}</span>
          <h1 className="blog-post-title">{article.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-author">{article.author}</span>
            <span className="blog-meta-dot" />
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
        </header>

        {/* Corps de l'article */}
        <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA final de l'article */}
        <footer className="blog-post-footer">
          <div className="blog-post-footer-card">
            <h3 className="blog-post-footer-title">Cet article vous a été utile ?</h3>
            <p className="blog-post-footer-text">
              Je suis disponible pour des projets de développement web, de design d'interface 
              et d'optimisation SEO. Discutons de votre prochain projet.
            </p>
            <div className="blog-post-footer-actions">
              <Link to="/contact" className="blog-post-cta-primary">
                Me contacter
                <span>→</span>
              </Link>
              <Link to="/projets" className="blog-post-cta-secondary">
                Voir mes projets
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}