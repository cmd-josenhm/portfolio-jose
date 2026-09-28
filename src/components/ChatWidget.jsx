import { useState, useRef, useEffect } from "react";
import supabase from "../lib/supabase";
import emailjs from '@emailjs/browser';

const RESPONSES = {
  greeting: "Salut ! C'est José. Je suis en ligne. Comment puis-je t'aider aujourd'hui ?",
  askEmail: "Super ! Laisse-moi ton adresse email pour que je puisse t'envoyer mon devis ou te répondre.",
  askProject: "Parfait. Sur quel type de projet veux-tu qu'on collabore ?",
  projectOptions: ["Site Web & Application", "Design & Logo", "Autre demande"],
  askDetails: "D'accord, j'analyse ça. Explique-moi rapidement ton idée, tes délais ou ton budget.",
  closing: "C'est bien noté ! J'analyse ton projet tout de suite et je te contacte par mail d'ici quelques minutes. Tu peux aussi venir m'en parler sur WhatsApp via le bouton ci-dessous !",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // LocalStorage pour la persistance
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('jose_chat_msgs')) || []);
  const [step, setStep] = useState(() => Number(localStorage.getItem('jose_chat_step')) || 0);
  const [visitorData, setVisitorData] = useState(() => JSON.parse(localStorage.getItem('jose_chat_data')) || { nom: "", email: "", typeProjet: "", message: "" });
  
  const messagesEndRef = useRef(null);

  // Sauvegarde auto
  useEffect(() => {
    localStorage.setItem('jose_chat_msgs', JSON.stringify(messages));
    localStorage.setItem('jose_chat_step', step.toString());
    localStorage.setItem('jose_chat_data', JSON.stringify(visitorData));
  }, [messages, step, visitorData]);

  // Popup "Je suis en ligne" après 30s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  // Écoute clic navbar mobile
  useEffect(() => {
    const handleToggleChat = () => {
      setShowPopup(false);
      if (!isOpen && messages.length === 0) {
        setIsOpen(true);
        addMessage(RESPONSES.greeting, 800);
      } else {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("toggle-chat", handleToggleChat);
    return () => window.removeEventListener("toggle-chat", handleToggleChat);
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (text, delay = 1200, isWhatsappBtn = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "ai", text, isWhatsappBtn }]);
    }, delay);
  };

  const handleOpen = () => {
    setShowPopup(false);
    if (!isOpen && messages.length === 0) {
      setIsOpen(true);
      addMessage(RESPONSES.greeting, 800);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputValue("");

    if (step === 0) {
      setVisitorData((prev) => ({ ...prev, nom: text }));
      setStep(1);
      setTimeout(() => addMessage(RESPONSES.askEmail), 600);
    } else if (step === 1) {
      setVisitorData((prev) => ({ ...prev, email: text }));
      setStep(2);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "ai", text: RESPONSES.askProject }, { role: "ai", text: RESPONSES.projectOptions.join(" · "), isOptions: true }]);
        }, 1000);
      }, 600);
    } else if (step === 2) {
      setVisitorData((prev) => ({ ...prev, typeProjet: text }));
      setStep(3);
      setTimeout(() => addMessage(RESPONSES.askDetails), 600);
    } else if (step === 3) {
      const finalData = { ...visitorData, message: text };
      setVisitorData(finalData);
      setStep(4);
      setTimeout(() => {
        addMessage(RESPONSES.closing, 800, true);
        saveAndSend(finalData);
      }, 600);
    }
  };

  const saveAndSend = async (data) => {
    try {
      await supabase.from("messages").insert([{ nom: data.nom, prenoms: "Via Chat IA", email: data.email, type_projet: data.typeProjet, message: data.message }]);
      
      const templateParams = {
        from_name: data.nom,
        from_email: data.email,
        project_type: data.typeProjet,
        message: data.message,
      };
      await emailjs.send("service_2j9oyiq", "template_6114jod", templateParams, "24rzy-9wloVu4L7LF");
    } catch (err) {
      console.error("Erreur Chat:", err);
    }
  };

  const getWaLink = () => {
    const text = encodeURIComponent(`Bonjour José, je viens de discuter avec toi sur ton site.\n\n*Nom* : ${visitorData.nom}\n*Projet* : ${visitorData.typeProjet}\n*Détails* : ${visitorData.message}`);
    return `https://wa.me/2290151370949?text=${text}`;
  };

  return (
    <div className="chat-widget" style={{ cursor: 'auto' }}>
      
      {/* POPUP 30s */}
      {showPopup && !isOpen && (
        <div onClick={handleOpen} className="absolute bottom-20 right-0 w-72 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent)] shadow-2xl flex gap-3 cursor-pointer animate-fade-in hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-lg">JN</div>
          <div>
            <p className="text-xs text-white font-bold mb-1">José Nahounmè</p>
            <p className="text-[11px] leading-snug text-[var(--text-secondary)]">Je suis en ligne ! 👋 Cliquez ici si vous voulez me parler de votre projet.</p>
          </div>
        </div>
      )}

      {/* BOUTON FLOTTANT UNIQUEMENT SUR PC (Caché sur mobile grâce à "hidden md:flex") */}
      <button onClick={handleOpen} className="chat-toggle-btn hidden md:flex" aria-label="Discuter avec José">
        {isOpen ? (
          <svg className="chat-toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="chat-toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
        {!isOpen && <span className="chat-pulse" />}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">JN</div>
              <div>
                <span className="chat-header-name">José Nahounmè</span>
                <span className="chat-header-status"><span className="chat-status-dot" /> En ligne</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chat-close-btn">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                {msg.isOptions ? (
                  <div className="chat-options">
                    {RESPONSES.projectOptions.map((opt) => (
                      <button key={opt} onClick={() => {
                        setMessages((prev) => [...prev, { role: "user", text: opt }]);
                        setVisitorData((prev) => ({ ...prev, typeProjet: opt }));
                        setStep(3);
                        setTimeout(() => addMessage(RESPONSES.askDetails), 600);
                      }} className="chat-option-btn">{opt}</button>
                    ))}
                  </div>
                ) : (
                  <div className="chat-bubble flex flex-col gap-3">
                    {msg.text}
                    {msg.isWhatsappBtn && (
                      <a href={getWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-[#25D366] text-white font-bold text-[11px] px-4 py-2 rounded-full hover:scale-105 transition-transform shadow-lg">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Ouvrir WhatsApp
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg chat-msg-ai">
                <div className="chat-bubble chat-typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {step < 4 && (
            <div className="chat-input-area">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSend() }} placeholder="Écrivez votre message..." className="chat-input" />
              <button onClick={handleSend} className="chat-send-btn" disabled={!inputValue.trim()}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}