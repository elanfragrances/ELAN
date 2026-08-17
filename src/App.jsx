import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  ShoppingBag, X, Plus, Minus, Instagram, Send, Sparkles, Check, ChevronRight,
  Crown, Menu, Truck, Gift, ShieldCheck, Quote, Wand2, ArrowRight, ArrowLeft, Percent,
  Snowflake, Sun, Cookie, Wind, Flame, Heart, Star
} from "lucide-react";

/* ---------------------------------------------------------
   ÉLAN — warm beige luxury tokens
--------------------------------------------------------- */
const C = {
  bg: "#F6EFE2",
  surface: "#FBF6EC",
  line: "#E2D5B8",
  ink: "#241809",
  inkHi: "#3A2712",
  text: "#3B2A1C",
  muted: "#8C7A61",
  gold: "#9C7A3C",
  goldHi: "#B99048",
  wood: "#4A3221",
};

const FAMILIES = ["Würzig", "Honig & Gourmand", "Holzig", "Blumig", "Frisch & Zitrus", "Orientalisch", "Leder"];
const OCCASIONS = ["Sommer", "Winter", "Allrounder", "Date Night", "Büro & Alltag"];
const GENDERS = ["Damen", "Herren", "Unisex"];
const SIZES = [30, 50, 100];
const PRICE = { 30: 25, 50: 35, 100: 45 };

const PRODUCTS = [{"id":1,"code":"No. 001","insp":"riecht wie: Granatapfel","note":"fruchtigfrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":2,"code":"No. 002","insp":"riecht wie: of Dubai","note":"holzig-würzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":3,"code":"No. 003","insp":"riecht wie: Colonia Oud","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":4,"code":"No. 004","insp":"riecht wie: Blu Mediterraneo Fico di Amalfi","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":5,"code":"No. 005","insp":"riecht wie: Blu Mediterraneo - Mandorlo di Sicilia","note":"süß-gourmandig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":6,"code":"No. 006","insp":"riecht wie: Reflection Man","note":"süß-blumig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":7,"code":"No. 007","insp":"riecht wie: Ishq","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":8,"code":"No. 008","insp":"riecht wie: Salam","note":"süßblumig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":9,"code":"No. 009","insp":"riecht wie: Acqua di Giò","note":"frisch-aquatisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":10,"code":"No. 010","insp":"riecht wie: Acqua di Giò Profumo","note":"frisch-aquatisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":11,"code":"No. 011","insp":"riecht wie: Armani Code","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":12,"code":"No. 012","insp":"riecht wie: Stronger With You","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":13,"code":"No. 013","insp":"riecht wie: Stronger With You Intensely","note":"süß-gourmandig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":14,"code":"No. 014","insp":"riecht wie: Stronger With You Tobacco","note":"würzig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":15,"code":"No. 015","insp":"riecht wie: Oud Save The King","note":"süß-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":16,"code":"No. 016","insp":"riecht wie: Tulipe Noire","note":"blumig-würzig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":17,"code":"No. 017","insp":"riecht wie: Gris Charnel","note":"würzig-cremig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false},{"id":18,"code":"No. 018","insp":"riecht wie: Pas Ce Soir","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":19,"code":"No. 019","insp":"riecht wie: Pas Ce Soir Extrait","note":"fruchtig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":20,"code":"No. 020","insp":"riecht wie: Dirty Heaven","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":21,"code":"No. 021","insp":"riecht wie: Man In Black","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":22,"code":"No. 022","insp":"riecht wie: Bal d'Afrique","note":"blumigfruchtig","gender":"Unisex","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":23,"code":"No. 023","insp":"riecht wie: Chronic Rouge Extreme","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":24,"code":"No. 024","insp":"riecht wie: Mula Mula","note":"süß-fruchtig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":25,"code":"No. 025","insp":"riecht wie: Allure Homme","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":26,"code":"No. 026","insp":"riecht wie: Allure Homme Sport","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":27,"code":"No. 027","insp":"riecht wie: Bleu de Chanel","note":"frisch-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":28,"code":"No. 028","insp":"riecht wie: Égoïste","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":29,"code":"No. 029","insp":"riecht wie: Milk +","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":30,"code":"No. 030","insp":"riecht wie: Blonde Amber","note":"süß-würzig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":31,"code":"No. 031","insp":"riecht wie: No. 1 for Men","note":"blumig-pudrig","gender":"Herren","family":"Blumig","occasion":"Büro & Alltag","bestseller":false},{"id":32,"code":"No. 032","insp":"riecht wie: Aventus","note":"frisch-fruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":33,"code":"No. 033","insp":"riecht wie: Aventus Zitrus","note":"zitrisch-fruchtig","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":34,"code":"No. 034","insp":"riecht wie: Aventus Absolu","note":"fruchtig-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":35,"code":"No. 035","insp":"riecht wie: Centaurus","note":"würzig-süß","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":36,"code":"No. 036","insp":"riecht wie: Delphinus","note":"süß-cremig","gender":"Unisex","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":37,"code":"No. 037","insp":"riecht wie: Silver Mountain Water","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":38,"code":"No. 038","insp":"riecht wie: Virgin Island Water","note":"frisch-zitrisch","gender":"Unisex","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":39,"code":"No. 039","insp":"riecht wie: Viking","note":"würzig-frisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":40,"code":"No. 040","insp":"riecht wie: Amber Nuit","note":"würzig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":41,"code":"No. 041","insp":"riecht wie: Bois d'Argent","note":"pudrig-holzig","gender":"Unisex","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":42,"code":"No. 042","insp":"riecht wie: Élixir Précieux - Ambre","note":"orientalisch-würzig","gender":"Unisex","family":"Orientalisch","occasion":"Winter","bestseller":false},{"id":43,"code":"No. 043","insp":"riecht wie: Fahrenheit","note":"würzig-ledrig","gender":"Herren","family":"Leder","occasion":"Winter","bestseller":false},{"id":44,"code":"No. 044","insp":"riecht wie: Homme","note":"holzig-frisch","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":false},{"id":45,"code":"No. 045","insp":"riecht wie: Homme Intense","note":"pudrig-süß","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":46,"code":"No. 046","insp":"riecht wie: Homme Sport","note":"frisch-zitrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":false},{"id":47,"code":"No. 047","insp":"riecht wie: Sauvage","note":"würzigfrisch","gender":"Herren","family":"Frisch & Zitrus","occasion":"Sommer","bestseller":true},{"id":48,"code":"No. 048","insp":"riecht wie: Sauvage Elixir","note":"würzig-holzig","gender":"Herren","family":"Holzig","occasion":"Allrounder","bestseller":true},{"id":49,"code":"No. 049","insp":"riecht wie: The One for Men","note":"süß-würzig","gender":"Herren","family":"Honig & Gourmand","occasion":"Date Night","bestseller":false},{"id":50,"code":"No. 050","insp":"riecht wie: Bodylotion","note":"cremig-pudrig","gender":"Unisex","family":"Würzig","occasion":"Büro & Alltag","bestseller":false}];

const TESTIMONIALS = [
  { name: "Lea M.", text: "Hält den ganzen Tag, riecht wirklich hochwertig. Kam nach 3 Tagen an.", rating: 5 },
  { name: "Jonas K.", text: "Für den Preis unschlagbar nah am Original. Bestelle definitiv wieder.", rating: 5 },
  { name: "Sophie R.", text: "Bestellung lief unkompliziert über Instagram, super freundlicher Kontakt.", rating: 5 },
  { name: "Deniz A.", text: "No. 09 ist mein neuer Alltagsduft geworden. Sehr empfehlenswert.", rating: 5 },
];

const IG_URL = "https://instagram.com/elan.fragrances";
const HERO_IMAGES = ["/images/hero-1.jpg", "/images/hero-video.mp4", "/images/hero-2.jpg"];
const IG_DM_URL = "https://ig.me/m/elan.fragrances";

const CATEGORIES = [
  { label: "Winter Düfte",     type: "occasion", value: "Winter",           image: "/images/duftwelt-winter.jpg" },
  { label: "Sommer Düfte",     type: "occasion", value: "Sommer",            image: "/images/duftwelt-sommer.jpg" },
  { label: "Süße Düfte",       type: "family",   value: "Honig & Gourmand",  image: "/images/duftwelt-suesse.jpg" },
  { label: "Frische Düfte",    type: "family",   value: "Frisch & Zitrus",   image: "/images/duftwelt-frische.jpg" },
  { label: "Oud & Leder",      type: "family",   value: "Leder",             image: "/images/duftwelt-oud-leder.jpg" },
  { label: "Date Night Düfte", type: "occasion", value: "Date Night",        image: "/images/duftwelt-datenight.jpg" },
];

const TICKER_ITEMS = [
  "VERSAND IN 2–4 WERKTAGEN",
  "AB 3 FLASCHEN: 10% RABATT | AB 5 FLASCHEN: GRATIS VERSAND",
  "SICHER BEZAHLEN: PAYPAL ODER ÜBERWEISUNG",
  "EXTRAIT DE PARFUM · 30% ÖLANTEIL",
];

const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";

const openExternal = (url) => {
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  } catch {
    window.location.href = url;
  }
};

function Stars({ n = 5, size = 22 }) {
  return (
    <div className="flex gap-1" style={{ color: C.gold }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < n ? C.gold : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function Bottle({ size = 1, glow = false }) {
  const W = 130, H = 176;
  return (
    <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ overflow: "visible" }}>
      {glow && (
        <ellipse cx="65" cy="106" rx="52" ry="52" fill={C.gold} opacity="0.14">
          <animate attributeName="opacity" values="0.08;0.22;0.08" dur="4.5s" repeatCount="indefinite" />
        </ellipse>
      )}
      <ellipse cx="65" cy="14" rx="10" ry="6" fill="#5A3E27" />
      <rect x="45" y="16" width="40" height="24" rx="10" fill={C.wood} stroke="#241708" strokeWidth="1" />
      <rect x="45" y="16" width="40" height="7" rx="6" fill="#6B4A2E" />
      <rect x="57" y="38" width="16" height="10" fill="#D8C9A6" opacity="0.5" />
      <ellipse cx="65" cy="106" rx="50" ry="54" fill="url(#glassBeige)" stroke="#C9B37E" strokeWidth="1.2" />
      <clipPath id="clipRound"><ellipse cx="65" cy="106" rx="49" ry="53" /></clipPath>
      <rect x="16" y="128" width="98" height="60" fill={C.gold} opacity="0.55" clipPath="url(#clipRound)" />
      <rect x="15" y="100" width="100" height="10" fill={C.goldHi} opacity="0.55" clipPath="url(#clipRound)" />
      <text x="65" y="106" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="13" letterSpacing="3.5" fill={C.ink} opacity="0.75">ÉLAN</text>
      <ellipse cx="44" cy="76" rx="10" ry="20" fill="#FFFFFF" opacity="0.35" />
      <defs>
        <linearGradient id="glassBeige" x1="15" y1="52" x2="115" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBF6EC" stopOpacity="0.9" />
          <stop offset="1" stopColor="#E7D9BB" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SizePicker({ value, onChange }) {
  return (
    <div className="flex gap-1 justify-center mt-2 flex-wrap">
      {SIZES.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className="px-1.5 py-0.5 text-[9px]"
          style={{ border: `1px solid ${value === s ? C.gold : C.line}`, color: value === s ? C.ink : C.muted, background: value === s ? C.bg : "transparent" }}
        >
          {s}ml
        </button>
      ))}
    </div>
  );
}

function ProductVisual({ p, size = 1 }) {
  if (p?.image) {
    return (
      <img
        src={p.image}
        alt={`ÉLAN ${p.code}`}
        style={{ width: 130 * size, height: 176 * size, objectFit: "cover" }}
        className="rounded-sm"
      />
    );
  }
  return <Bottle size={size} />;
}

function ProductCard({ p, onAdd, ribbon }) {
  const [size, setSize] = useState(50);
  return (
    <div className="card relative flex flex-col h-full items-center text-center p-3 sm:p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      {ribbon && (
        <div className="absolute top-2 left-2 flex items-center gap-1 text-[8px] tracked uppercase px-1.5 py-0.5" style={{ background: C.ink, color: C.goldHi }}>
          <Crown size={8} /> Bestseller
        </div>
      )}
      <div className="card-bottle"><ProductVisual p={p} size={0.42} /></div>
      {p.tier === "Signature" && (
        <div className="flex items-center gap-1 text-[8px] tracked uppercase mt-2" style={{ color: C.gold }}><Sparkles size={9} /> Signature</div>
      )}
      <div className="font-display text-base sm:text-lg mt-1">ÉLAN {p.code}</div>
      <div className="text-[10px] italic mt-0.5" style={{ color: C.gold }}>{p.insp}</div>
      <div className="flex gap-1 justify-center mt-1.5 flex-wrap">
        <span className="text-[8px] uppercase tracked px-1.5 py-0.5" style={{ border: `1px solid ${C.line}`, color: C.muted }}>{p.gender}</span>
        <span className="text-[8px] uppercase tracked px-1.5 py-0.5" style={{ border: `1px solid ${C.line}`, color: C.muted }}>{p.family}</span>
      </div>
      <div className="text-[11px] mt-2" style={{ color: C.text }}>{p.note}</div>
      <div className="text-[9px] mt-0.5" style={{ color: C.muted }}>{p.accord}</div>

      <div className="mt-auto w-full pt-2">
        <SizePicker value={size} onChange={setSize} />
        <div className="font-display text-base mt-1.5" style={{ color: C.ink }}>{fmt(PRICE[size])}</div>
        <button onClick={() => onAdd(p.id, size)} className="btn-gold mt-2 w-full py-1.5 text-[9px] tracked uppercase flex items-center justify-center gap-1">
          <Plus size={10} /> In den Warenkorb
        </button>
      </div>
    </div>
  );
}

function CategoryTile({ cat, onClick }) {
  return (
    <button
      onClick={onClick}
      className="category-tile relative aspect-square overflow-hidden flex items-end p-4 sm:p-6 text-left"
    >
      <img
        src={cat.image}
        alt={cat.label}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,24,9,0) 40%, rgba(36,24,9,0.75) 100%)" }} />
      <span className="font-display text-xl sm:text-3xl text-white relative z-10" style={{ lineHeight: 1.1 }}>{cat.label}</span>
    </button>
  );
}

function Ticker() {
  const content = TICKER_ITEMS.join("   ✦   ") + "   ✦   ";
  return (
    <div style={{ background: C.ink, overflow: "hidden" }}>
      <div className="ticker-track flex whitespace-nowrap py-2 text-[10px] tracked uppercase" style={{ color: C.goldHi }}>
        <span className="px-4">{content}</span>
        <span className="px-4">{content}</span>
      </div>
    </div>
  );
}

function FloatCard({ icon, title, sub }) {
  return (
    <div className="float-card flex items-start gap-3 p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      <div style={{ color: C.gold }}>{icon}</div>
      <div className="text-left">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs mt-0.5" style={{ color: C.muted }}>{sub}</div>
      </div>
    </div>
  );
}

function Quiz({ onResult, onClose }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({ gender: null, occasion: null, family: null });
  const steps = [
    { key: "gender", q: "Für wen suchst du den Duft?", opts: GENDERS },
    { key: "occasion", q: "Für welchen Anlass?", opts: OCCASIONS },
    { key: "family", q: "Welche Richtung mag er/sie am liebsten?", opts: FAMILIES },
  ];
  const pick = (key, val) => {
    const next = { ...ans, [key]: val };
    setAns(next);
    if (step < steps.length - 1) { setStep(step + 1); return; }
    const scored = PRODUCTS.map((p) => ({
      p,
      score: (p.gender === next.gender || next.gender === "Unisex" || p.gender === "Unisex" ? 1 : 0) +
             (p.occasion === next.occasion ? 1 : 0) + (p.family === next.family ? 1 : 0),
    }));
    const maxScore = Math.max(...scored.map((s) => s.score));
    const bestMatches = scored.filter((s) => s.score === maxScore);
    const randomPick = bestMatches[Math.floor(Math.random() * bestMatches.length)];
    onResult(randomPick.p);
  };
  const s = steps[step];
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs tracked uppercase" style={{ color: C.gold }}>Frage {step + 1} / {steps.length}</div>
        <button onClick={onClose} aria-label="Schließen"><X size={18} /></button>
      </div>
      <h3 className="font-display text-2xl mb-6">{s.q}</h3>
      <div className="flex flex-col gap-3">
        {s.opts.map((o) => (
          <button key={o} onClick={() => pick(s.key, o)} className="quiz-opt flex items-center justify-between px-5 py-3 text-sm" style={{ border: `1px solid ${C.line}` }}>
            {o} <ArrowRight size={14} />
          </button>
        ))}
      </div>
      {step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs mt-6" style={{ color: C.muted }}><ArrowLeft size={12} /> Zurück</button>}
    </div>
  );
}

export default function ElanSite() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // NEU: Popup beim ersten Laden
  const [genderF, setGenderF] = useState("Alle");
  const [familyF, setFamilyF] = useState("Alle");
  const [occasionF, setOccasionF] = useState("Alle");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [form, setForm] = useState({ name: "", address: "", plz: "", ort: "", land: "Deutschland" });
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current + 4 && y > 80) setHeaderHidden(true);
      else if (y < lastY.current - 4 || y < 80) setHeaderHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = useCallback((id, size) => {
    const key = `${id}_${size}`;
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
    const p = PRODUCTS.find((pr) => pr.id === id);
    setToast(`✓ ÉLAN ${p?.code} (${size}ml) hinzugefügt`);
    clearTimeout(window.__elanToastTimer);
    window.__elanToastTimer = setTimeout(() => setToast(null), 2200);
  }, []);
  
  const changeQty = useCallback((key, delta) => {
    setCart((c) => {
      const next = { ...c, [key]: (c[key] || 0) + delta };
      if (next[key] <= 0) delete next[key];
      return next;
    });
  }, []);

  const cartItems = useMemo(() => Object.entries(cart).map(([key, qty]) => {
    const [id, size] = key.split("_").map(Number);
    return { ...PRODUCTS.find((p) => p.id === id), size, qty, key, unitPrice: PRICE[size] };
  }), [cart]);

  const total = useMemo(() => cartItems.reduce((s, i) => s + i.unitPrice * i.qty, 0), [cartItems]);
  const count = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  
  // GEÄNDERT: Rabatt ab 3, Versand ab 5
  const discount = count >= 3 ? total * 0.10 : 0;
  const shipping = count === 0 ? 0 : count >= 5 ? 0 : 6.2;
  const grandTotal = total - discount + shipping;
  const bestsellers = useMemo(() => PRODUCTS.filter((p) => p.bestseller), []);

  const filtered = PRODUCTS.filter(
    (p) => (genderF === "Alle" || p.gender === genderF) &&
           (familyF === "Alle" || p.family === familyF) &&
           (occasionF === "Alle" || p.occasion === occasionF) &&
           (search.trim() === "" ||
             p.insp.toLowerCase().includes(search.trim().toLowerCase()) ||
             p.code.toLowerCase().includes(search.trim().toLowerCase()) ||
             p.note.toLowerCase().includes(search.trim().toLowerCase()))
  );
  const visible = filtered.slice(0, visibleCount);

  useEffect(() => { setVisibleCount(20); }, [genderF, familyF, occasionF, search]);

  const formValid = form.name.trim() && form.address.trim() && form.plz.trim() && form.ort.trim() && form.land.trim();

  const sendToInstagram = () => {
    if (cartItems.length === 0 || !formValid) return;
    const lines = cartItems.map((i) => `• ÉLAN ${i.code} (${i.size}ml) — ${i.qty}x (${fmt(i.unitPrice * i.qty)})`).join("\n");
    const text = `Hallo ÉLAN! Ich möchte gerne bestellen:\n\n${lines}\n\nZwischensumme: ${fmt(total)}${discount > 0 ? `\nRabatt (-10%): -${fmt(discount)}` : ""}\nVersand: ${shipping === 0 ? "kostenlos" : fmt(shipping)}\nGesamt: ${fmt(grandTotal)}\n\nName: ${form.name}\nAdresse: ${form.address}\nPLZ / Ort: ${form.plz} ${form.ort}\nLand: ${form.land}\n\nZahlung: PayPal / Überweisung (nach Absprache)`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }).catch(() => {});
    openExternal(IG_DM_URL);
  };

  const navItems = [
    ["Bestseller", "bestseller"],
    ["Kollektion", "shop"],
    ["Geschichte", "geschichte"],
    ["Stimmen", "stimmen"],
    ["FAQ", "faq"],
  ];

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }} className="font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Jost', sans-serif; }
        .tracked { letter-spacing: 0.28em; }
        ::selection { background: ${C.gold}; color: ${C.bg}; }
        .btn-gold { background: ${C.ink}; color: ${C.goldHi}; transition: background .2s ease; cursor: pointer; }
        .btn-gold:hover { background: ${C.inkHi}; }
        .btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost { cursor: pointer; }
        .card { transition: box-shadow .3s ease, transform .3s ease; }
        .card:hover { box-shadow: 0 14px 30px -18px rgba(36,24,9,0.35); transform: translateY(-2px); }
        .card:hover .card-bottle { transform: translateY(-4px); }
        .card-bottle { transition: transform .35s ease; }
        .quiz-opt { transition: background .2s ease, border-color .2s ease; background: transparent; cursor: pointer; }
        .quiz-opt:hover { background: ${C.bg}; border-color: ${C.gold} !important; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer { animation: slideIn .3s ease; }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .float-card { animation: floaty 5s ease-in-out infinite; transition: box-shadow .3s ease; }
        .float-card:nth-child(2) { animation-delay: .6s; }
        .float-card:nth-child(3) { animation-delay: 1.2s; }
        .float-card:hover { box-shadow: 0 16px 32px -18px rgba(36,24,9,0.4); }
        input.el-input, select.el-select { background: ${C.bg}; border: 1px solid ${C.line}; color: ${C.text}; }
        input.el-input::placeholder { color: ${C.muted}; }
        input.el-input:focus, select.el-select:focus { outline: none; border-color: ${C.gold}; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: marquee 26s linear infinite; width: max-content; }
        .category-tile { transition: transform .3s ease; cursor: pointer; border: none; }
        .category-tile:hover { transform: scale(1.02); }
        .category-icon { transition: transform .3s ease; }
      `}</style>

      {/* Ticker + Header */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{ transform: headerHidden ? "translateY(-100%)" : "translateY(0)", transition: "transform .3s ease" }}
      >
        <Ticker />
        <header
          className="flex items-center justify-between px-6 md:px-12 py-4"
          style={{ background: `${C.bg}EE`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}
        >
          <button onClick={() => scrollTo("top")} className="font-display text-2xl btn-ghost" style={{ letterSpacing: "0.35em", background: "none", border: "none", color: C.text }}>ÉLAN</button>
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
      </div>
      <div style={{ height: 104 }} />

      {/* Mobile Menu */}
      {mobileNav && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col" style={{ background: C.bg }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="font-display text-2xl" style={{ letterSpacing: "0.35em" }}>ÉLAN</div>
            <button onClick={() => setMobileNav(false)} aria-label="Menü schließen" className="btn-ghost" style={{ background: "none", border: "none" }}><X size={22} /></button>
          </div>
          <div className="flex flex-col text-lg tracked uppercase px-6 py-8 gap-6">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => { scrollTo(id); setMobileNav(false); }} className="text-left btn-ghost" style={{ background: "none", border: "none", color: C.text }}>{label}</button>
            ))}
          </div>
        </div>
      )}

      {/* POPUP - NEUKUNDEN 30% RABATT */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setShowPopup(false)}>
          <div className="w-full max-w-md" style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: "20px", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {/* Schließen-Button */}
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Schließen"
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: C.ink, zIndex: 10 }}
            >
              ×
            </button>

            {/* Platz für Bild */}
            <div
              style={{
                width: "100%",
                height: "220px",
                background: C.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.muted,
                fontSize: "14px",
              }}
            >
              {/* Hier später: <img src="/images/popup-bild.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
              [Bild: 30% Rabatt Teaser]
            </div>

            {/* Content */}
            <div style={{ padding: "30px 30px 35px" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold }}>
                🎁 Neukunden
              </p>
              <h3 style={{ margin: "10px 0 5px 0", fontSize: "32px", fontWeight: "300", letterSpacing: "0.05em", color: C.ink }}>
                30% Rabatt
              </h3>
              <p style={{ margin: "0 0 25px 0", fontSize: "16px", fontWeight: "300", letterSpacing: "0.05em", color: C.muted }}>
                auf deine erste Bestellung
              </p>

              {/* Button: Kollektion entdecken */}
              <button
                onClick={() => {
                  setShowPopup(false);
                  scrollTo("shop");
                }}
                style={{
                  background: C.ink,
                  color: C.goldHi,
                  border: "none",
                  borderRadius: "30px",
                  padding: "14px 30px",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                }}
                onMouseOver={(e) => e.target.style.background = C.inkHi}
                onMouseOut={(e) => e.target.style.background = C.ink}
              >
                Kollektion entdecken
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP - NEUKUNDEN 30% RABATT */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setShowPopup(false)}>
          <div className="w-full max-w-md" style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: "20px", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {/* Schließen-Button */}
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Schließen"
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: C.ink, zIndex: 10 }}
            >
              ×
            </button>

            {/* Platz für Bild */}
            <div
              style={{
                width: "100%",
                height: "220px",
                background: C.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.muted,
                fontSize: "14px",
              }}
            >
              {/* Hier später: <img src="/images/popup-bild.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
<img src="/images/popup-rabatt.jpg" alt="30% Rabatt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />            </div>

            {/* Content */}
            <div style={{ padding: "30px 30px 35px" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold }}>
                 NEUKUNDEN
              </p>
              <h3 style={{ margin: "10px 0 5px 0", fontSize: "32px", fontWeight: "300", letterSpacing: "0.05em", color: C.ink }}>
                30% Rabatt
              </h3>
              <p style={{ margin: "0 0 25px 0", fontSize: "16px", fontWeight: "300", letterSpacing: "0.05em", color: C.muted }}>
                auf deine erste Bestellung
              </p>

              {/* Button: Kollektion entdecken */}
              <button
                onClick={() => {
                  setShowPopup(false);
                  scrollTo("shop");
                }}
                style={{
                  background: C.ink,
                  color: C.goldHi,
                  border: "none",
                  borderRadius: "30px",
                  padding: "14px 30px",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                }}
                onMouseOver={(e) => e.target.style.background = C.inkHi}
                onMouseOut={(e) => e.target.style.background = C.ink}
              >
                Kollektion entdecken
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="top" className="relative px-6 md:px-12 pt-16 pb-12 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
            <img
              src="/images/hero-1.jpg"
              alt="ÉLAN 1"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
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
            <img
              src="/images/hero-2.jpg"
              alt="ÉLAN 2"
              className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: 580 }}
            />
          </div>

          <div className="md:hidden mb-8">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-lg object-cover h-80"
              style={{ background: "#000" }}
              onCanPlayThrough={(e) => e.currentTarget.play().catch(() => {})}
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="text-center">
            <div className="mb-4 text-xs tracked uppercase" style={{ color: C.gold }}>Premium Duftzwillinge</div>
            <h1 className="font-display text-4xl md:text-6xl mb-4 md:mb-6" style={{ lineHeight: 1.05, color: C.ink }}>
              Ikonische Düfte.<br />Neu interpretiert.
            </h1>
            <p className="text-xs md:text-sm mb-6 md:mb-9 max-w-2xl mx-auto" style={{ color: C.muted }}>
              Extrait de Parfum mit 30% Ölanteil. Komponiert aus erlesenen Rohstoffen aus Frankreich &amp; England.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => scrollTo("shop")} className="btn-gold px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2">
                Kollektion entdecken <ChevronRight size={15} />
              </button>
              <button onClick={() => { setQuizOpen(true); setQuizResult(null); }} className="px-8 py-3 text-sm tracked uppercase inline-flex items-center justify-center gap-2 btn-ghost" style={{ border: `1px solid ${C.gold}`, color: C.ink, background: "none" }}>
                <Wand2 size={15} /> Duft-Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="stimmen" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Kundenfeedback</div>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-16">Das sagen unsere Kunden</h2>
        
        <div className="overflow-hidden pb-6 carousel-mask" style={{ WebkitOverflowScrolling: "touch" }}>
          <style>{`
            @keyframes autoScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .carousel-track {
              animation: autoScroll 30s linear infinite;
            }
            .carousel-mask {
              -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
              mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
            }
          `}</style>
          
          <div className="carousel-track flex gap-8 md:gap-12 min-w-max px-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 md:w-96 text-center">
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

      {/* CATEGORIES */}
      <section className="px-6 md:px-12 pb-16 max-w-4xl mx-auto">
        <div className="text-xs tracked uppercase mb-2 text-center" style={{ color: C.gold }}>Entdecke</div>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-8">Duftwelten</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryTile
              key={cat.label}
              cat={cat}
              onClick={() => {
                if (cat.type === "occasion") { setOccasionF(cat.value); setFamilyF("Alle"); }
                else { setFamilyF(cat.value); setOccasionF("Alle"); }
                setGenderF("Alle");
                scrollTo("shop");
              }}
            />
          ))}
        </div>
      </section>

      {/* TRUST CARDS */}
    <section className="px-6 md:px-12 pb-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6">
  <FloatCard icon={<Truck size={20} />} title="Versand in 2–4 Werktagen" sub="Schneller, diskreter Versand" />
  <FloatCard icon={<Gift size={20} />} title="Ab 3 Flaschen: 10% Rabatt | Ab 5: Gratis Versand" sub="Automatische Anrechnung" />
  <FloatCard icon={<ShieldCheck size={20} />} title="Sicher bezahlen" sub="PayPal oder Banküberweisung" />
  <FloatCard icon={<Percent size={20} />} title="30% Rabatt" sub="Für Neukunden auf die erste Bestellung" />
      </section>

      {/* TRUST BAR */}
      <section className="px-6 md:px-12 py-10" style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["30%", "Ölanteil"], ["16+ Std.", "Haltbarkeit auf der Haut"], ["98–99%", "Zielgenauigkeit zum Original"], ["FR / UK", "Erlesene Rohstoffe"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl" style={{ color: C.gold }}>{n}</div>
              <div className="text-xs mt-1" style={{ color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="geschichte" className="px-6 md:px-12 py-20 max-w-2xl mx-auto text-center">
        <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Unsere Geschichte</div>
        <h2 className="font-display text-4xl mb-6">Vom Kinderzimmer zur Marke</h2>
        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
          ÉLAN begann als Herzensprojekt in einem ganz normalen Kinderzimmer — mit einer einfachen
          Idee: großartige Düfte sollten kein Luxus für wenige sein. Aus unzähligen Testreihen und viel
          Leidenschaft für Parfümerie entstanden unsere Duftzwillinge — komponiert aus erlesenen Ölen
          aus Frankreich &amp; England, mit 30% Ölanteil für ein Erlebnis, das seinem Vorbild in nichts nachsteht.
        </p>
      </section>

      {/* BESTSELLER */}
      <section id="bestseller" className="px-6 md:px-12 py-20 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-3 mb-2 justify-center">
          <Crown size={16} style={{ color: C.gold }} />
          <div className="text-xs tracked uppercase" style={{ color: C.gold }}>Meistbestellt</div>
        </div>
        <h2 className="font-display text-4xl text-center mb-12">Der Bestseller-Katalog</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestsellers.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} ribbon />)}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="px-6 md:px-12 py-20 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-center mb-10">
          <div className="text-xs tracked uppercase mb-2" style={{ color: C.gold }}>Gesamte Kollektion · {PRODUCTS.length} Düfte</div>
          <h2 className="font-display text-4xl">Alle Düfte</h2>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <input
            className="el-input w-full px-4 py-2.5 text-sm"
            placeholder="Duft suchen (z. B. Aventus, Leder, No. 012) ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center items-center">
          <div className="flex gap-2 text-xs tracked uppercase">
            {["Alle", ...GENDERS].map((f) => (
              <button key={f} onClick={() => setGenderF(f)} className="px-3 py-1.5 btn-ghost" style={{ border: `1px solid ${genderF === f ? C.gold : C.line}`, color: genderF === f ? C.ink : C.muted, background: genderF === f ? C.surface : "transparent" }}>{f}</button>
            ))}
          </div>
          <select className="el-select px-3 py-2 text-sm" value={familyF} onChange={(e) => setFamilyF(e.target.value)}>
            <option value="Alle">Duftfamilie: Alle</option>
            {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className="el-select px-3 py-2 text-sm" value={occasionF} onChange={(e) => setOccasionF(e.target.value)}>
            <option value="Alle">Anlass: Alle</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="text-center text-xs mb-8" style={{ color: C.muted }}>
          {filtered.length} {filtered.length === 1 ? "Duft gefunden" : "Düfte gefunden"}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-sm py-16" style={{ color: C.muted }}>Kein Duft passt zu dieser Kombination — versuch eine andere Filter- oder Sucheinstellung.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {visible.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} ribbon={p.bestseller} />)}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex flex-col items-center gap-2 mt-12">
                <div className="text-xs" style={{ color: C.muted }}>{visibleCount} von {filtered.length} angezeigt</div>
                <button onClick={() => setVisibleCount((v) => v + 20)} className="btn-gold px-8 py-3 text-xs tracked uppercase">
                  Mehr laden
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-16 max-w-3xl mx-auto text-center" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Bestellung</div>
        <h3 className="font-display text-3xl mb-4">Wie funktioniert die Bestellung?</h3>
        <p className="text-sm" style={{ color: C.muted }}>
          Wähle Duft &amp; Größe, öffne den Warenkorb, trage deine Adresse ein und sende die Bestellung
          per Instagram-DM. Bezahlt wird per PayPal oder Überweisung. Versand in 2–4 Werktagen — ab 3
          Flaschen 10% Rabatt, ab 5 Flaschen kostenlos.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10 flex flex-col gap-6 text-xs" style={{ borderTop: `1px solid ${C.line}`, color: C.muted }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg" style={{ letterSpacing: "0.3em", color: C.text }}>ÉLAN</div>
          <div>© {new Date().getFullYear()} ÉLAN Fragrances — Premium Duftzwillinge</div>
          <button onClick={() => openExternal(IG_URL)} className="flex items-center gap-2 btn-ghost" style={{ color: C.text, background: "none", border: "none" }}><Instagram size={14} /> @elan.fragrances</button>
        </div>
        <div className="flex gap-4 justify-center md:justify-start" style={{ color: C.muted }}>
          <span>Impressum</span><span>Datenschutz</span><span>AGB</span>
        </div>
      </footer>

      {/* Quiz Modal */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#241809AA" }} onClick={() => setQuizOpen(false)}>
          <div className="w-full max-w-md" style={{ background: C.bg, border: `1px solid ${C.line}` }} onClick={(e) => e.stopPropagation()}>
            {quizResult ? (
              <div className="p-8 text-center">
                <div className="text-xs tracked uppercase mb-4" style={{ color: C.gold }}>Dein perfekter Duft</div>
                <ProductVisual p={quizResult} size={0.9} />
                <div className="font-display text-2xl mt-4">ÉLAN {quizResult.code}</div>
                <div className="text-xs italic mt-1" style={{ color: C.gold }}>{quizResult.insp}</div>
                <div className="text-sm mt-3" style={{ color: C.muted }}>{quizResult.note}</div>
                <div className="font-display text-xl mt-4">{fmt(PRICE[50])} <span className="text-xs" style={{ color: C.muted }}>(50ml)</span></div>
                <button onClick={() => { addToCart(quizResult.id, 50); setQuizOpen(false); }} className="btn-gold mt-6 w-full py-3 text-xs tracked uppercase flex items-center justify-center gap-2">
                  <Plus size={13} /> In den Warenkorb
                </button>
                <button onClick={() => setQuizOpen(false)} className="text-xs mt-4 btn-ghost" style={{ color: C.muted, background: "none", border: "none" }}>Schließen</button>
              </div>
            ) : <Quiz onResult={setQuizResult} onClose={() => setQuizOpen(false)} />}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "#241809AA" }} onClick={() => setCartOpen(false)}>
          <div className="drawer w-full max-w-sm h-full flex flex-col overflow-y-auto" style={{ background: C.surface, borderLeft: `1px solid ${C.line}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${C.line}` }}>
              <div className="font-display text-2xl">Warenkorb</div>
              <button onClick={() => setCartOpen(false)} aria-label="Schließen" className="btn-ghost" style={{ background: "none", border: "none" }}><X size={20} /></button>
            </div>

            <div className="px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="text-sm mt-10 text-center" style={{ color: C.muted }}>Dein Warenkorb ist noch leer.</div>
              ) : cartItems.map((i) => (
                <div key={i.key} className="flex items-center gap-4 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
                  <div className="shrink-0"><ProductVisual p={i} size={0.45} /></div>
                  <div className="flex-1">
                    <div className="font-display text-lg">ÉLAN {i.code} <span className="text-xs" style={{ color: C.muted }}>({i.size}ml)</span></div>
                    <div className="text-xs italic" style={{ color: C.gold }}>{i.insp}</div>
                    <div className="text-sm mt-1" style={{ color: C.ink }}>{fmt(i.unitPrice)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(i.key, -1)} style={{ border: `1px solid ${C.line}` }} className="w-7 h-7 flex items-center justify-center btn-ghost"><Minus size={12} /></button>
                    <span className="w-5 text-center text-sm">{i.qty}</span>
                    <button onClick={() => changeQty(i.key, 1)} style={{ border: `1px solid ${C.line}` }} className="w-7 h-7 flex items-center justify-center btn-ghost"><Plus size={12} /></button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-6" style={{ borderTop: `1px solid ${C.line}` }}>
                <div className="flex justify-between text-sm mb-1" style={{ color: C.muted }}><span>Zwischensumme</span><span>{fmt(total)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-1" style={{ color: C.gold }}>
                    <span className="flex items-center gap-1"><Percent size={12} /> Rabatt (-10%)</span><span>-{fmt(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm mb-1" style={{ color: C.muted }}><span>Versand</span><span>{shipping === 0 ? "kostenlos" : fmt(shipping)}</span></div>
                {count > 0 && count < 5 && <div className="text-[11px] mb-3" style={{ color: C.gold }}>Noch {5 - count} Flasche(n) für kostenlosen Versand!</div>}
                <div className="flex justify-between font-display text-2xl mb-5"><span>Gesamt</span><span style={{ color: C.gold }}>{fmt(grandTotal)}</span></div>

                <div className="text-xs tracked uppercase mb-3" style={{ color: C.gold }}>Lieferadresse</div>
                <div className="flex flex-col gap-2 mb-5">
                  <input className="el-input px-3 py-2 text-sm" placeholder="Vor- und Nachname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="el-input px-3 py-2 text-sm" placeholder="Adresse (Straße, Nr.)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  <div className="flex gap-2">
                    <input className="el-input px-3 py-2 text-sm w-24" placeholder="PLZ" value={form.plz} onChange={(e) => setForm({ ...form, plz: e.target.value })} />
                    <input className="el-input px-3 py-2 text-sm flex-1" placeholder="Ort" value={form.ort} onChange={(e) => setForm({ ...form, ort: e.target.value })} />
                  </div>
                  <input className="el-input px-3 py-2 text-sm" placeholder="Land" value={form.land} onChange={(e) => setForm({ ...form, land: e.target.value })} />
                </div>

                <button onClick={sendToInstagram} disabled={!formValid} className="btn-gold w-full py-3 text-xs tracked uppercase flex items-center justify-center gap-2">
                  <Send size={14} /> Bestellung per Instagram senden
                </button>
                <div className="flex items-center justify-center gap-1 text-[11px] mt-3" style={{ color: C.muted }}>
                  <ShieldCheck size={12} /> Zahlung per PayPal oder Überweisung — nach Absprache im Chat
                </div>
                {!formValid && <div className="text-[11px] mt-2 text-center" style={{ color: C.gold }}>Bitte fülle alle Adressfelder aus.</div>}
                {copied && <div className="flex items-center justify-center gap-1 text-xs mt-3" style={{ color: C.gold }}><Check size={13} /> Bestellung kopiert — in Insta einfügen</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[60] px-5 py-3 text-xs tracked uppercase"
          style={{ transform: "translateX(-50%)", background: C.ink, color: C.goldHi, boxShadow: "0 10px 30px -10px rgba(36,24,9,0.5)" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
