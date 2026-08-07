import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Instagram, Menu, X, ChevronRight, Star, Search,
  Wand2, Heart, Wind, Cookie, Flame, Snowflake, Truck, Gift, ShieldCheck
} from "lucide-react";

const IG_URL = "https://instagram.com/elanfragrances";
const TO_URL = "https://t.me/elanfragrances";

const ElanSite = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [familyF, setFamilyF] = useState(null);
  const [genderF, setGenderF] = useState("Alle");
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Colors
  const C = {
    bg: "#F5F2ED",
    text: "#1A1A1A",
    ink: "#2D2D2D",
    gold: "#B8956A",
    goldHi: "#D4AF37",
    muted: "#888888",
    line: "#D4C4B8",
    surface: "#FFFFFF"
  };

  // Testimonials
  const TESTIMONIALS = [
    { name: "Sarah M.", text: "Die Qualität ist unglaublich! Besser als die Originale.", rating: 5 },
    { name: "Marcus K.", text: "ÉLAN hält den ganzen Tag. Absolut empfehlenswert!", rating: 5 },
    { name: "Julia L.", text: "Versand super schnell. Sehr professionell verpackt!", rating: 5 },
    { name: "Thomas R.", text: "Premium Qualität zum fairen Preis. Kaufe nur noch hier!", rating: 5 }
  ];

  // Categories
  const CATEGORIES = [
    { label: "Herbst Düfte",     image: "/images/duftwelt-herbst.jpg", type: "occasion", value: "Herbst" },
    { label: "Winter Düfte",     image: "/images/duftwelt-winter.jpg", type: "occasion", value: "Winter" },
    { label: "Süße Düfte",       image: "/images/duftwelt-suesse.jpg", type: "family",   value: "Honig & Gourmand" },
    { label: "Frische Düfte",    image: "/images/duftwelt-frische.jpg", type: "family",   value: "Frisch & Zitrus" },
    { label: "Oud & Leder",      image: "/images/duftwelt-oud-leder.jpg", type: "family",   value: "Leder" },
    { label: "Date Night Düfte", image: "/images/duftwelt-dateinacht.jpg", type: "occasion", value: "Date Night" }
  ];

  // Sample Perfumes
  const PERFUMES = [
    { id: 1, name: "M300 Pacific Ocean", family: "Frisch & Zitrus", gender: "Herren", occasion: "Sommer", price: 25, size: "30ML", bestseller: true },
    { id: 2, name: "M137 Omdedad", family: "Leder", gender: "Herren", occasion: "Winter", price: 35, size: "50ML", bestseller: false },
    { id: 3, name: "M160 PurbaX", family: "Honig & Gourmand", gender: "Damen", occasion: "Herbst", price: 45, size: "100ML", bestseller: true },
    { id: 4, name: "M252 The Effect from the Side", family: "Frisch & Zitrus", gender: "Unisex", occasion: "Sommer", price: 35, size: "50ML", bestseller: false },
    { id: 5, name: "W501 Elegant Rose", family: "Blumig", gender: "Damen", occasion: "Date Night", price: 25, size: "30ML", bestseller: true },
    { id: 6, name: "W605 Sweet Vanilla", family: "Honig & Gourmand", gender: "Damen", occasion: "Herbst", price: 35, size: "50ML", bestseller: false }
  ];

  // Scroll to
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openExternal = (url) => {
    window.open(url, "_blank");
  };

  const filteredPerfumes = PERFUMES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFamily = !familyF || p.family === familyF;
    const matchesGender = genderF === "Alle" || p.gender === genderF;
    return matchesSearch && matchesFamily && matchesGender;
  });

  const count = 0;
  const navItems = [["Kollektion", "shop"], ["Über uns", "about"], ["FAQ", "faq"]];

  // Hero Scroll Auto
  useEffect(() => {
    const timer = setTimeout(() => {
      const videos = document.querySelectorAll("video");
      videos.forEach(video => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text }}>
      {/* TOP BANNER */}
      <div style={{ background: "#5C4033", color: "white", textAlign: "center", padding: "10px", fontSize: "12px", letterSpacing: "0.1em" }}>
        ✦ VERSAND IN 2-4 WERKTAGEN ✦ AB 3 FLASCHEN GRATIS VERSAND ✦ 10% RABATT ✦
      </div>

      {/* 30% NEUKUNDEN RABATT BANNER */}
      <div style={{ position: "relative", textAlign: "center", padding: "30px 20px", marginBottom: "20px" }}>
        <style>{`
          @keyframes floatBanner {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes blinkBanner {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .rabatt-banner {
            animation: floatBanner 3s ease-in-out infinite, blinkBanner 2.5s ease-in-out infinite;
            border: 3px solid;
            border-radius: 25px;
            padding: 30px 50px;
            max-width: 600px;
            margin: 0 auto;
            display: inline-block;
          }
        `}</style>

        <div
          className="rabatt-banner"
          style={{
            background: C.gold,
            color: C.bg,
            borderColor: C.ink
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            🎁 Neukunden
          </p>
          <h3 style={{ margin: "12px 0 8px 0, fontSize: "36px", fontWeight: "300", letterSpacing: "0.05em" }}>
            30% Rabatt
          </h3>
          <p style={{ margin: 0, fontSize: "18px", fontWeight: "300", letterSpacing: "0.05em" }}>
            auf deine erste Bestellung
          </p>
        </div>
      </div>

      {/* HEADER */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: `${C.bg}EE`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}
      >
        <button onClick={() => scrollTo("top")} className="font-display text-2xl btn-ghost" style={{ letterSpacing: "0.35em", background: "none", border: "none", color: C.text }}>ÉLAN</button>
        
        {/* SUCHLEISTE */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <input
            className="el-input w-full px-4 py-2"
            placeholder="Duft suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: `1px solid ${C.line}`, borderRadius: "8px", background: C.surface }}
          />
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm tracked uppercase" style={{ color: C.muted }}>
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="btn-ghost" style={{ color: C.text, background: "none", border: "none" }}>{label}</button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={() => openExternal(IG_URL)} aria-label="Instagram" className="btn-ghost" style={{ color: C.muted, background: "none", border: "none" }}><Instagram size={19} /></button>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-3 py-2 btn-ghost" style={{ border: `1px solid ${C.line}`, background: "none" }} aria-label="Warenkorb öffnen">
            <ShoppingBag size={17} />
            {count > 0 && <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full" style={{ background: C.ink, color: C.goldHi }}>{count}</span>}
          </button>
          <button className="md:hidden btn-ghost" onClick={() => setMobileNav(true)} aria-label="Menü" style={{ background: "none", border: "none" }}><Menu size={20} /></button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 md:px-12 pt-16 pb-12 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* DESKTOP: 3 Spalten (Links Bild | Mitte Video | Rechts Bild) */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
            {/* LINKS: Bild */}
            <img
              src="/images/hero-1.jpg"
              alt="ÉLAN 1"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
            
            {/* MITTE: Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-lg object-cover"
              style={{ height: 580, background: "#000" }}
              onCanPlayThrough={(e) => e.currentTarget.play().catch(() => {})}
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
            
            {/* RECHTS: Bild */}
            <img
              src="/images/hero-2.jpg"
              alt="ÉLAN 2"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
          </div>

          {/* MOBILE: Nur Bilder */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
            <img
              src="/images/hero-1.jpg"
              alt="ÉLAN 1"
              className="w-full rounded-lg object-cover"
              style={{ height: 280 }}
            />
            <img
              src="/images/hero-2.jpg"
              alt="ÉLAN 2"
              className="w-full rounded-lg object-cover"
              style={{ height: 280 }}
            />
          </div>

          {/* TEXT */}
          <div className="text-center">
            <div className="mb-4 text-xs tracked uppercase" style={{ color: C.gold }}>Premium Duftzwillinge</div>
            
            <h1 className="font-display text-4xl md:text-6xl mb-4 md:mb-6" style={{ lineHeight: 1.05, color: C.ink }}>
              Ikonische Düfte.<br />Neu interpretiert.
            </h1>
            
            <p className="text-xs md:text-sm mb-6 md:mb-9 max-w-2xl mx-auto" style={{ color: C.muted }}>
              Extrait de Parfum mit 30% Ölanteil. Komponiert aus erlesenen Rohstoffen aus Frankreich &amp; England.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => scrollTo("shop")} className="btn-gold px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2" style={{ background: C.gold, color: C.bg, border: "none", borderRadius: "4px" }}>
                Kollektion entdecken <ChevronRight size={15} />
              </button>
              <button onClick={() => { setQuizOpen(true); setQuizResult(null); }} className="px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2 btn-ghost" style={{ border: `1px solid ${C.gold}`, color: C.ink, background: "none" }}>
                <Wand2 size={15} /> Duft-Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KUNDENFEEDBACK */}
      <section id="stimmen" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Kundenfeedback</div>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Das sagen unsere Kunden</h2>
        
        {/* CAROUSEL - AUTO SCROLL */}
        <div className="overflow-hidden pb-6">
          <style>{`
            @keyframes autoScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .carousel-track {
              animation: autoScroll 30s linear infinite;
            }
            .carousel-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="carousel-track flex gap-8 md:gap-12 min-w-max px-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 md:w-96 text-center">
                {/* KUNDENBILDER */}
                <img
                  src={`/images/customer-${i + 1}.jpg`}
                  alt={t.name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover border-4"
                  style={{ borderColor: C.gold }}
                />

                {/* STARS */}
                <div className="flex justify-center mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={20} fill={C.gold} stroke={C.gold} strokeWidth={1} />
                  ))}
                </div>

                {/* TEXT */}
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.muted }}>
                  "{t.text}"
                </p>

                {/* NAME */}
                <p className="font-medium text-base md:text-lg" style={{ color: C.ink }}>
                  {t.name}
                </p>
              </div>
            ))}
            {/* DUPLIZIEREN FÜR LOOP */}
            {TESTIMONIALS.map((t, i) => (
              <div key={`duplicate-${i}`} className="flex-shrink-0 w-80 md:w-96 text-center">
                <img
                  src={`/images/customer-${i + 1}.jpg`}
                  alt={t.name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover border-4"
                  style={{ borderColor: C.gold }}
                />
                <div className="flex justify-center mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={20} fill={C.gold} stroke={C.gold} strokeWidth={1} />
                  ))}
                </div>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.muted }}>
                  "{t.text}"
                </p>
                <p className="font-medium text-base md:text-lg" style={{ color: C.ink }}>
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUFTWELTEN */}
      <section className="px-6 md:px-12 pb-16 max-w-4xl mx-auto">
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Entdecke</div>
        <h2 className="font-display text-4xl text-center mb-12">Duftwelten</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFamilyF(cat.value);
                setGenderF("Alle");
                scrollTo("shop");
              }}
              className="category-tile relative aspect-square overflow-hidden flex items-end p-4 sm:p-6 text-left group rounded-lg"
              style={{ background: "#241809" }}
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              
              <span className="font-display text-xl sm:text-2xl text-white relative z-10" style={{ lineHeight: 1.1 }}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="px-6 md:px-12 py-16 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-xs tracked uppercase mb-6 text-center" style={{ color: C.gold }}>Kollektion</div>
        <h2 className="font-display text-4xl text-center mb-12">Bestseller</h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button onClick={() => setGenderF("Alle")} className="px-4 py-2 text-sm" style={{ border: genderF === "Alle" ? `2px solid ${C.gold}` : `1px solid ${C.line}`, background: genderF === "Alle" ? C.gold : "transparent", color: genderF === "Alle" ? C.bg : C.text }}>Alle</button>
          <button onClick={() => setGenderF("Herren")} className="px-4 py-2 text-sm" style={{ border: genderF === "Herren" ? `2px solid ${C.gold}` : `1px solid ${C.line}`, background: genderF === "Herren" ? C.gold : "transparent", color: genderF === "Herren" ? C.bg : C.text }}>Herren</button>
          <button onClick={() => setGenderF("Damen")} className="px-4 py-2 text-sm" style={{ border: genderF === "Damen" ? `2px solid ${C.gold}` : `1px solid ${C.line}`, background: genderF === "Damen" ? C.gold : "transparent", color: genderF === "Damen" ? C.bg : C.text }}>Damen</button>
          <button onClick={() => setGenderF("Unisex")} className="px-4 py-2 text-sm" style={{ border: genderF === "Unisex" ? `2px solid ${C.gold}` : `1px solid ${C.line}`, background: genderF === "Unisex" ? C.gold : "transparent", color: genderF === "Unisex" ? C.bg : C.text }}>Unisex</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPerfumes.map((p) => (
            <div key={p.id} className="text-center">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" style={{ background: C.surface, border: `1px solid ${C.line}` }} />
              <p className="text-sm" style={{ color: C.gold }}>{p.family}</p>
              <h3 className="font-display text-lg">{p.name}</h3>
              <p className="text-sm" style={{ color: C.muted }}>{p.size}</p>
              <p className="font-bold mt-2">€{p.price}</p>
            </div>
          ))}
        </div>

        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12" style={{ color: C.muted }}>
            <p>Keine Düfte gefunden</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${C.line}`, background: C.surface }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4">ÉLAN</h4>
            <p style={{ color: C.muted }}>Premium Duftzwillinge aus Frankreich & England</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <button onClick={() => scrollTo("shop")} style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}>Kollektion</button>
          </div>
          <div>
            <h4 className="font-bold mb-4">Kontakt</h4>
            <button onClick={() => openExternal(IG_URL)} style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}>Instagram</button>
          </div>
          <div>
            <h4 className="font-bold mb-4">Info</h4>
            <p style={{ color: C.muted }}>© 2026 ÉLAN Fragrances</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElanSite;
