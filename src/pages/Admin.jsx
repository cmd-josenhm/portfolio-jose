import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import supabase from "../lib/supabase";
import "./Admin.css";

const TABS = [
  { id: "overview", label: "Vue d'ensemble", icon: "📊" },
  { id: "messages", label: "Messages", icon: "✉️" },
  { id: "projects", label: "Projets", icon: "💼" },
  { id: "resources", label: "Ressources", icon: "📦" },
  { id: "articles", label: "Articles Blog", icon: "📝" },
  { id: "trash", label: "Corbeille", icon: "🗑️" },
  { id: "settings", label: "Paramètres", icon: "⚙️" },
];

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Toutes les données (Actives + Corbeille)
  const [messages, setMessages] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [resourcesList, setResourcesList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [newProject, setNewProject] = useState({ name: "", category: "", description: "", cover: "", link: "", tools: "", images: "" });
  const [newResource, setNewResource] = useState({ name: "", category: "Outils Dev", description: "", link: "", badge: "Outil" });
  const [newArticle, setNewArticle] = useState({ title: "", slug: "", category: "Développement", excerpt: "", content: "", read_time: "5 min" });

  useEffect(() => {
    document.title = "Administration Console";
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = useCallback(async () => {
    const [m, p, r, a] = await Promise.all([
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("resources").select("*").order("created_at", { ascending: false }),
      supabase.from("articles").select("*").order("created_at", { ascending: false }),
    ]);
    if (m.data) setMessages(m.data);
    if (p.data) setProjectsList(p.data);
    if (r.data) setResourcesList(r.data);
    if (a.data) setArticlesList(a.data);
  }, []);

  useEffect(() => { if (session) fetchAllData(); }, [session, fetchAllData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError("Email ou mot de passe incorrect.");
    setAuthLoading(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  /* ========================================================
     FILTRAGE ACTIF VS CORBEILLE
     ======================================================== */
  const activeMessages = messages.filter((m) => !m.is_trash);
  const activeProjects = projectsList.filter((p) => !p.is_trash);
  const activeResources = resourcesList.filter((r) => !r.is_trash);
  const activeArticles = articlesList.filter((a) => !a.is_trash);

  const trashMessages = messages.filter((m) => m.is_trash);
  const trashProjects = projectsList.filter((p) => p.is_trash);
  const trashResources = resourcesList.filter((r) => r.is_trash);
  const trashArticles = articlesList.filter((a) => a.is_trash);

  const totalTrashCount = trashMessages.length + trashProjects.length + trashResources.length + trashArticles.length;
  const unreadCount = activeMessages.filter((m) => !m.is_read).length;

  /* ========================================================
     ACTIONS GLOBALES (CORBEILLE / RESTAURATION / SUPPRESSION DÉFINITIVE)
     ======================================================== */
  
  // Placer ou sortir de la corbeille
  const handleTrashToggle = async (table, id, isTrash) => {
    const { error } = await supabase.from(table).update({ is_trash: isTrash }).eq("id", id);
    if (error) {
      alert("Erreur lors de l'opération.");
      return;
    }
    
    // Mise à jour locale
    const updater = (prev) => prev.map((item) => (item.id === id ? { ...item, is_trash: isTrash } : item));
    if (table === "messages") setMessages(updater);
    if (table === "projects") setProjectsList(updater);
    if (table === "resources") setResourcesList(updater);
    if (table === "articles") setArticlesList(updater);
  };

  // Suppression définitive (Hard Delete)
  const handleHardDelete = async (table, id) => {
    if (!confirm("Attention : Cette suppression est DÉFINITIVE et irréversible. Continuer ?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert("Erreur lors de la suppression.");
      return;
    }
    
    const filterer = (prev) => prev.filter((item) => item.id !== id);
    if (table === "messages") setMessages(filterer);
    if (table === "projects") setProjectsList(filterer);
    if (table === "resources") setResourcesList(filterer);
    if (table === "articles") setArticlesList(filterer);
  };

  /* ========================================================
     AUTRES ACTIONS CRUD (CRÉATION, MODIFICATION, MARQUER LU)
     ======================================================== */
  const toggleRead = async (id, status) => {
    await supabase.from("messages").update({ is_read: !status }).eq("id", id);
    setMessages((p) => p.map((m) => (m.id === id ? { ...m, is_read: !status } : m)));
  };

  const createProject = async (e) => {
    e.preventDefault();
    const tools = newProject.tools.split(",").map((t) => t.trim()).filter(Boolean);
    const images = newProject.images.split(",").map((i) => i.trim()).filter(Boolean);
    const { data, error } = await supabase.from("projects").insert([{ ...newProject, tools, images }]).select();
    if (!error && data) { setProjectsList((p) => [data[0], ...p]); setShowProjectForm(false); setNewProject({ name: "", category: "", description: "", cover: "", link: "", tools: "", images: "" });}
  };

  const updateProject = async (e) => {
    e.preventDefault();
    const tools = editingProject.tools_input.split(",").map((t) => t.trim()).filter(Boolean);
    const images = editingProject.images_input.split(",").map((i) => i.trim()).filter(Boolean);
    const { data, error } = await supabase.from("projects").update({ name: editingProject.name, category: editingProject.category, description: editingProject.description, cover: editingProject.cover, link: editingProject.link, tools, images }).eq("id", editingProject.id).select();
    if (!error && data) { setProjectsList((p) => p.map((pr) => (pr.id === data[0].id ? data[0] : pr))); setEditingProject(null); }
  };

  const createResource = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("resources").insert([newResource]).select();
    if (!error && data) { setResourcesList((p) => [data[0], ...p]); setShowResourceForm(false); setNewResource({ name: "", category: "Outils Dev", description: "", link: "", badge: "Outil" });}
  };

  const createArticle = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("articles").insert([newArticle]).select();
    if (!error && data) { setArticlesList((p) => [data[0], ...p]); setShowArticleForm(false); setNewArticle({ title: "", slug: "", category: "Développement", excerpt: "", content: "", read_time: "5 min" });}
  };

  /* ========================================================
     VUES DE CHARGEMENT ET LOGIN
     ======================================================== */
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <span>Authentification sécurisée...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-logo">JN</div>
          <h1>Console d'Administration</h1>
          <p>Authentification requise.</p>
          {authError && <div className="admin-error">{authError}</div>}
          <form onSubmit={handleLogin}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <button type="submit" disabled={authLoading}>{authLoading ? "Vérification..." : "Se connecter"}</button>
          </form>
          <Link to="/" className="admin-back-link">← Retour au site public</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* ====================================================
          SIDEBAR DESKTOP
          ==================================================== */}
      <aside className="admin-sidebar hidden md:flex">
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-brand">
            <div className="admin-logo">JN</div>
            <div>
              <strong>José World</strong>
              <span className="admin-status">● En ligne</span>
            </div>
          </div>
          <nav className="admin-nav">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === "messages" && unreadCount > 0 && <span className="admin-badge">{unreadCount}</span>}
                {tab.id === "trash" && totalTrashCount > 0 && <span className="admin-badge" style={{background: '#ef4444'}}>{totalTrashCount}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="admin-sidebar-bottom">
          <Link to="/" target="_blank" className="admin-nav-btn">🌐 Voir le site public</Link>
          <button onClick={handleLogout} className="admin-nav-btn admin-logout">🚪 Déconnexion</button>
        </div>
      </aside>

      {/* ====================================================
          CONTENU PRINCIPAL
          ==================================================== */}
      <main className="admin-main">
        {/* HEADER MOBILE NATIVE */}
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-[#272a30] pb-4 mb-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb] text-white font-extrabold text-xs">JN</div>
              <span className="text-[15px] font-semibold text-white">Admin Console</span>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="text-[11px] font-medium px-3 py-1.5 rounded bg-[#14161a] border border-[#272a30] text-white">Site</Link>
              <button onClick={handleLogout} className="text-[11px] font-medium px-3 py-1.5 rounded bg-red-500/10 text-red-500">Sortir</button>
            </div>
          </div>

          <div className="admin-select-wrapper">
            <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)} className="admin-mobile-select">
              {TABS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label} {tab.id === "messages" && unreadCount > 0 ? `(${unreadCount} non lu)` : ""}
                  {tab.id === "trash" && totalTrashCount > 0 ? `(${totalTrashCount})` : ""}
                </option>
              ))}
            </select>
            <span className="admin-select-icon">▼</span>
          </div>
        </div>

        {/* TOPBAR DESKTOP */}
        <header className="admin-topbar hidden md:flex">
          <h1 className="admin-page-title">{TABS.find((t) => t.id === activeTab)?.label}</h1>
          <div className="admin-topbar-actions">
            <button onClick={fetchAllData} className="admin-refresh-btn">↻ Actualiser</button>
            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="admin-vercel-btn">📈 Analytics</a>
          </div>
        </header>

        {/* VUE 1 : OVERVIEW */}
        {activeTab === "overview" && (
          <div className="admin-content">
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span className="admin-stat-label">Messages reçus</span>
                <strong className="admin-stat-value">{activeMessages.length}</strong>
                <span className="admin-stat-sub">{unreadCount} non lus</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Projets actifs</span>
                <strong className="admin-stat-value accent">{activeProjects.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Ressources</span>
                <strong className="admin-stat-value">{activeResources.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-label">Articles Blog</span>
                <strong className="admin-stat-value">{activeArticles.length}</strong>
              </div>
            </div>

            <div className="admin-section">
              <h2>Derniers messages</h2>
              {activeMessages.length === 0 ? <p className="admin-empty">Aucun message pour le moment.</p> : (
                <div className="admin-list">
                  {activeMessages.slice(0, 5).map((m) => (
                    <div key={m.id} className={`admin-list-item ${!m.is_read ? "unread" : ""}`}>
                      <div>
                        <strong>{m.nom} {m.prenoms}</strong>
                        <p>{m.message?.substring(0, 80)}...</p>
                      </div>
                      <span className="admin-tag">{m.type_projet}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VUE 2 : MESSAGES */}
        {activeTab === "messages" && (
          <div className="admin-content">
            {activeMessages.length === 0 ? <p className="admin-empty">Aucun message reçu.</p> : activeMessages.map((m) => (
              <div key={m.id} className={`admin-message-card ${!m.is_read ? "unread" : ""}`}>
                <div className="admin-message-header">
                  <div>
                    <strong>{m.nom} {m.prenoms}</strong>
                    <span>{m.email} · {m.tel || "—"} · {m.ville || "—"}</span>
                  </div>
                  <span className="admin-tag">{m.type_projet}</span>
                </div>
                <div className="admin-message-body">{m.message}</div>
                <div className="admin-message-footer">
                  <span>{new Date(m.created_at).toLocaleString("fr-FR")}</span>
                  <div className="admin-message-actions">
                    <button onClick={() => toggleRead(m.id, m.is_read)}>{m.is_read ? "Marquer non lu" : "Marquer lu"}</button>
                    <a href={`mailto:${m.email}?subject=Re: Votre demande`}>Répondre →</a>
                    <button className="danger" onClick={() => handleTrashToggle("messages", m.id, true)}>Mettre à la corbeille</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VUE 3 : PROJECTS */}
        {activeTab === "projects" && (
          <div className="admin-content">
            <button onClick={() => setShowProjectForm(!showProjectForm)} className="admin-btn-primary">+ Nouveau projet</button>
            {showProjectForm && (
              <form onSubmit={createProject} className="admin-form">
                <h3>Ajouter un projet</h3>
                <div style={{display:'flex', gap:'12px'}}>
                  <input required placeholder="Nom" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} style={{flex:1}} />
                  <input required placeholder="Catégorie" value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} style={{flex:1}} />
                </div>
                <input required placeholder="Image couverture (/projects/...)" value={newProject.cover} onChange={(e) => setNewProject({ ...newProject, cover: e.target.value })} />
                <input placeholder="Lien en ligne" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
                <input placeholder="Outils (séparés par virgule)" value={newProject.tools} onChange={(e) => setNewProject({ ...newProject, tools: e.target.value })} />
                <input placeholder="Images secondaires (séparées par virgule)" value={newProject.images} onChange={(e) => setNewProject({ ...newProject, images: e.target.value })} />
                <textarea required rows={3} placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                <button type="submit" className="admin-btn-primary">Enregistrer</button>
              </form>
            )}
            {editingProject && (
              <form onSubmit={updateProject} className="admin-form">
                <h3>Modifier : {editingProject.name}</h3>
                <input required value={editingProject.name} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} />
                <input required value={editingProject.category} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} />
                <input required value={editingProject.cover} onChange={(e) => setEditingProject({ ...editingProject, cover: e.target.value })} />
                <input value={editingProject.link} onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })} />
                <input value={editingProject.tools_input} onChange={(e) => setEditingProject({ ...editingProject, tools_input: e.target.value })} />
                <input value={editingProject.images_input} onChange={(e) => setEditingProject({ ...editingProject, images_input: e.target.value })} />
                <textarea required rows={3} value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn-primary">Sauvegarder</button>
                  <button type="button" onClick={() => setEditingProject(null)} className="admin-btn-secondary">Annuler</button>
                </div>
              </form>
            )}
            <div className="admin-grid">
              {activeProjects.map((p) => (
                <div key={p.id} className="admin-card">
                  <div className="admin-card-info">
                    <strong>{p.name}</strong>
                    <span>{p.category}</span>
                  </div>
                  <div className="admin-card-actions">
                    <button onClick={() => setEditingProject({ ...p, tools_input: (p.tools || []).join(", "), images_input: (p.images || []).join(", ") })}>✏️</button>
                    <button className="danger" onClick={() => handleTrashToggle("projects", p.id, true)}>Corbeille</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VUE 4 : RESOURCES */}
        {activeTab === "resources" && (
          <div className="admin-content">
            <button onClick={() => setShowResourceForm(!showResourceForm)} className="admin-btn-primary">+ Nouvelle ressource</button>
            {showResourceForm && (
              <form onSubmit={createResource} className="admin-form">
                <h3>Ajouter une ressource</h3>
                <input required placeholder="Nom" value={newResource.name} onChange={(e) => setNewResource({ ...newResource, name: e.target.value })} />
                <input required placeholder="Catégorie" value={newResource.category} onChange={(e) => setNewResource({ ...newResource, category: e.target.value })} />
                <input required placeholder="URL" value={newResource.link} onChange={(e) => setNewResource({ ...newResource, link: e.target.value })} />
                <input placeholder="Badge" value={newResource.badge} onChange={(e) => setNewResource({ ...newResource, badge: e.target.value })} />
                <textarea required rows={2} placeholder="Description" value={newResource.description} onChange={(e) => setNewResource({ ...newResource, description: e.target.value })} />
                <button type="submit" className="admin-btn-primary">Ajouter</button>
              </form>
            )}
            <div className="admin-grid">
              {activeResources.map((r) => (
                <div key={r.id} className="admin-card">
                  <div className="admin-card-info">
                    <strong>{r.name}</strong>
                    <span>{r.category}</span>
                  </div>
                  <button className="danger" onClick={() => handleTrashToggle("resources", r.id, true)}>Corbeille</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VUE 5 : ARTICLES */}
        {activeTab === "articles" && (
          <div className="admin-content">
            <button onClick={() => setShowArticleForm(!showArticleForm)} className="admin-btn-primary">+ Nouvel article</button>
            {showArticleForm && (
              <form onSubmit={createArticle} className="admin-form">
                <h3>Rédiger un article</h3>
                <input required placeholder="Titre" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} />
                <input required placeholder="Slug URL" value={newArticle.slug} onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
                <input required placeholder="Catégorie" value={newArticle.category} onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })} />
                <input placeholder="Temps de lecture" value={newArticle.read_time} onChange={(e) => setNewArticle({ ...newArticle, read_time: e.target.value })} />
                <textarea required rows={2} placeholder="Excerpt" value={newArticle.excerpt} onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })} />
                <textarea required rows={8} placeholder="Contenu HTML..." value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} className="admin-code-input" />
                <button type="submit" className="admin-btn-primary">Publier</button>
              </form>
            )}
            <div className="admin-list">
              {activeArticles.map((a) => (
                <div key={a.id} className="admin-list-item">
                  <div>
                    <strong>{a.title}</strong>
                    <span>/blog/{a.slug}</span>
                  </div>
                  <button className="danger" onClick={() => handleTrashToggle("articles", a.id, true)}>Corbeille</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VUE 6 : CORBEILLE (TRASH) */}
        {activeTab === "trash" && (
          <div className="admin-content">
            <div className="admin-section">
              <h2>Éléments dans la corbeille ({totalTrashCount})</h2>
              <p className="admin-empty mb-6">Les éléments ici ne sont plus visibles sur le site public. Vous pouvez les restaurer ou les supprimer définitivement.</p>

              {/* Messages Supprimés */}
              {trashMessages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-3 border-b border-[#272a30] pb-2">Messages</h3>
                  <div className="admin-list">
                    {trashMessages.map((m) => (
                      <div key={m.id} className="admin-list-item">
                        <div><strong>{m.nom} {m.prenoms}</strong><p className="line-clamp-1">{m.message}</p></div>
                        <div className="admin-card-actions">
                          <button onClick={() => handleTrashToggle("messages", m.id, false)}>♻️ Restaurer</button>
                          <button className="danger" onClick={() => handleHardDelete("messages", m.id)}>Supprimer définitivement</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projets Supprimés */}
              {trashProjects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-3 border-b border-[#272a30] pb-2">Projets</h3>
                  <div className="admin-list">
                    {trashProjects.map((p) => (
                      <div key={p.id} className="admin-list-item">
                        <div><strong>{p.name}</strong><span>{p.category}</span></div>
                        <div className="admin-card-actions">
                          <button onClick={() => handleTrashToggle("projects", p.id, false)}>♻️ Restaurer</button>
                          <button className="danger" onClick={() => handleHardDelete("projects", p.id)}>Supprimer définitivement</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ressources Supprimées */}
              {trashResources.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-3 border-b border-[#272a30] pb-2">Ressources</h3>
                  <div className="admin-list">
                    {trashResources.map((r) => (
                      <div key={r.id} className="admin-list-item">
                        <div><strong>{r.name}</strong><span>{r.category}</span></div>
                        <div className="admin-card-actions">
                          <button onClick={() => handleTrashToggle("resources", r.id, false)}>♻️ Restaurer</button>
                          <button className="danger" onClick={() => handleHardDelete("resources", r.id)}>Supprimer définitivement</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Supprimés */}
              {trashArticles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-3 border-b border-[#272a30] pb-2">Articles</h3>
                  <div className="admin-list">
                    {trashArticles.map((a) => (
                      <div key={a.id} className="admin-list-item">
                        <div><strong>{a.title}</strong><span>/blog/{a.slug}</span></div>
                        <div className="admin-card-actions">
                          <button onClick={() => handleTrashToggle("articles", a.id, false)}>♻️ Restaurer</button>
                          <button className="danger" onClick={() => handleHardDelete("articles", a.id)}>Supprimer définitivement</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {totalTrashCount === 0 && (
                <p className="admin-empty text-center py-10 border border-dashed border-[#272a30] rounded-xl">La corbeille est vide.</p>
              )}
            </div>
          </div>
        )}

        {/* VUE 7 : SETTINGS */}
        {activeTab === "settings" && (
          <div className="admin-content">
            <div className="admin-section">
              <h2>Configuration</h2>
              <div className="admin-settings-grid">
                <div className="admin-card admin-card-info"><strong>🔗 Domaine</strong><span>josenahounme.vercel.app</span></div>
                <div className="admin-card admin-card-info"><strong>📧 Email de réception</strong><span>josenahounme@gmail.com</span></div>
                <div className="admin-card admin-card-info"><strong>📱 WhatsApp</strong><span>+229 01 51 37 09 49</span></div>
                <div className="admin-card admin-card-info"><strong>🗄️ Base de données</strong><span>Supabase PostgreSQL</span></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}