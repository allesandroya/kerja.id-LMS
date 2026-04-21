import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════
   KERJA.ID — LMS Platform (Path A functional MVP)
   Brand theme — White bg · Neon Yellow-Green (#C8FF00) accent
   · Dark pill CTAs · Dark footer · Soft pastel hero
   State persisted in localStorage (see LS keys below).
   Admin password: "admin123"
   ═══════════════════════════════════════════════════ */

const C = {
  bg: "#FFFFFF", bg2: "#FAFAFA", bg3: "#F4F4F5", bg4: "#E8E8EC",
  accent: "#C8FF00", accentDim: "#A3D400",
  accentBg: "rgba(200,255,0,0.18)", accentBorder: "rgba(200,255,0,0.50)",
  onAccent: "#0A0A0F",
  accentInk: "#3F5C00", accentInkSoft: "#5C7A1A",
  dark: "#0F1419", darkBg2: "#171C21", darkText: "#F4F4F5", darkMuted: "#8A8A95", darkBorder: "rgba(255,255,255,0.08)",
  pill: "#0A0A0F", onPill: "#FFFFFF",
  text: "#0A0A0F", muted: "#5A5A66", dim: "#9A9AA6",
  border: "rgba(10,10,15,0.08)", borderH: "rgba(10,10,15,0.16)",
  green: "#2BB673", red: "#E53935", blue: "#3A86FF", orange: "#F59E0B", pink: "#FF5B8D",
  card: "#FFFFFF",
  shadow: "0 1px 2px rgba(10,10,15,0.04), 0 4px 12px rgba(10,10,15,0.04)",
  shadowLg: "0 2px 4px rgba(10,10,15,0.04), 0 12px 32px rgba(10,10,15,0.08)",
  pastelHero: "radial-gradient(ellipse at 15% 50%, rgba(245,200,165,0.55) 0%, transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(200,240,200,0.55) 0%, transparent 55%), radial-gradient(ellipse at 88% 25%, rgba(170,225,230,0.65) 0%, transparent 55%), linear-gradient(135deg, #FFF5EC 0%, #EEF9EC 50%, #E8F5F5 100%)",
};
const F = {
  head: "'Sora', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const I = {
  play: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  lock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  star: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  arrow: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2M6 3h12v6a6 6 0 01-12 0V3zM9 21h6M12 15v6"/></svg>,
  dollar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  menu: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

/* ── DATA LAYER ─────────────────────────────────────── */
const LS = {
  user: "kerjaid.user",
  courses: "kerjaid.courses",
  enrollments: "kerjaid.enrollments",
  settings: "kerjaid.settings",
  adminAuth: "kerjaid.adminAuth",
};
const ADMIN_PASSWORD = "admin123";

// Generate template lessons so every course has something to play.
const lessonTemplate = (prefix) => [
  { id: 1, title: `Introduction to ${prefix}`, dur: "08:30", done: false, active: true },
  { id: 2, title: "Setup & First Steps", dur: "12:15", done: false },
  { id: 3, title: "Core Concepts", dur: "18:40", done: false },
  { id: 4, title: "Hands-on Exercise 1", dur: "22:10", done: false },
  { id: 5, title: "Intermediate Techniques", dur: "24:00", done: false },
  { id: 6, title: "Hands-on Exercise 2", dur: "20:30", done: false },
  { id: 7, title: "Advanced Topics", dur: "28:00", done: false },
  { id: 8, title: "Final Project", dur: "35:00", done: false, locked: true },
];

const DEFAULT_COURSES = [
  { id: 1, title: "Microsoft Excel Mastery", desc: "Dari NOL ke Master Excel", students: 12400, rating: 4.9, modules: 48, hours: 32, price: 198000, oldPrice: 2000000, icon: "📊", color: "#00A651", lessons: [
    { id: 1, title: "Pengenalan Excel Interface", dur: "12:30", done: false, active: true },
    { id: 2, title: "Basic Formula & Functions", dur: "18:45", done: false },
    { id: 3, title: "SUM, AVERAGE, COUNT", dur: "15:20", done: false },
    { id: 4, title: "IF, AND, OR Logic", dur: "22:10", done: false },
    { id: 5, title: "VLOOKUP & HLOOKUP", dur: "25:00", done: false },
    { id: 6, title: "INDEX MATCH Advanced", dur: "28:15", done: false },
    { id: 7, title: "PivotTable Fundamentals", dur: "30:00", done: false },
    { id: 8, title: "PivotChart & Slicers", dur: "20:45", done: false },
    { id: 9, title: "Conditional Formatting", dur: "16:30", done: false },
    { id: 10, title: "Data Validation", dur: "14:20", done: false },
    { id: 11, title: "Power Query Basics", dur: "35:00", done: false, locked: true },
    { id: 12, title: "Dashboard Design", dur: "40:00", done: false, locked: true },
  ]},
  { id: 2, title: "Google Sheets Pro", desc: "Collaborate & automate", students: 5800, rating: 4.8, modules: 36, hours: 24, price: 149000, oldPrice: 1500000, icon: "📋", color: "#34A853", lessons: lessonTemplate("Google Sheets") },
  { id: 3, title: "Power BI Analytics", desc: "Data jadi keputusan", students: 3200, rating: 4.9, modules: 42, hours: 28, price: 249000, oldPrice: 2500000, icon: "📈", color: "#F2C811", lessons: lessonTemplate("Power BI") },
  { id: 4, title: "Looker Studio", desc: "Free reporting tool", students: 2100, rating: 4.7, modules: 24, hours: 16, price: 149000, oldPrice: 1500000, icon: "📉", color: "#4285F4", lessons: lessonTemplate("Looker Studio") },
  { id: 5, title: "Tableau Fundamentals", desc: "Visual analytics", students: 1800, rating: 4.8, modules: 30, hours: 20, price: 199000, oldPrice: 2000000, icon: "📊", color: "#E97627", lessons: lessonTemplate("Tableau") },
];

const DEFAULT_SETTINGS = {
  siteName: "KERJA.ID",
  adminEmail: "admin@kerja.id",
  whatsapp: "081944900917",
  timezone: "Asia/Jakarta (WIB)",
  gateway: "mock", // "mock" | "lynk" | "midtrans" | "xendit"
  lynkUrl: "https://lynk.id/kerjaid/checkout",
  midtransKey: "SB-Mid-server-xxxx",
  midtransMode: "sandbox", // "sandbox" | "production"
  xenditKey: "xnd_development_xxxx",
  methods: { va: true, qris: true, ewallet: true, retail: false, card: false },
};

const PARTNERS = ["AIESEC", "PELNI", "RevoU", "FWD Insurance", "BCA Insurance"];
const TESTIMONIALS = [
  { name: "Rina S.", role: "HR Manager", text: "Kerjaan yang biasa 3 jam sekarang cuma 15 menit. Gila sih." },
  { name: "Budi P.", role: "Data Analyst", text: "Langsung bisa bikin dashboard buat meeting direksi." },
  { name: "Dian M.", role: "Fresh Graduate", text: "Dari nol, sekarang udah dapat kerja sebagai junior analyst." },
  { name: "Andi W.", role: "Finance Staff", text: "Bos sampe heran kenapa report bisa jadi secepat itu." },
  { name: "Sari L.", role: "Freelancer", text: "Jasa Excel saya naik 3x lipat setelah ikut course ini." },
  { name: "Raka T.", role: "Business Owner", text: "Sekarang bisa monitor performa bisnis sendiri tanpa ribet." },
];

const rp = n => "Rp " + Number(n || 0).toLocaleString("id-ID");
const uid = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getDate()} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]}`;
};

// ── useLocalStorage hook ──
function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return typeof initial === "function" ? initial() : initial;
      return JSON.parse(raw);
    } catch { return typeof initial === "function" ? initial() : initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}

/* ── UI PRIMITIVES ─────────────────────────────────── */
const Btn = ({ children, primary, accent, danger, ghost, small, onClick, style, type = "button", disabled }) => {
  const isAccent = accent;
  const isPill = primary && !accent;
  const isDanger = danger;
  const bg = isDanger ? C.red : isAccent ? C.accent : isPill ? C.pill : C.bg2;
  const fg = isDanger ? "#fff" : isAccent ? C.onAccent : isPill ? C.onPill : C.text;
  const bord = (isAccent || isPill || isDanger) ? "none" : ghost ? "1px solid transparent" : `1px solid ${C.borderH}`;
  const shadow = disabled ? "none" : isPill ? "0 6px 18px rgba(10,10,15,0.18)" : isAccent ? "0 6px 18px rgba(200,255,0,0.35)" : isDanger ? "0 6px 18px rgba(229,57,53,0.25)" : "0 1px 2px rgba(10,10,15,0.04)";
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.bg4 : bg, color: disabled ? C.dim : fg, border: bord,
      borderRadius: 999, padding: small ? "8px 18px" : "13px 28px", fontFamily: F.body,
      fontWeight: 600, fontSize: small ? 13 : 15, cursor: disabled ? "not-allowed" : "pointer",
      display: "inline-flex", alignItems: "center", gap: 8,
      transition: "all 0.2s", letterSpacing: "-0.01em", boxShadow: shadow,
      opacity: disabled ? 0.6 : 1,
      ...style,
    }}>{children}</button>
  );
};
const Badge = ({ children, color }) => (
  <span style={{
    background: color ? `${color}15` : C.accentBg,
    color: color || C.accentInk,
    border: `1px solid ${color ? `${color}30` : C.accentBorder}`,
    borderRadius: 999, padding: "4px 12px", fontSize: 11, fontFamily: F.mono, fontWeight: 600,
  }}>{children}</span>
);
const Hl = ({ children }) => (
  <span style={{
    background: `linear-gradient(transparent 55%, ${C.accent} 55%, ${C.accent} 92%, transparent 92%)`,
    color: C.text, padding: "0 6px", borderRadius: 4, whiteSpace: "nowrap",
  }}>{children}</span>
);
const Sec = ({ children, style }) => <section style={{ padding: "80px 24px", maxWidth: 1140, margin: "0 auto", ...style }}>{children}</section>;
const STitle = ({ sup, title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: 48 }}>
    {sup && <div style={{ color: C.accentInk, fontFamily: F.mono, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{sup}</div>}
    <h2 style={{ fontFamily: F.head, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: C.text, letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.15 }}>{title}</h2>
    {sub && <p style={{ fontFamily: F.body, fontSize: 16, color: C.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

// Modal
const Modal = ({ open, onClose, title, children, maxWidth = 560 }) => {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,10,15,0.55)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: 20, width: "100%", maxWidth, maxHeight: "90vh", overflowY: "auto", boxShadow: C.shadowLg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, zIndex: 1 }}>
          <h3 style={{ fontFamily: F.head, fontSize: 18, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>{title}</h3>
          <button onClick={onClose} style={{ background: C.bg3, border: "none", borderRadius: 999, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}>{I.x}</button>
        </div>
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  );
};

// FormField + inputs
const FormField = ({ label, hint, children, row }) => (
  <div style={{ marginBottom: 16, flex: row ? 1 : undefined }}>
    <label style={{ fontFamily: F.body, fontSize: 12, color: C.muted, display: "block", marginBottom: 6, fontWeight: 500 }}>{label}</label>
    {children}
    {hint && <div style={{ fontFamily: F.body, fontSize: 11, color: C.dim, marginTop: 4 }}>{hint}</div>}
  </div>
);
const Input = ({ value, onChange, placeholder, type = "text", mono, style }) => (
  <input type={type} value={value ?? ""} onChange={e => onChange(type === "number" ? Number(e.target.value) : e.target.value)} placeholder={placeholder} style={{
    width: "100%", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px",
    fontFamily: mono ? F.mono : F.body, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box",
    ...style,
  }} />
);
const Textarea = ({ value, onChange, placeholder, rows = 3, style }) => (
  <textarea value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{
    width: "100%", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px",
    fontFamily: F.body, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", resize: "vertical",
    ...style,
  }} />
);
const Select = ({ value, onChange, options, style }) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={{
    width: "100%", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px",
    fontFamily: F.body, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", cursor: "pointer",
    ...style,
  }}>
    {options.map(o => <option key={typeof o === "object" ? o.value : o} value={typeof o === "object" ? o.value : o}>{typeof o === "object" ? o.label : o}</option>)}
  </select>
);
const Toggle = ({ checked, onChange, label }) => (
  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 0" }}>
    <span onClick={() => onChange(!checked)} style={{ width: 36, height: 20, borderRadius: 999, background: checked ? C.accent : C.bg4, position: "relative", transition: "all 0.2s", border: `1px solid ${checked ? C.accentBorder : C.border}` }}>
      <span style={{ position: "absolute", top: 1, left: checked ? 17 : 1, width: 16, height: 16, borderRadius: "50%", background: checked ? C.onAccent : "#fff", transition: "all 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
    </span>
    <span style={{ fontFamily: F.body, fontSize: 13, color: C.text }}>{label}</span>
  </label>
);

/* ── NAVBAR ──────────────────────────────────────── */
function Navbar({ route, go, user, onLogout }) {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const page = route.page;
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: s ? "rgba(255,255,255,0.88)" : "transparent", backdropFilter: s ? "blur(20px) saturate(180%)" : "none", borderBottom: s ? `1px solid ${C.border}` : "none", transition: "all 0.3s", padding: "0 24px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: F.head, fontWeight: 900, fontSize: 22, color: C.text, letterSpacing: "-0.04em" }}>KERJA</span>
          <span style={{ background: C.accent, color: C.onAccent, fontFamily: F.head, fontWeight: 900, fontSize: 15, padding: "4px 10px", borderRadius: 8, letterSpacing: "-0.02em", transform: "skewX(-8deg)", display: "inline-block" }}>ID</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[["home","Home"],["catalog","Online Course"]].map(([id,l]) => (
            <button key={id} onClick={() => go(id)} style={{ background: page===id ? C.accentBg : "none", border: "none", borderRadius: 999, padding: "7px 14px", cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: 600, color: page===id ? C.accentInk : C.muted, transition: "all 0.2s" }}>{l}</button>
          ))}
          {user && (
            <button onClick={() => go("mylearning")} style={{ background: page==="mylearning" || page==="lms" ? C.accentBg : "none", border: "none", borderRadius: 999, padding: "7px 14px", cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: 600, color: (page==="mylearning" || page==="lms") ? C.accentInk : C.muted }}>My Learning</button>
          )}
          <div style={{ width: 1, height: 20, background: C.border, margin: "0 8px" }} />
          <button onClick={() => go("admin")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", color: C.muted, fontSize: 12, fontFamily: F.mono, display: "flex", alignItems: "center", gap: 6 }}>{I.settings} <span>Admin</span></button>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 6px", background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 999 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.accent, color: C.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.head, fontSize: 11, fontWeight: 800 }}>
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <span style={{ fontFamily: F.body, fontSize: 12, fontWeight: 600, color: C.text, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name || user.email.split("@")[0]}</span>
              </div>
              <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", color: C.muted, fontSize: 12, fontFamily: F.body }}>Log Out</button>
            </div>
          ) : (
            <>
              <button onClick={() => go("login")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", color: C.muted, fontSize: 13, fontFamily: F.body }}>Log In</button>
              <Btn primary small onClick={() => go("catalog")}>Enroll Now</Btn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ════════════════ HOME ════════════════ */
function Home({ go, courses }) {
  // Figma slate palette — shared with Landing for consistency
  const S = { ink: "#0F172A", inkSoft: "#1E293B", body: "#334155", muted: "#64748B", line: "#CBD5E1", wash: "#F8FAFC" };
  const ACC = { green: "#22C55E", greenInk: "#15803D", greenWash: "#DCFCE7", blue: "#3B82F6", blueWash: "#DBEAFE", orange: "#F97316", orangeWash: "#FFEDD5" };

  const whyCards = [
    { icon: I.book, color: ACC.greenInk, bg: ACC.greenWash, title: "Materi Terkurasi", body: "50+ modul disusun praktisi industri dengan 8+ tahun pengalaman." },
    { icon: I.users, color: ACC.blue, bg: ACC.blueWash, title: "Komunitas Aktif", body: "Grup WA eksklusif untuk diskusi, tanya jawab, dan networking." },
    { icon: I.clock, color: ACC.orange, bg: ACC.orangeWash, title: "Akses Selamanya", body: "Beli sekali, akses seumur hidup. Belajar kapan aja, di mana aja." },
    { icon: I.trophy, color: ACC.greenInk, bg: ACC.greenWash, title: "Studi Kasus Nyata", body: "Kerjain project real dari industri, bukan cuma teori." },
  ];

  const scrollToCourses = () => document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });

  return <>
    {/* ═══ HERO ═══ */}
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden", background: C.pastelHero }}>
      {/* 4 floating 3D pastel cubes — matches Landing hero aesthetic */}
      <div style={{ position: "absolute", top: "11%", left: "7%", width: 92, height: 92, borderRadius: 18, background: "linear-gradient(135deg,#F5C4A0,#E89968)", boxShadow: "0 24px 48px rgba(232,153,104,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(-15deg)", opacity: 0.88, zIndex: 0 }} />
      <div style={{ position: "absolute", top: "14%", right: "11%", width: 64, height: 64, borderRadius: 14, background: "linear-gradient(135deg,#FFE0C7,#F4B487)", boxShadow: "0 18px 36px rgba(244,180,135,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(20deg)", opacity: 0.82, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "18%", right: "8%", width: 78, height: 78, borderRadius: 18, background: "linear-gradient(135deg,#FFE8D4,#F5C4A0)", boxShadow: "0 22px 40px rgba(245,196,160,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(-8deg)", opacity: 0.85, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "22%", left: "10%", width: 62, height: 62, borderRadius: "50%", background: "linear-gradient(135deg,#FFE8D4,#F5C4A0)", boxShadow: "0 16px 32px rgba(245,196,160,0.3)", opacity: 0.78, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Badge>Upgrade Skill Tanpa Ribet, Karir Makin Canggih</Badge>
        <h1 style={{ fontFamily: F.head, fontSize: "clamp(36px,6.2vw,64px)", fontWeight: 800, color: S.ink, lineHeight: 1.08, letterSpacing: "-0.035em", maxWidth: 820, margin: "28px 0 20px" }}>
          Belajar Data Skills<br/>dari <Hl>Expert</Hl>-nya.
        </h1>
        <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.6vw,19px)", color: S.inkSoft, maxWidth: 620, margin: "0 0 36px", lineHeight: 1.6 }}>
          Excel, Google Sheets, Power BI, Looker Studio & Tableau. Semua yang kamu butuhkan untuk karir di dunia data.
        </p>

        {/* Pill CTAs — Figma shape, KERJA.ID neon accent */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => go("catalog")} style={{ background: C.accent, color: C.onAccent, border: "none", padding: "18px 40px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 28px rgba(200,255,0,0.4)" }}>
            Daftar Sekarang {I.arrow}
          </button>
          <button onClick={scrollToCourses} style={{ background: "#FFFFFF", color: S.ink, border: `1.5px solid ${S.ink}`, padding: "16px 38px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            {I.play} Lihat Course
          </button>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 56, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
          {[["25,300+","Students"],["4.9","Avg Rating"],["200+","Video Lessons"],[String(courses.length),"Tools"]].map(([v,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: F.head, fontSize: 32, fontWeight: 800, color: S.ink, letterSpacing: "-0.03em" }}>{v}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: S.muted, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PARTNERS strip ═══ */}
    <Sec style={{ paddingTop: 0, paddingBottom: 40 }}>
      <p style={{ textAlign: "center", fontFamily: F.body, fontSize: 13, color: C.dim, marginBottom: 24 }}>Mentor berpengalaman yang bekerja sama dengan perusahaan besar</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", opacity: 0.45 }}>
        {PARTNERS.map(p => <span key={p} style={{ fontFamily: F.head, fontSize: 15, fontWeight: 600, color: C.muted }}>{p}</span>)}
      </div>
    </Sec>

    {/* ═══ KENAPA BELAJAR DI KERJA.ID? — 4 feature cards ═══ */}
    <section style={{ background: "linear-gradient(180deg,#F1F5F9 0%,#E2E8F0 100%)", padding: "90px 24px" }}>
      <div style={{ maxWidth: 1246, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 12px" }}>
            Kenapa Belajar di KERJA.ID?
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.4vw,18px)", color: S.inkSoft, lineHeight: 1.5, maxWidth: 760, margin: "0 auto" }}>
            Bukan platform kursus biasa. Kami fokus bikin kamu benar-benar siap pakai skill baru di dunia kerja.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {whyCards.map((card, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: "30px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: F.head, fontSize: 18, fontWeight: 600, color: S.ink, lineHeight: 1.3, margin: "6px 0 0" }}>{card.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: 14, color: S.body, lineHeight: 1.5, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PILIH SKILL — Course grid with slate-styled cards ═══ */}
    <section id="courses-section" style={{ background: "#FFFFFF", padding: "90px 24px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1246, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", fontFamily: F.mono, fontSize: 12, color: ACC.greenInk, background: ACC.greenWash, padding: "6px 14px", borderRadius: 100, marginBottom: 16, letterSpacing: "0.05em", fontWeight: 600 }}>COURSES</div>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 12px" }}>
            Pilih Skill yang Mau Kamu Kuasai
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.4vw,18px)", color: S.body, lineHeight: 1.5, maxWidth: 680, margin: "0 auto" }}>
            Setiap course dibuat oleh praktisi berpengalaman 8+ tahun di industri.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {courses.map(c => (
            <div key={c.id} onClick={() => go("landing", { courseId: c.id })} style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 20, padding: 24, cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(15,23,42,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.head, fontSize: 17, fontWeight: 700, color: S.ink, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{c.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: S.body, marginTop: 2 }}>{c.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: S.muted, background: S.wash, border: `1px solid ${S.line}`, padding: "4px 10px", borderRadius: 100 }}>{c.modules} modul</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: S.muted, background: S.wash, border: `1px solid ${S.line}`, padding: "4px 10px", borderRadius: 100 }}>{c.hours} jam</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${S.line}`, paddingTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 3, color: ACC.orange, fontSize: 12, fontWeight: 600 }}>{I.star} {c.rating}</span>
                  <span style={{ fontSize: 11, color: S.muted }}>{c.students.toLocaleString()} students</span>
                </div>
                <span style={{ fontFamily: F.head, fontSize: 15, fontWeight: 800, color: C.onAccent, background: C.accent, padding: "4px 12px", borderRadius: 100 }}>{rp(c.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ TESTIMONIALS — restyled with slate palette ═══ */}
    <section style={{ background: S.wash, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1246, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", fontFamily: F.mono, fontSize: 12, color: ACC.blue, background: ACC.blueWash, padding: "6px 14px", borderRadius: 100, marginBottom: 16, letterSpacing: "0.05em", fontWeight: 600 }}>TESTIMONIALS</div>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0 }}>
            Kata Mereka Yang Udah Join
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 20, padding: 28 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 14, color: ACC.orange }}>{[1,2,3,4,5].map(j => <span key={j}>{I.star}</span>)}</div>
              <p style={{ fontFamily: F.body, fontSize: 15, color: S.inkSoft, margin: "0 0 20px", lineHeight: 1.6 }}>"{t.text}"</p>
              <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, color: S.ink }}>{t.name}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: S.muted, marginTop: 2 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CTA BAND — dark + neon (KERJA.ID signature) ═══ */}
    <Sec>
      <div style={{ background: C.dark, borderRadius: 28, padding: "56px 40px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: C.shadowLg }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(200,255,0,0.18), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: C.accent, opacity: 0.18, filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: C.accent, opacity: 0.12, filter: "blur(50px)" }} />
        <h2 style={{ fontFamily: F.head, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: C.darkText, letterSpacing: "-0.03em", margin: "0 0 12px", position: "relative" }}>Siap upgrade karirmu?</h2>
        <p style={{ fontFamily: F.body, fontSize: 16, color: C.darkMuted, marginBottom: 28, position: "relative" }}>Mulai belajar sekarang dengan diskon hingga 90%.</p>
        <div style={{ position: "relative" }}><Btn accent onClick={() => go("catalog")}>Daftar Sekarang {I.arrow}</Btn></div>
      </div>
    </Sec>
  </>;
}

/* ════════════════ CATALOG ════════════════ */
function Catalog({ go, courses }) {
  const S = { ink: "#0F172A", inkSoft: "#1E293B", body: "#334155", muted: "#64748B", line: "#CBD5E1", wash: "#F8FAFC" };
  const ACC = { green: "#22C55E", greenInk: "#15803D", greenWash: "#DCFCE7", blue: "#3B82F6", blueWash: "#DBEAFE", orange: "#F97316", orangeWash: "#FFEDD5" };
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular"); // popular | price-asc | price-desc | rating

  const filtered = courses
    .filter(c => (c.title + " " + c.desc).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.students - a.students; // popular
    });

  const sortOptions = [
    { id: "popular", label: "Terpopuler" },
    { id: "rating", label: "Rating Tertinggi" },
    { id: "price-asc", label: "Harga Terendah" },
    { id: "price-desc", label: "Harga Tertinggi" },
  ];

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

  return <>
    {/* ── HERO BAND ── */}
    <div style={{ paddingTop: 120, paddingBottom: 48, background: S.wash, borderBottom: `1px solid ${S.line}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: F.body, fontSize: 12, fontWeight: 700, color: ACC.greenInk, background: ACC.greenWash, padding: "6px 14px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>All Courses</span>
        <h1 style={{ fontFamily: F.head, fontSize: 48, fontWeight: 800, color: S.ink, margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Pilih skill yang mau kamu kuasai</h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: S.body, margin: "0 auto", maxWidth: 620, lineHeight: 1.55 }}>Course praktis dari praktisi industri. Klik course untuk lihat detail, silabus, dan mulai belajar.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap", fontFamily: F.body, fontSize: 13, color: S.muted }}>
          <span><strong style={{ color: S.ink, fontFamily: F.head, fontSize: 16 }}>{courses.length}</strong> course aktif</span>
          <span style={{ color: S.line }}>·</span>
          <span><strong style={{ color: S.ink, fontFamily: F.head, fontSize: 16 }}>{totalStudents.toLocaleString("id-ID")}+</strong> siswa</span>
          <span style={{ color: S.line }}>·</span>
          <span><strong style={{ color: S.ink, fontFamily: F.head, fontSize: 16 }}>4.8</strong>/5 rata-rata rating</span>
        </div>
      </div>
    </div>

    {/* ── CONTROLS ── */}
    <Sec style={{ paddingTop: 40, paddingBottom: 20 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <div style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: S.muted }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari course…" style={{ width: "100%", padding: "14px 18px 14px 44px", borderRadius: 100, border: `1px solid ${S.line}`, background: "#FFFFFF", fontFamily: F.body, fontSize: 14, color: S.ink, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {sortOptions.map(opt => (
            <button key={opt.id} onClick={() => setSort(opt.id)} style={{
              padding: "10px 18px", borderRadius: 100,
              border: `1px solid ${sort === opt.id ? S.ink : S.line}`,
              background: sort === opt.id ? S.ink : "#FFFFFF",
              color: sort === opt.id ? "#FFFFFF" : S.body,
              fontFamily: F.body, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
            }}>{opt.label}</button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: S.muted, fontFamily: F.body }}>
          Tidak ada course yang cocok dengan "<strong style={{ color: S.ink }}>{query}</strong>".
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, paddingBottom: 40 }}>
          {filtered.map((c, i) => {
            const accentSet = [ACC.green, ACC.blue, ACC.orange][i % 3];
            const accentWash = [ACC.greenWash, ACC.blueWash, ACC.orangeWash][i % 3];
            const discount = c.oldPrice ? Math.round(((c.oldPrice - c.price) / c.oldPrice) * 100) : 0;
            return (
              <div key={c.id} onClick={() => go("landing", { courseId: c.id })} style={{
                background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: 24,
                cursor: "pointer", transition: "all 0.25s", display: "flex", flexDirection: "column", gap: 16,
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = S.ink; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(15,23,42,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = S.line; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                {discount > 0 && (
                  <div style={{ position: "absolute", top: 18, right: 18, background: C.accent, color: C.onAccent, padding: "5px 12px", borderRadius: 100, fontFamily: F.head, fontSize: 11, fontWeight: 800, letterSpacing: "0.04em" }}>-{discount}%</div>
                )}
                <div style={{ width: 64, height: 64, borderRadius: 20, background: accentWash, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{c.icon}</div>
                <div>
                  <h3 style={{ fontFamily: F.head, fontSize: 18, fontWeight: 700, color: S.ink, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{c.title}</h3>
                  <p style={{ fontFamily: F.body, fontSize: 13, color: S.muted, margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: S.body, background: S.wash, border: `1px solid ${S.line}`, padding: "4px 10px", borderRadius: 100 }}>{c.modules} modul</span>
                  <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: S.body, background: S.wash, border: `1px solid ${S.line}`, padding: "4px 10px", borderRadius: 100 }}>{c.hours} jam</span>
                  <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: accentSet, background: accentWash, padding: "4px 10px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 3 }}>{I.star} {c.rating}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${S.line}`, paddingTop: 16, marginTop: "auto" }}>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: S.muted }}>{c.students.toLocaleString("id-ID")} siswa</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    {c.oldPrice && <span style={{ fontFamily: F.body, fontSize: 11, color: S.muted, textDecoration: "line-through" }}>{rp(c.oldPrice)}</span>}
                    <span style={{ fontFamily: F.head, fontSize: 16, fontWeight: 800, color: C.onAccent, background: C.accent, padding: "4px 12px", borderRadius: 100, letterSpacing: "-0.01em" }}>{rp(c.price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Sec>
  </>;
}

/* ════════════════ LANDING (Sales page — Figma-adapted layout) ════════════════ */
function Landing({ go, course, onBuy, enrolled }) {
  if (!course) return <Sec><p style={{ paddingTop: 80, textAlign: "center", color: C.muted }}>Course tidak ditemukan. <a onClick={() => go("catalog")} style={{ color: C.accentInk, cursor: "pointer" }}>Kembali ke katalog</a></p></Sec>;

  // Figma slate palette (used for Figma-adapted sections only)
  const S = { ink: "#0F172A", inkSoft: "#1E293B", body: "#334155", muted: "#64748B", line: "#CBD5E1", wash: "#F8FAFC", dark: "#0F172A", darkCard: "#1E293B", darkLine: "#475569" };
  const ACC = { green: "#22C55E", greenInk: "#15803D", greenWash: "#DCFCE7", blue: "#3B82F6", blueWash: "#DBEAFE", orange: "#F97316", orangeWash: "#FFEDD5", orangeSkin: "#FED7AA", blueSkin: "#BFDBFE" };

  const isExcel = course.title.toLowerCase().includes("excel");
  const heroHeadline = isExcel
    ? "82% Pekerjaan Membutuhkan Skill Microsoft Excel"
    : `Kuasai ${course.title}, Siap EXCEL-erate Karirmu!`;
  const heroSub = `Apakah kamu tahu bahwa mahir ${course.title.replace(" Mastery","").replace(" Pro","").replace(" Fundamentals","").replace(" Analytics","")} bisa menjadi aset besar untuk karir kamu?`;
  const heroBody = isExcel
    ? "Baik kamu mencari pekerjaan, ingin meningkatkan keterampilan, mengelola bisnis, atau menjadi freelancer, Excel sangat berguna! Di course ini, kamu juga akan memahami konsep data, hubungan antar data, dan visualisasi data."
    : `${course.desc}. Dibangun untuk fresh graduate, career switcher, hingga profesional yang ingin upgrade skill — dari dasar hingga siap pakai di industri.`;

  const whyCards = [
    { icon: I.chart, color: ACC.greenInk, bg: ACC.greenWash, title: "Materi Padat & Terus Diperbarui", body: "Konten yang ringkas dan selalu up-to-date." },
    { icon: I.settings, color: ACC.blue, bg: ACC.blueWash, title: "Automasi Data", body: "Pelajari cara menghemat waktu dan bekerja lebih cerdas dengan automasi data." },
    { icon: I.play, color: ACC.orange, bg: ACC.orangeWash, title: "Video Per Sesi", body: "Materi diajarkan melalui video dengan akses seumur hidup." },
    { icon: I.users, color: ACC.greenInk, bg: ACC.greenWash, title: "Grup Diskusi WA", body: "Bergabunglah dengan grup WA untuk diskusi, berbagi, dan tanya jawab." },
  ];

  const ebookPoints = [
    { title: "Belajar Mulai Dari Nol", body: "Kuasai dasar-dasar, termasuk memasukkan data, membuat rumus, dan memformat spreadsheet." },
    { title: "Data Visualization Mastery", body: "Buat visualisasi data yang menarik dan informatif dengan berbagai grafik, bagan, dan tips efektif." },
    { title: "Power Query & Power Pivot Mastery", body: "Kuasai dua alat canggih ini untuk menganalisis data dengan mudah dan cepat, termasuk impor, pembersihan data, dan pembuatan model data kompleks." },
  ];

  // Trim "Microsoft" prefix and trailing modifier words so audience copy reads naturally
  // "Microsoft Excel Mastery" → "Excel", "Power BI Analytics" → "Power BI", "Looker Studio" → "Looker Studio"
  const shortName = course.title
    .replace(/^Microsoft\s+/i, "")
    .replace(/\s+(Mastery|Pro|Fundamentals|Analytics)$/i, "")
    .trim();
  const audiencePoints = [
    `Ingin meningkatkan peluang kerja dengan menguasai ${shortName}.`,
    `Berambisi untuk meningkatkan skill ${shortName} di kantor dan menjadi lebih produktif.`,
    `Memiliki bisnis dan ingin memantau performa bisnis dengan lebih efektif menggunakan ${shortName}.`,
    `Ingin menjadi freelancer handal dan menghasilkan cuan dari keahlian ${shortName}.`,
  ];

  const scrollToWhy = () => document.getElementById("why-section")?.scrollIntoView({ behavior: "smooth" });

  return <>
    {/* ═══ HERO — pastel gradient + floating 3D boxes ═══ */}
    <section style={{ minHeight: 660, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 72px", textAlign: "center", position: "relative", overflow: "hidden", background: C.pastelHero }}>
      {/* Floating decorative boxes — echoes Figma's 3D orange cubes */}
      <div style={{ position: "absolute", top: "14%", left: "8%", width: 92, height: 92, borderRadius: 18, background: "linear-gradient(135deg,#F5C4A0,#E89968)", boxShadow: "0 24px 48px rgba(232,153,104,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(-15deg)", opacity: 0.9, zIndex: 0 }} />
      <div style={{ position: "absolute", top: "10%", right: "14%", width: 68, height: 68, borderRadius: 14, background: "linear-gradient(135deg,#FFE0C7,#F4B487)", boxShadow: "0 18px 36px rgba(244,180,135,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(18deg)", opacity: 0.85, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "18%", right: "9%", width: 76, height: 76, borderRadius: 18, background: "linear-gradient(135deg,#FFE8D4,#F5C4A0)", boxShadow: "0 22px 40px rgba(245,196,160,0.35), inset 0 2px 0 rgba(255,255,255,0.4)", transform: "rotate(-8deg)", opacity: 0.85, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "22%", left: "11%", width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#FFE8D4,#F5C4A0)", boxShadow: "0 16px 32px rgba(245,196,160,0.3)", opacity: 0.8, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Badge color={C.green}>Discount Launch 90% Terbatas</Badge>
        <h1 style={{ fontFamily: F.head, fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 800, color: S.ink, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 900, margin: "24px 0 20px" }}>
          {heroHeadline}
        </h1>
        <p style={{ fontFamily: F.head, fontSize: "clamp(16px,1.7vw,21px)", fontWeight: 600, color: S.ink, lineHeight: 1.3, maxWidth: 760, margin: "0 0 16px" }}>
          {heroSub}
        </p>
        <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.4vw,17px)", color: S.inkSoft, maxWidth: 760, margin: "0 0 36px", lineHeight: 1.6 }}>
          {heroBody}
        </p>

        {/* Pill CTAs — Figma shape, KERJA.ID neon accent */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {enrolled ? (
            <button onClick={() => go("lms", { courseId: course.id })} style={{ background: C.accent, color: C.onAccent, border: "none", padding: "18px 40px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 28px rgba(200,255,0,0.4)" }}>
              Lanjut Belajar {I.arrow}
            </button>
          ) : (
            <button onClick={onBuy} style={{ background: C.accent, color: C.onAccent, border: "none", padding: "18px 40px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 28px rgba(200,255,0,0.4)" }}>
              Mulai Sekarang {I.arrow}
            </button>
          )}
          <button onClick={scrollToWhy} style={{ background: "#FFFFFF", color: S.ink, border: `1.5px solid ${S.ink}`, padding: "16px 38px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Kenapa Pilih Course Ini?
          </button>
        </div>

        {/* Partners */}
        <div style={{ marginTop: 56 }}>
          <p style={{ fontFamily: F.body, fontSize: 12, color: C.dim, marginBottom: 16 }}>Mentor berpengalaman yang bekerja sama dengan:</p>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", opacity: 0.45 }}>
            {PARTNERS.map(p => <span key={p} style={{ fontFamily: F.head, fontSize: 14, fontWeight: 600, color: C.muted }}>{p}</span>)}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ KENAPA PILIH COURSE INI? — 4 feature cards ═══ */}
    <section id="why-section" style={{ background: "linear-gradient(180deg,#F1F5F9 0%,#E2E8F0 100%)", padding: "90px 24px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1246, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 12px" }}>
            Kenapa Kamu Harus Pilih Course Ini?
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.4vw,18px)", color: S.inkSoft, lineHeight: 1.5, maxWidth: 820, margin: "0 auto" }}>
            Bukan sekadar video tutorial. Kamu dapat struktur, studi kasus, dan akses selamanya — semua yang dibutuhkan untuk benar-benar menguasai skill ini.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {whyCards.map((card, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: "30px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: F.head, fontSize: 18, fontWeight: 600, color: S.ink, lineHeight: 1.3, margin: "6px 0 0" }}>{card.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: 14, color: S.body, lineHeight: 1.5, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ LEBIH DARI SEKEDAR COURSE / E-BOOK GRATIS ═══ */}
    <section style={{ background: "#FFFFFF", padding: "90px 24px" }}>
      <div style={{ maxWidth: 1246, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 40, alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 14px" }}>
            Lebih dari Sekedar Course
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.4vw,18px)", color: S.body, lineHeight: 1.55, margin: "0 0 32px" }}>
            Dapatkan 3 e-book gratis sebagai panduan lengkap — mulai dari dasar hingga advanced — langsung setelah kamu daftar.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ebookPoints.map((p, i) => (
              <div key={i} style={{ background: S.wash, border: `1px solid ${S.line}`, borderRadius: 16, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: ACC.greenWash, color: ACC.greenInk, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.check}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.head, fontSize: 17, fontWeight: 600, color: S.ink, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: 14, color: S.body, lineHeight: 1.5 }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Illustration: 3-stacked books (CSS only) */}
        <div style={{ background: ACC.orangeSkin, borderRadius: 24, minHeight: 480, position: "relative", overflow: "hidden" }}>
          <BookShape left="14%" top="16%" w={210} h={270} grad="linear-gradient(160deg,#86EFAC,#22C55E)" spine="#15803D" rotate={-18} shadow="rgba(21,128,61,0.4)" />
          <BookShape left="32%" top="22%" w={210} h={270} grad="linear-gradient(160deg,#93C5FD,#3B82F6)" spine="#1E40AF" rotate={12} shadow="rgba(30,58,138,0.4)" />
          <BookShape left="50%" top="28%" w={210} h={270} grad="linear-gradient(160deg,#FED7AA,#F97316)" spine="#9A3412" rotate={-6} shadow="rgba(124,45,18,0.4)" />
        </div>
      </div>
    </section>

    {/* ═══ UNTUK SIAPA COURSE INI? — dark slate band with dot pattern ═══ */}
    <section style={{ background: S.dark, padding: "90px 24px", position: "relative", backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.05) 1.2px,transparent 1.2px)", backgroundSize: "32px 32px" }}>
      <div style={{ maxWidth: 1246, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 40, alignItems: "center" }}>
        {/* Q-mark illustration */}
        <div style={{ background: ACC.blueSkin, borderRadius: 24, minHeight: 480, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "14%", right: "14%", fontFamily: F.head, fontSize: 130, fontWeight: 800, color: ACC.blue, opacity: 0.45, transform: "rotate(15deg)", lineHeight: 1 }}>?</div>
          <div style={{ position: "absolute", bottom: "18%", left: "10%", fontFamily: F.head, fontSize: 90, fontWeight: 800, color: ACC.blue, opacity: 0.3, transform: "rotate(-12deg)", lineHeight: 1 }}>?</div>
          <div style={{ fontFamily: F.head, fontSize: 300, fontWeight: 900, color: "#FFFFFF", lineHeight: 1, textShadow: "0 16px 48px rgba(59,130,246,0.55)", letterSpacing: "-0.05em" }}>?</div>
        </div>
        <div>
          <h2 style={{ fontFamily: F.head, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 32px" }}>
            Untuk Siapa Course ini dibuat?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {audiencePoints.map((p, i) => (
              <div key={i} style={{ background: S.darkCard, border: `1px solid ${S.darkLine}`, borderRadius: 16, padding: 20, fontFamily: F.body, fontSize: 16, color: "#FFFFFF", lineHeight: 1.5 }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ ISI COURSE — lesson list ═══ */}
    <Sec>
      <STitle title="Isi Course" />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", maxWidth: 640, margin: "0 auto" }}>
        {course.lessons?.slice(0, 8).map((ls, i) => (
          <div key={ls.id} style={{ padding: "14px 20px", borderBottom: i < 7 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: C.bg3, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: F.mono, fontSize: 11, fontWeight: 700 }}>{i + 1}</div>
            <span style={{ flex: 1, fontFamily: F.body, fontSize: 14, color: C.text }}>{ls.title}</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.dim, display: "flex", alignItems: "center", gap: 4 }}>{I.clock} {ls.dur}</span>
          </div>
        ))}
        {course.lessons?.length > 8 && (
          <div style={{ padding: "14px 20px", textAlign: "center", background: C.bg2 }}>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: C.muted }}>+ {course.lessons.length - 8} lessons lagi</span>
          </div>
        )}
      </div>
    </Sec>

    {/* ═══ PRICE CARD — dark + neon (KERJA.ID signature) ═══ */}
    <Sec>
      <div style={{ background: C.dark, borderRadius: 28, padding: "48px 40px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: C.shadowLg }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(200,255,0,0.18), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, left: -60, width: 180, height: 180, borderRadius: "50%", background: C.accent, opacity: 0.18, filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: C.accent, opacity: 0.12, filter: "blur(50px)" }} />
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.darkMuted, marginBottom: 8, position: "relative" }}>Mentor 5+ tahun, investasi belajar Rp 20.000.000+, hanya dengan harga...</p>
        <div style={{ fontFamily: F.head, fontSize: 22, color: "#555", textDecoration: "line-through", marginBottom: 4, position: "relative" }}>{rp(course.oldPrice)}</div>
        <div style={{ fontFamily: F.head, fontSize: 52, fontWeight: 800, color: C.accent, letterSpacing: "-0.04em", marginBottom: 8, position: "relative", textShadow: "0 0 40px rgba(200,255,0,0.4)" }}>{rp(course.price)}</div>
        <div style={{ position: "relative" }}><Badge color={C.pink}>Discount 90% Terbatas</Badge></div>
        <div style={{ marginTop: 28, position: "relative" }}>
          {enrolled ? (
            <Btn accent onClick={() => go("lms", { courseId: course.id })} style={{ fontSize: 17, padding: "16px 40px" }}>Lanjut Belajar {I.arrow}</Btn>
          ) : (
            <Btn accent onClick={onBuy} style={{ fontSize: 17, padding: "16px 40px" }}>Daftar & Join Sekarang {I.arrow}</Btn>
          )}
        </div>
      </div>
    </Sec>
  </>;
}

// Small CSS book illustration for the E-Book Gratis section
function BookShape({ left, top, w, h, grad, spine, rotate, shadow }) {
  return (
    <div style={{ position: "absolute", left, top, width: w, height: h, borderRadius: 18, background: grad, boxShadow: `0 24px 56px ${shadow}, inset 0 2px 0 rgba(255,255,255,0.3)`, transform: `rotate(${rotate}deg)` }}>
      <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 32, height: 62, background: spine, borderRadius: "0 0 6px 6px" }} />
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 10, pointerEvents: "none" }} />
    </div>
  );
}

/* ════════════════ LOGIN ════════════════ */
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) { setErr("Masukkan email yang valid."); return; }
    // Parent (App) handles navigation after login to avoid stale-state gate checks.
    onLogin({ email: em, name: name.trim() || em.split("@")[0], createdAt: new Date().toISOString() });
  };
  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, background: C.pastelHero, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <form onSubmit={submit} style={{ background: C.card, borderRadius: 20, padding: 36, maxWidth: 420, width: "100%", margin: "40px 20px", boxShadow: C.shadowLg, border: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
            <span style={{ fontFamily: F.head, fontWeight: 900, fontSize: 22, color: C.text, letterSpacing: "-0.04em" }}>KERJA</span>
            <span style={{ background: C.accent, color: C.onAccent, fontFamily: F.head, fontWeight: 900, fontSize: 15, padding: "4px 10px", borderRadius: 8, letterSpacing: "-0.02em", transform: "skewX(-8deg)", display: "inline-block" }}>ID</span>
          </div>
          <h1 style={{ fontFamily: F.head, fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Selamat datang</h1>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.muted, margin: 0 }}>Masuk dengan email untuk mulai belajar.</p>
        </div>
        <FormField label="Email">
          <Input type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
        </FormField>
        <FormField label="Nama (opsional)">
          <Input value={name} onChange={setName} placeholder="Nama kamu" />
        </FormField>
        {err && <div style={{ background: `${C.red}12`, border: `1px solid ${C.red}30`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: F.body, fontSize: 12, color: C.red }}>{err}</div>}
        <Btn primary type="submit" style={{ width: "100%", justifyContent: "center" }}>Masuk / Daftar</Btn>
        <div style={{ marginTop: 14, padding: "10px 14px", background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, fontFamily: F.mono, fontSize: 11, color: C.accentInk, textAlign: "center" }}>
          Demo mode — password tidak diperlukan.
        </div>
      </form>
    </div>
  );
}

/* ════════════════ CHECKOUT (Mock Indonesian payment) ════════════════ */
function Checkout({ go, course, user, settings, onPaid }) {
  const [method, setMethod] = useState("bca-va");
  const [stage, setStage] = useState("form"); // form | processing | paid
  const [countdown, setCountdown] = useState(0);

  if (!course) return <Sec><p style={{ paddingTop: 80, textAlign: "center" }}>Course tidak ditemukan.</p></Sec>;

  const pay = () => {
    setStage("processing");
    setCountdown(3);
    const t = setInterval(() => {
      setCountdown(n => {
        if (n <= 1) { clearInterval(t); setStage("paid"); return 0; }
        return n - 1;
      });
    }, 1000);
  };

  const complete = () => {
    onPaid({
      id: uid(),
      userEmail: user.email,
      courseId: course.id,
      amount: course.price,
      method,
      gateway: settings.gateway,
      purchasedAt: new Date().toISOString(),
      status: "Paid",
      completedLessons: [],
    });
    go("lms", { courseId: course.id });
  };

  const methods = [];
  if (settings.methods.va) methods.push({ id: "bca-va", label: "BCA Virtual Account", sub: "Bayar via ATM / m-Banking BCA", badge: "VA" });
  if (settings.methods.va) methods.push({ id: "mandiri-va", label: "Mandiri Virtual Account", sub: "Bayar via Livin' by Mandiri", badge: "VA" });
  if (settings.methods.va) methods.push({ id: "bni-va", label: "BNI Virtual Account", sub: "Bayar via BNI Mobile", badge: "VA" });
  if (settings.methods.qris) methods.push({ id: "qris", label: "QRIS", sub: "Scan QR pakai semua e-wallet", badge: "QRIS" });
  if (settings.methods.ewallet) methods.push({ id: "gopay", label: "GoPay", sub: "Bayar pakai GoPay", badge: "E-WALLET" });
  if (settings.methods.ewallet) methods.push({ id: "ovo", label: "OVO", sub: "Bayar pakai OVO", badge: "E-WALLET" });
  if (settings.methods.ewallet) methods.push({ id: "dana", label: "DANA", sub: "Bayar pakai DANA", badge: "E-WALLET" });
  if (settings.methods.ewallet) methods.push({ id: "shopeepay", label: "ShopeePay", sub: "Bayar pakai ShopeePay", badge: "E-WALLET" });
  if (settings.methods.retail) methods.push({ id: "alfamart", label: "Alfamart", sub: "Bayar tunai di Alfamart", badge: "RETAIL" });
  if (settings.methods.retail) methods.push({ id: "indomaret", label: "Indomaret", sub: "Bayar tunai di Indomaret", badge: "RETAIL" });
  if (settings.methods.card) methods.push({ id: "card", label: "Kartu Kredit/Debit", sub: "Visa, Mastercard, JCB", badge: "CARD" });

  const gwLabel = { lynk: "Lynk.id", midtrans: `Midtrans (${settings.midtransMode})`, xendit: "Xendit", mock: "Mock Gateway" }[settings.gateway];

  const S = { ink: "#0F172A", inkSoft: "#1E293B", body: "#334155", muted: "#64748B", line: "#CBD5E1", wash: "#F8FAFC" };
  const ACC = { green: "#22C55E", greenInk: "#15803D", greenWash: "#DCFCE7", blue: "#3B82F6", blueWash: "#DBEAFE", orange: "#F97316", orangeWash: "#FFEDD5" };

  // group methods by badge
  const groups = methods.reduce((g, m) => { (g[m.badge] ||= []).push(m); return g; }, {});
  const groupOrder = ["VA", "QRIS", "E-WALLET", "RETAIL", "CARD"];
  const groupLabels = { VA: "Virtual Account", QRIS: "QRIS", "E-WALLET": "E-Wallet", RETAIL: "Retail / Minimarket", CARD: "Kartu Kredit / Debit" };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, background: S.wash, paddingBottom: 80 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => go("landing", { courseId: course.id })} style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, padding: "8px 16px", borderRadius: 100, color: S.body, fontFamily: F.body, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Kembali ke course
          </button>
        </div>

        {stage === "paid" ? (
          <div style={{ background: "#FFFFFF", borderRadius: 28, padding: 56, textAlign: "center", maxWidth: 560, margin: "40px auto", border: `1px solid ${S.line}`, boxShadow: "0 30px 60px rgba(15,23,42,0.08)" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: ACC.greenWash, color: ACC.greenInk, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style={{ display: "inline-block", fontFamily: F.body, fontSize: 11, fontWeight: 700, color: ACC.greenInk, background: ACC.greenWash, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Success</span>
            <h2 style={{ fontFamily: F.head, fontSize: 30, fontWeight: 800, color: S.ink, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Pembayaran berhasil!</h2>
            <p style={{ fontFamily: F.body, fontSize: 15, color: S.body, margin: "0 0 28px", lineHeight: 1.55 }}>Kamu sudah terdaftar di <strong style={{ color: S.ink }}>{course.title}</strong>. Akses selamanya siap dipakai.</p>
            <div style={{ background: S.wash, border: `1px solid ${S.line}`, borderRadius: 16, padding: 18, marginBottom: 22, fontFamily: F.mono, fontSize: 12, color: S.muted, textAlign: "left", display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Order ID</span><strong style={{ color: S.ink }}>{uid().toUpperCase()}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Amount</span><strong style={{ color: S.ink }}>{rp(course.price)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Method</span><strong style={{ color: S.ink }}>{methods.find(m => m.id === method)?.label}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Gateway</span><strong style={{ color: S.ink }}>{gwLabel}</strong></div>
            </div>
            <button onClick={complete} style={{ width: "100%", background: C.accent, color: C.onAccent, border: "none", padding: "18px 28px", borderRadius: 100, fontFamily: F.head, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 10px 28px rgba(200,255,0,0.4)" }}>
              Mulai Belajar {I.arrow}
            </button>
          </div>
        ) : stage === "processing" ? (
          <div style={{ background: "#FFFFFF", borderRadius: 28, padding: 56, textAlign: "center", maxWidth: 520, margin: "40px auto", border: `1px solid ${S.line}`, boxShadow: "0 30px 60px rgba(15,23,42,0.08)" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "transparent", border: `4px solid ${S.line}`, borderTopColor: S.ink, margin: "0 auto 22px", animation: "spin 0.9s linear infinite" }} />
            <h2 style={{ fontFamily: F.head, fontSize: 24, fontWeight: 800, color: S.ink, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Memproses pembayaran…</h2>
            <p style={{ fontFamily: F.body, fontSize: 14, color: S.body, margin: 0 }}>Mohon tunggu <strong style={{ color: S.ink }}>{countdown}s</strong> · via {gwLabel}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
            <div>
              <span style={{ display: "inline-block", fontFamily: F.body, fontSize: 11, fontWeight: 700, color: ACC.greenInk, background: ACC.greenWash, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Checkout</span>
              <h1 style={{ fontFamily: F.head, fontSize: 34, fontWeight: 800, color: S.ink, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Selangkah lagi, {user?.email?.split("@")[0] || "kamu"}!</h1>
              <p style={{ fontFamily: F.body, fontSize: 14, color: S.body, marginBottom: 24, lineHeight: 1.55 }}>Pilih metode pembayaran pilihan kamu. Semua transaksi diproses secara aman.</p>

              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: 24, marginBottom: 16 }}>
                {methods.length === 0 ? (
                  <div style={{ padding: 32, textAlign: "center", color: S.muted, fontFamily: F.body, fontSize: 14 }}>
                    Belum ada metode pembayaran aktif. Admin perlu mengaktifkan di Settings.
                  </div>
                ) : groupOrder.filter(g => groups[g]).map(g => (
                  <div key={g} style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{groupLabels[g]}</div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {groups[g].map(m => {
                        const selected = method === m.id;
                        return (
                          <label key={m.id} onClick={() => setMethod(m.id)} style={{
                            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                            borderRadius: 16,
                            border: `1px solid ${selected ? S.ink : S.line}`,
                            background: selected ? S.wash : "#FFFFFF",
                            cursor: "pointer", transition: "all 0.15s",
                          }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? S.ink : S.line}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: S.ink }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, color: S.ink }}>{m.label}</div>
                              <div style={{ fontFamily: F.body, fontSize: 12, color: S.muted }}>{m.sub}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 16, padding: "14px 18px", fontFamily: F.body, fontSize: 12, color: S.body, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACC.green, flexShrink: 0 }} />
                Gateway aktif: <strong style={{ color: S.ink }}>{gwLabel}</strong>
                {settings.gateway === "mock" && <span style={{ color: ACC.orange, fontWeight: 600 }}> — mode demo, tidak ada transaksi nyata.</span>}
              </div>
            </div>

            <div>
              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: 24, position: "sticky", top: 100, boxShadow: "0 20px 40px rgba(15,23,42,0.06)" }}>
                <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Order Summary</div>
                <div style={{ display: "flex", gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${S.line}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: ACC.greenWash, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{course.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, color: S.ink, lineHeight: 1.3 }}>{course.title}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: S.muted, marginTop: 4 }}>{course.modules} modul · {course.hours} jam</div>
                  </div>
                </div>
                {course.oldPrice && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: F.body, fontSize: 13, color: S.muted }}>
                      <span>Harga normal</span><span style={{ textDecoration: "line-through" }}>{rp(course.oldPrice)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: F.body, fontSize: 13, color: ACC.greenInk, fontWeight: 700 }}>
                      <span>Diskon</span><span>-{rp(course.oldPrice - course.price)}</span>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 16, borderTop: `1px solid ${S.line}`, marginBottom: 20 }}>
                  <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: S.body }}>Total</span>
                  <span style={{ fontFamily: F.head, fontSize: 26, fontWeight: 800, color: S.ink, letterSpacing: "-0.02em" }}>{rp(course.price)}</span>
                </div>
                <button onClick={pay} disabled={methods.length === 0} style={{
                  width: "100%",
                  background: methods.length === 0 ? S.line : C.accent,
                  color: methods.length === 0 ? S.muted : C.onAccent,
                  border: "none", padding: "16px 24px", borderRadius: 100,
                  fontFamily: F.head, fontSize: 15, fontWeight: 700,
                  cursor: methods.length === 0 ? "not-allowed" : "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: methods.length === 0 ? "none" : "0 10px 28px rgba(200,255,0,0.4)",
                  transition: "all 0.15s",
                }}>
                  Bayar Sekarang {I.arrow}
                </button>
                <div style={{ marginTop: 14, fontFamily: F.body, fontSize: 11, color: S.muted, textAlign: "center" }}>
                  Masuk sebagai <strong style={{ color: S.ink }}>{user.email}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════ MY LEARNING ════════════════ */
function MyLearning({ go, user, courses, enrollments }) {
  const S = { ink: "#0F172A", inkSoft: "#1E293B", body: "#334155", muted: "#64748B", line: "#CBD5E1", wash: "#F8FAFC" };
  const ACC = { green: "#22C55E", greenInk: "#15803D", greenWash: "#DCFCE7", blue: "#3B82F6", blueWash: "#DBEAFE", orange: "#F97316", orangeWash: "#FFEDD5" };

  const myEnrollments = enrollments.filter(e => e.userEmail === user?.email);

  // stats
  const totalCourses = myEnrollments.length;
  const totalHours = myEnrollments.reduce((sum, en) => {
    const c = courses.find(c => c.id === en.courseId); return sum + (c?.hours || 0);
  }, 0);
  const completedLessons = myEnrollments.reduce((sum, en) => sum + (en.completedLessons?.length || 0), 0);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: S.wash }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, margin: "20px 0 32px" }}>
          <div>
            <span style={{ display: "inline-block", fontFamily: F.body, fontSize: 11, fontWeight: 700, color: ACC.greenInk, background: ACC.greenWash, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>My Learning</span>
            <h1 style={{ fontFamily: F.head, fontSize: 38, fontWeight: 800, color: S.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Selamat datang kembali, {user?.email?.split("@")[0] || "kamu"}!</h1>
            <p style={{ fontFamily: F.body, fontSize: 15, color: S.body, margin: 0 }}>Lanjutkan belajar di course yang sudah kamu beli.</p>
          </div>
          {totalCourses > 0 && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 16, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: F.head, fontSize: 22, fontWeight: 800, color: S.ink, letterSpacing: "-0.02em" }}>{totalCourses}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: S.muted, fontWeight: 600 }}>Course</div>
              </div>
              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 16, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: F.head, fontSize: 22, fontWeight: 800, color: S.ink, letterSpacing: "-0.02em" }}>{totalHours}j</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: S.muted, fontWeight: 600 }}>Total materi</div>
              </div>
              <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 16, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: F.head, fontSize: 22, fontWeight: 800, color: ACC.greenInk, letterSpacing: "-0.02em" }}>{completedLessons}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: S.muted, fontWeight: 600 }}>Lesson selesai</div>
              </div>
            </div>
          )}
        </div>

        {myEnrollments.length === 0 ? (
          <div style={{ background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 28, padding: 64, textAlign: "center", maxWidth: 560, margin: "40px auto" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: ACC.blueWash, color: ACC.blue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", transform: "scale(1.4)" }}>{I.book}</div>
            <h3 style={{ fontFamily: F.head, fontSize: 22, fontWeight: 800, color: S.ink, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Belum ada course</h3>
            <p style={{ fontFamily: F.body, fontSize: 14, color: S.body, margin: "0 0 24px", lineHeight: 1.55 }}>Yuk pilih skill yang mau kamu kuasai. Ada {courses.length} course siap kamu mulai.</p>
            <button onClick={() => go("catalog")} style={{ background: C.accent, color: C.onAccent, border: "none", padding: "14px 28px", borderRadius: 100, fontFamily: F.head, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 28px rgba(200,255,0,0.4)" }}>
              Lihat Katalog {I.arrow}
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {myEnrollments.map((en, i) => {
              const course = courses.find(c => c.id === en.courseId);
              if (!course) return null;
              const progress = course.lessons?.length ? Math.round(((en.completedLessons?.length || 0) / course.lessons.length) * 100) : 0;
              const accentWash = [ACC.greenWash, ACC.blueWash, ACC.orangeWash][i % 3];
              const isComplete = progress === 100;
              return (
                <div key={en.id} onClick={() => go("lms", { courseId: course.id })} style={{
                  background: "#FFFFFF", border: `1px solid ${S.line}`, borderRadius: 24, padding: 24,
                  cursor: "pointer", transition: "all 0.25s", display: "flex", flexDirection: "column", gap: 16,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.ink; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(15,23,42,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = S.line; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 18, background: accentWash, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{course.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: F.head, fontSize: 16, fontWeight: 700, color: S.ink, lineHeight: 1.3 }}>{course.title}</div>
                      <div style={{ fontFamily: F.body, fontSize: 12, color: S.muted, marginTop: 2 }}>{course.modules} modul · {course.hours} jam</div>
                    </div>
                    {isComplete && (
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: ACC.greenWash, color: ACC.greenInk, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
                      <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: S.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Progress</span>
                      <span style={{ fontFamily: F.head, fontSize: 14, color: isComplete ? ACC.greenInk : S.ink, fontWeight: 800 }}>{progress}%</span>
                    </div>
                    <div style={{ height: 8, background: S.wash, border: `1px solid ${S.line}`, borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ width: `${progress}%`, height: "100%", background: isComplete ? ACC.green : C.accent, borderRadius: 100, transition: "width 0.3s" }} />
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); go("lms", { courseId: course.id }); }} style={{
                    width: "100%", background: S.ink, color: "#FFFFFF", border: "none",
                    padding: "12px 20px", borderRadius: 100,
                    fontFamily: F.head, fontSize: 13, fontWeight: 700, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    {isComplete ? "Review" : "Lanjut Belajar"} {I.arrow}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════ LMS (Course Player, gated) ════════════════ */
function LMS({ go, user, course, enrollment, onProgress }) {
  const [sidebar, setSidebar] = useState(true);
  const lessons = course?.lessons || [];
  const completed = new Set(enrollment?.completedLessons || []);
  const firstActive = lessons.find(l => !completed.has(l.id) && !l.locked) || lessons[0];
  const [active, setActive] = useState(firstActive);

  // Keep "active" in sync if course changes
  useEffect(() => {
    const next = lessons.find(l => !completed.has(l.id) && !l.locked) || lessons[0];
    setActive(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id]);

  if (!course) return null;
  const progress = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;

  const markComplete = () => {
    if (!active) return;
    if (completed.has(active.id)) return;
    const next = [...(enrollment.completedLessons || []), active.id];
    onProgress(next);
    // auto-advance
    const i = lessons.indexOf(active);
    const nl = lessons.slice(i + 1).find(l => !l.locked);
    if (nl) setActive(nl);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ width: sidebar ? 340 : 0, flexShrink: 0, overflow: "hidden", background: C.bg2, borderRight: `1px solid ${C.border}`, transition: "width 0.3s", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${course.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{course.icon}</div>
            <div>
              <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 600, color: C.text }}>{course.title}</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.muted }}>{course.modules} modul · {course.hours} jam</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: F.body, fontSize: 11, color: C.muted }}>Progress</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.accentInk, fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: C.bg4, borderRadius: 2 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: C.accent, borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {lessons.map((ls, i) => {
            const isDone = completed.has(ls.id);
            const isActive = active?.id === ls.id;
            return (
              <div key={ls.id} onClick={() => !ls.locked && setActive(ls)} style={{
                padding: "12px 20px", cursor: ls.locked ? "not-allowed" : "pointer",
                background: isActive ? C.accentBg : "transparent",
                borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                display: "flex", alignItems: "center", gap: 12, opacity: ls.locked ? 0.4 : 1, transition: "all 0.15s",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: isDone ? C.accent : C.bg4, display: "flex", alignItems: "center", justifyContent: "center", color: isDone ? C.onAccent : C.muted, fontSize: 11 }}>
                  {isDone ? I.check : ls.locked ? I.lock : <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{i+1}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: isActive ? 700 : 400, color: isActive ? C.text : isDone ? C.text : C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ls.title}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.dim, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>{I.clock} {ls.dur}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", aspectRatio: "16/9", maxHeight: "55vh", background: "#000", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ position: "absolute", top: 16, left: 16, zIndex: 2, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#fff" }}>{I.menu}</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.accent, color: C.onAccent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", cursor: "pointer", boxShadow: "0 8px 32px rgba(200,255,0,0.5), 0 0 0 8px rgba(200,255,0,0.15)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 4 20 12 8 20"/></svg>
            </div>
            <div style={{ fontFamily: F.head, fontSize: 16, fontWeight: 600, color: "#fff" }}>{active?.title}</div>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{active?.dur}</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: F.head, fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", margin: 0 }}>{active?.title}</h2>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.muted, marginTop: 4 }}>Lesson {lessons.indexOf(active)+1} of {lessons.length} · {active?.dur}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn small onClick={() => { const i = lessons.indexOf(active); if(i > 0) setActive(lessons[i-1]); }}>← Prev</Btn>
              <Btn small primary onClick={() => { const i = lessons.indexOf(active); if(i < lessons.length-1 && !lessons[i+1].locked) setActive(lessons[i+1]); }}>Next →</Btn>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
            {["Overview","Materials","Discussion","Notes"].map((tab,i) => (
              <button key={tab} style={{ background: "none", border: "none", padding: "10px 20px", fontFamily: F.body, fontSize: 13, fontWeight: i===0 ? 700 : 500, cursor: "pointer", color: i===0 ? C.text : C.muted, borderBottom: i===0 ? `2px solid ${C.accent}` : "2px solid transparent" }}>{tab}</button>
            ))}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
            <h3 style={{ fontFamily: F.head, fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 12px" }}>Tentang Lesson Ini</h3>
            <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>
              Di lesson ini kamu akan belajar tentang <strong style={{ color: C.text }}>{active?.title}</strong>. Materi mencakup konsep dasar, contoh penggunaan di dunia kerja, dan latihan praktis.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <Btn small accent onClick={markComplete} disabled={completed.has(active?.id)}>
                {completed.has(active?.id) ? <>Completed {I.check}</> : <>Mark as Complete {I.check}</>}
              </Btn>
              <Btn small>Download Materials</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ LMS GATE (non-enrolled user) ════════════════ */
function LmsGate({ go, course, user }) {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, background: C.bg2, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 40, maxWidth: 480, margin: "40px 20px", textAlign: "center", boxShadow: C.shadowLg, border: `1px solid ${C.border}` }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: `${course.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 16px" }}>{course.icon}</div>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{I.lock}</div>
        <h2 style={{ fontFamily: F.head, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Kamu belum daftar course ini</h2>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, margin: "0 0 24px" }}>Beli <strong style={{ color: C.text }}>{course.title}</strong> untuk akses semua lesson seumur hidup.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Btn onClick={() => go("landing", { courseId: course.id })}>Lihat Detail</Btn>
          <Btn primary onClick={() => go("checkout", { courseId: course.id })}>Beli Sekarang {I.arrow}</Btn>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ ADMIN LOGIN ════════════════ */
function AdminLogin({ onAuth, go }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onAuth(true); setErr(""); }
    else { setErr("Password salah. Coba: admin123"); }
  };
  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, background: C.dark, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <form onSubmit={submit} style={{ background: C.darkBg2, borderRadius: 20, padding: 36, maxWidth: 420, width: "100%", margin: "40px 20px", border: `1px solid ${C.darkBorder}` }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: C.accent, color: C.onAccent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{I.settings}</div>
          <h1 style={{ fontFamily: F.head, fontSize: 22, fontWeight: 700, color: C.darkText, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Admin Panel</h1>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.darkMuted, margin: 0 }}>Masukkan password untuk melanjutkan.</p>
        </div>
        <FormField label={<span style={{ color: C.darkMuted }}>Password</span>}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" style={{
            width: "100%", background: C.dark, border: `1px solid ${C.darkBorder}`, borderRadius: 10, padding: "11px 14px",
            fontFamily: F.mono, fontSize: 13, color: C.darkText, outline: "none", boxSizing: "border-box",
          }} autoFocus />
        </FormField>
        {err && <div style={{ background: `${C.red}20`, border: `1px solid ${C.red}40`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: F.body, fontSize: 12, color: "#FF8A87" }}>{err}</div>}
        <Btn accent type="submit" style={{ width: "100%", justifyContent: "center" }}>Masuk sebagai Admin</Btn>
        <button type="button" onClick={() => go("home")} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: C.darkMuted, fontFamily: F.body, fontSize: 12, cursor: "pointer", padding: 10 }}>← Kembali</button>
      </form>
    </div>
  );
}

/* ════════════════ ADMIN ════════════════ */
const emptyCourse = () => ({ id: Date.now(), title: "", desc: "", students: 0, rating: 4.9, modules: 8, hours: 6, price: 99000, oldPrice: 999000, icon: "📚", color: "#4285F4", lessons: lessonTemplate("Course") });

function Admin({ courses, setCourses, enrollments, settings, setSettings, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(null); // course or null
  const [confirmDel, setConfirmDel] = useState(null);

  const orders = enrollments.slice().sort((a,b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
  const totalRevenue = orders.reduce((s,o) => s + (o.amount || 0), 0);
  const stats = [
    { label: "Total Students", value: new Set(orders.map(o => o.userEmail)).size.toLocaleString(), change: "+"+orders.length, icon: I.users, color: C.accentInk },
    { label: "Revenue", value: totalRevenue > 1000000 ? `Rp ${(totalRevenue/1000000).toFixed(1)}M` : rp(totalRevenue), change: orders.length ? "+"+orders.length : "0", icon: I.dollar, color: C.green },
    { label: "Active Courses", value: String(courses.length), change: "0", icon: I.book, color: C.blue },
    { label: "Completion Rate", value: (() => {
      const arr = orders.filter(o => { const c = courses.find(x => x.id === o.courseId); return c?.lessons?.length; });
      if (!arr.length) return "—";
      const pct = arr.reduce((s,o) => { const c = courses.find(x => x.id === o.courseId); return s + ((o.completedLessons?.length || 0) / c.lessons.length); }, 0) / arr.length * 100;
      return pct.toFixed(0) + "%";
    })(), change: "+5%", icon: I.trophy, color: C.orange },
  ];
  const sideItems = [["overview","Overview",I.home],["courses","Courses",I.book],["students","Students",I.users],["analytics","Analytics",I.chart],["settings","Settings",I.settings]];

  const saveCourse = (c) => {
    setCourses(prev => {
      const exists = prev.find(p => p.id === c.id);
      if (exists) return prev.map(p => p.id === c.id ? c : p);
      return [...prev, c];
    });
    setEditing(null);
  };
  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(p => p.id !== id));
    setConfirmDel(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ width: 220, flexShrink: 0, background: C.bg2, borderRight: `1px solid ${C.border}`, padding: "20px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${C.border}`, marginBottom: 8 }}>
          <div style={{ fontFamily: F.head, fontSize: 13, fontWeight: 800, color: C.accentInk, letterSpacing: "0.08em" }}>ADMIN PANEL</div>
          <div style={{ fontFamily: F.body, fontSize: 11, color: C.dim, marginTop: 4 }}>{settings.siteName.toLowerCase()} dashboard</div>
        </div>
        {sideItems.map(([id,l,ic]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: tab===id ? C.accentBg : "none", border: "none", borderLeft: tab===id ? `3px solid ${C.accent}` : "3px solid transparent", cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: tab===id ? 700 : 500, color: tab===id ? C.text : C.muted, width: "100%", textAlign: "left" }}>{ic} {l}</button>
        ))}
        <div style={{ marginTop: "auto", padding: "16px" }}>
          <button onClick={onLogout} style={{ width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.muted, fontFamily: F.body, fontSize: 12, cursor: "pointer" }}>Log Out Admin</button>
        </div>
      </div>
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <h1 style={{ fontFamily: F.head, fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", margin: "0 0 4px" }}>
          {tab === "overview" ? "Dashboard Overview" : tab.charAt(0).toUpperCase() + tab.slice(1)}
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.muted, marginBottom: 24 }}>
          {tab === "overview" ? `Welcome back. ${orders.length} order${orders.length !== 1 ? "s" : ""} so far.` : `Manage your ${tab}.`}
        </p>

        {tab === "overview" && <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {stats.map((s,i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ color: s.color, opacity: 0.8 }}>{s.icon}</div>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: s.change.startsWith("+") ? C.green : C.muted }}>{s.change}</span>
                </div>
                <div style={{ fontFamily: F.head, fontSize: 24, fontWeight: 700, color: C.text }}>{s.value}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.dim, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontFamily: F.head, fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>Recent Orders</h3>
            {orders.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: C.muted, fontFamily: F.body, fontSize: 13 }}>
                Belum ada order. Orders akan muncul di sini setelah user melakukan pembelian.
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Student","Course","Amount","Date","Gateway","Status"].map(h => <th key={h} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 500, color: C.dim, padding: "8px 12px", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {orders.slice(0, 10).map(o => {
                    const c = courses.find(x => x.id === o.courseId);
                    return (
                      <tr key={o.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: C.text, padding: "12px" }}>{o.userEmail}</td>
                        <td style={{ fontFamily: F.body, fontSize: 13, color: C.muted, padding: "12px" }}>{c?.title || "—"}</td>
                        <td style={{ fontFamily: F.mono, fontSize: 13, color: C.text, padding: "12px" }}>{rp(o.amount)}</td>
                        <td style={{ fontFamily: F.body, fontSize: 12, color: C.dim, padding: "12px" }}>{fmtDate(o.purchasedAt)}</td>
                        <td style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, padding: "12px" }}>{o.gateway}</td>
                        <td style={{ padding: "12px" }}><span style={{ fontFamily: F.mono, fontSize: 11, padding: "3px 10px", borderRadius: 6, background: o.status==="Paid" ? `${C.green}15` : `${C.orange}15`, color: o.status==="Paid" ? C.green : C.orange }}>{o.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>}

        {tab === "courses" && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.muted }}>{courses.length} course{courses.length !== 1 ? "s" : ""}</div>
            <Btn primary small onClick={() => setEditing(emptyCourse())}>{I.plus} Add Course</Btn>
          </div>
          {courses.map(c => (
            <div key={c.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.head, fontSize: 15, fontWeight: 600, color: C.text }}>{c.title}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.muted, marginTop: 2 }}>{c.modules} modules · {c.hours}h · {c.lessons?.length || 0} lessons</div>
              </div>
              <span style={{ fontFamily: F.mono, fontSize: 13, color: C.text, fontWeight: 700, background: C.accentBg, padding: "3px 10px", borderRadius: 6 }}>{rp(c.price)}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn small onClick={() => setEditing(c)}>Edit</Btn>
                <button onClick={() => setConfirmDel(c)} style={{ background: `${C.red}15`, border: `1px solid ${C.red}25`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: C.red, cursor: "pointer", fontFamily: F.body }}>Delete</button>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <div style={{ background: C.bg2, border: `1px dashed ${C.border}`, borderRadius: 14, padding: 48, textAlign: "center", color: C.muted, fontFamily: F.body, fontSize: 13 }}>
              Belum ada course. Klik <strong>+ Add Course</strong> untuk membuat course pertama.
            </div>
          )}
        </div>}

        {tab === "students" && <div>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.muted, marginBottom: 20 }}>
            {new Set(orders.map(o => o.userEmail)).size} unique student{new Set(orders.map(o => o.userEmail)).size !== 1 ? "s" : ""}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            {orders.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center", color: C.muted, fontFamily: F.body, fontSize: 13 }}>
                Belum ada student enrolled.
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Email","Course","Progress","Purchased","Status"].map(h => <th key={h} style={{ fontFamily: F.body, fontSize: 11, fontWeight: 500, color: C.dim, padding: "12px 16px", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {orders.map(o => {
                    const c = courses.find(x => x.id === o.courseId);
                    const total = c?.lessons?.length || 0;
                    const done = o.completedLessons?.length || 0;
                    const p = total ? Math.round((done/total)*100) : 0;
                    const status = p === 100 ? "Completed" : p > 0 ? "Active" : "New";
                    return (
                      <tr key={o.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ fontFamily: F.mono, fontSize: 12, color: C.text, padding: "12px 16px" }}>{o.userEmail}</td>
                        <td style={{ fontFamily: F.body, fontSize: 13, color: C.muted, padding: "12px 16px" }}>{c?.title || "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 60, height: 4, background: C.bg4, borderRadius: 2 }}><div style={{ width: `${p}%`, height: "100%", background: p===100 ? C.green : C.accent, borderRadius: 2 }} /></div>
                            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{p}%</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: F.body, fontSize: 12, color: C.dim, padding: "12px 16px" }}>{fmtDate(o.purchasedAt)}</td>
                        <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: status==="Completed" ? `${C.green}15` : status==="New" ? `${C.blue}15` : C.accentBg, color: status==="Completed" ? C.green : status==="New" ? C.blue : C.accentInk }}>{status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>}

        {tab === "analytics" && <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {[["Enrollment by Course", courses.map(c => [c.title.split(" ")[0], orders.filter(o => o.courseId === c.id).length])],["Revenue by Course", courses.map(c => [c.title.split(" ")[0], orders.filter(o => o.courseId === c.id).reduce((s,o) => s+o.amount, 0)])]].map(([title, data], ci) => (
            <div key={ci} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: F.head, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 20px" }}>{title}</h3>
              {data.map(([l,v],i) => {
                const mx = Math.max(1, ...data.map(x => x[1]));
                return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, width: 60, textAlign: "right" }}>{l}</span>
                  <div style={{ flex: 1, height: 8, background: C.bg4, borderRadius: 4 }}><div style={{ width: `${(v/mx)*100}%`, height: "100%", background: courses[i]?.color || C.accent, borderRadius: 4 }} /></div>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.dim, width: 60 }}>{ci===1 ? (v > 999999 ? `${(v/1000000).toFixed(1)}M` : `${Math.round(v/1000)}K`) : v.toLocaleString()}</span>
                </div>;
              })}
            </div>
          ))}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, gridColumn: "span 2" }}>
            <h3 style={{ fontFamily: F.head, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>Integration Status</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[["Payment Gateway", settings.gateway !== "mock" ? "Active" : "Mock Mode", settings.gateway !== "mock" ? C.green : C.orange],["Lynk.id", settings.gateway === "lynk" ? "Active" : "Inactive", settings.gateway === "lynk" ? C.green : C.dim],["Midtrans", settings.gateway === "midtrans" ? "Active" : "Inactive", settings.gateway === "midtrans" ? C.green : C.dim],["Xendit", settings.gateway === "xendit" ? "Active" : "Inactive", settings.gateway === "xendit" ? C.green : C.dim]].map(([n,s,clr],i) => (
                <div key={i} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: C.text }}>{n}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, padding: "2px 8px", borderRadius: 4, background: `${clr}15`, color: clr }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {tab === "settings" && <AdminSettings settings={settings} setSettings={setSettings} />}
      </div>

      {/* Course CRUD Modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.title ? `Edit — ${editing.title}` : "Add New Course"} maxWidth={640}>
        {editing && <CourseForm course={editing} onSave={saveCourse} onCancel={() => setEditing(null)} />}
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!confirmDel} onClose={() => setConfirmDel(null)} title="Hapus course?">
        {confirmDel && (
          <>
            <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, lineHeight: 1.6, margin: "0 0 20px" }}>
              Kamu akan menghapus <strong style={{ color: C.text }}>{confirmDel.title}</strong>. Aksi ini tidak bisa dibatalkan. Enrollment yang sudah ada akan tetap ada di database tapi course-nya hilang.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn onClick={() => setConfirmDel(null)}>Batal</Btn>
              <Btn danger onClick={() => deleteCourse(confirmDel.id)}>Hapus Permanen</Btn>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

/* ── Course CRUD Form ── */
function CourseForm({ course, onSave, onCancel }) {
  const [c, setC] = useState(course);
  const upd = (k, v) => setC({ ...c, [k]: v });

  const lessonsText = (c.lessons || []).map(l => `${l.title} | ${l.dur}${l.locked ? " | locked" : ""}`).join("\n");
  const parseLessons = (text) => {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    return lines.map((ln, i) => {
      const parts = ln.split("|").map(p => p.trim());
      return { id: i + 1, title: parts[0] || `Lesson ${i+1}`, dur: parts[1] || "10:00", done: false, ...(parts[2] === "locked" ? { locked: true } : {}), ...(i === 0 ? { active: true } : {}) };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!c.title.trim()) return;
    onSave(c);
  };

  return (
    <form onSubmit={submit}>
      <div style={{ display: "flex", gap: 14 }}>
        <FormField label="Icon (emoji)" row>
          <Input value={c.icon} onChange={v => upd("icon", v)} placeholder="📊" style={{ textAlign: "center", fontSize: 24 }} />
        </FormField>
        <FormField label="Color (hex)" row>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="color" value={c.color} onChange={e => upd("color", e.target.value)} style={{ width: 44, height: 40, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", background: "none" }} />
            <Input value={c.color} onChange={v => upd("color", v)} mono />
          </div>
        </FormField>
      </div>
      <FormField label="Title"><Input value={c.title} onChange={v => upd("title", v)} placeholder="Microsoft Excel Mastery" /></FormField>
      <FormField label="Description"><Input value={c.desc} onChange={v => upd("desc", v)} placeholder="Dari NOL ke Master Excel" /></FormField>
      <div style={{ display: "flex", gap: 14 }}>
        <FormField label="Modules" row><Input type="number" value={c.modules} onChange={v => upd("modules", v)} /></FormField>
        <FormField label="Hours" row><Input type="number" value={c.hours} onChange={v => upd("hours", v)} /></FormField>
        <FormField label="Rating" row><Input type="number" value={c.rating} onChange={v => upd("rating", v)} /></FormField>
        <FormField label="Students" row><Input type="number" value={c.students} onChange={v => upd("students", v)} /></FormField>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <FormField label="Price (Rp)" row hint={rp(c.price)}><Input type="number" value={c.price} onChange={v => upd("price", v)} mono /></FormField>
        <FormField label="Old Price (Rp)" row hint={rp(c.oldPrice)}><Input type="number" value={c.oldPrice} onChange={v => upd("oldPrice", v)} mono /></FormField>
      </div>
      <FormField label="Lessons" hint="Satu lesson per baris. Format: Title | Durasi | locked (opsional)">
        <Textarea value={lessonsText} onChange={v => upd("lessons", parseLessons(v))} rows={8} style={{ fontFamily: F.mono, fontSize: 12 }} placeholder={"Introduction | 08:30\nSetup | 12:15\nAdvanced Topic | 25:00 | locked"} />
      </FormField>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn onClick={onCancel}>Batal</Btn>
        <Btn primary type="submit">Simpan Course</Btn>
      </div>
    </form>
  );
}

/* ── Admin Settings (with payment gateway config) ── */
function AdminSettings({ settings, setSettings }) {
  const [s, setS] = useState(settings);
  const [saved, setSaved] = useState(false);
  const upd = (k, v) => setS({ ...s, [k]: v });
  const updMethod = (k, v) => setS({ ...s, methods: { ...s.methods, [k]: v } });
  const save = () => {
    setSettings(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h3 style={{ fontFamily: F.head, fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 20px" }}>General</h3>
        <FormField label="Site Name"><Input value={s.siteName} onChange={v => upd("siteName", v)} /></FormField>
        <FormField label="Admin Email"><Input value={s.adminEmail} onChange={v => upd("adminEmail", v)} /></FormField>
        <FormField label="WhatsApp"><Input value={s.whatsapp} onChange={v => upd("whatsapp", v)} /></FormField>
        <FormField label="Timezone"><Input value={s.timezone} onChange={v => upd("timezone", v)} /></FormField>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h3 style={{ fontFamily: F.head, fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 6px" }}>Payment Gateway</h3>
        <p style={{ fontFamily: F.body, fontSize: 12, color: C.muted, margin: "0 0 20px" }}>Pilih provider yang mau dipakai. Path A masih pakai simulasi — integrasi backend menyusul.</p>

        <FormField label="Provider">
          <Select value={s.gateway} onChange={v => upd("gateway", v)} options={[
            { value: "mock", label: "Mock Gateway (demo only)" },
            { value: "lynk", label: "Lynk.id (payment link)" },
            { value: "midtrans", label: "Midtrans (Snap)" },
            { value: "xendit", label: "Xendit" },
          ]} />
        </FormField>

        {s.gateway === "lynk" && (
          <>
            <FormField label="Lynk Checkout URL" hint="Payment link dari dashboard Lynk.id">
              <Input value={s.lynkUrl} onChange={v => upd("lynkUrl", v)} mono placeholder="https://lynk.id/yourname/checkout" />
            </FormField>
            <div style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, borderRadius: 10, padding: 14, fontFamily: F.body, fontSize: 12, color: C.accentInk }}>
              💡 Lynk.id butuh satu payment link per produk. Untuk multi-course, buat satu link per course lalu update URL-nya di admin.
            </div>
          </>
        )}

        {s.gateway === "midtrans" && (
          <>
            <FormField label="Server Key" hint="Dari Midtrans dashboard > Settings > Access Keys">
              <Input value={s.midtransKey} onChange={v => upd("midtransKey", v)} mono placeholder="SB-Mid-server-xxxx" />
            </FormField>
            <FormField label="Mode">
              <Select value={s.midtransMode} onChange={v => upd("midtransMode", v)} options={[{ value: "sandbox", label: "Sandbox (testing)" }, { value: "production", label: "Production" }]} />
            </FormField>
            <div style={{ background: `${C.orange}12`, border: `1px solid ${C.orange}30`, borderRadius: 10, padding: 14, fontFamily: F.body, fontSize: 12, color: "#8B5A00" }}>
              ⚠️ Midtrans Snap butuh backend endpoint untuk generate Snap token (SHA-512 signed). Frontend-only tidak cukup aman. Rencana: Vercel serverless function di Phase 2.
            </div>
          </>
        )}

        {s.gateway === "xendit" && (
          <>
            <FormField label="Secret Key" hint="xnd_development_... atau xnd_production_...">
              <Input value={s.xenditKey} onChange={v => upd("xenditKey", v)} mono placeholder="xnd_development_xxxx" />
            </FormField>
            <div style={{ background: `${C.orange}12`, border: `1px solid ${C.orange}30`, borderRadius: 10, padding: 14, fontFamily: F.body, fontSize: 12, color: "#8B5A00" }}>
              ⚠️ Xendit secret key tidak boleh expose di frontend. Butuh backend proxy. Rencana: Vercel serverless function di Phase 2.
            </div>
          </>
        )}

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 10 }}>Metode yang ditampilkan di checkout</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            <Toggle checked={s.methods.va} onChange={v => updMethod("va", v)} label="Virtual Account (BCA, Mandiri, BNI, BRI)" />
            <Toggle checked={s.methods.qris} onChange={v => updMethod("qris", v)} label="QRIS" />
            <Toggle checked={s.methods.ewallet} onChange={v => updMethod("ewallet", v)} label="E-Wallet (GoPay, OVO, DANA, ShopeePay)" />
            <Toggle checked={s.methods.retail} onChange={v => updMethod("retail", v)} label="Retail (Alfamart, Indomaret)" />
            <Toggle checked={s.methods.card} onChange={v => updMethod("card", v)} label="Kartu Kredit/Debit" />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Btn primary onClick={save}>Save All Settings</Btn>
        {saved && <span style={{ fontFamily: F.mono, fontSize: 12, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>{I.check} Saved</span>}
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ go }) {
  const cols = [
    ["Categories", [["Design"], ["Marketing & Business"], ["Writing"], ["Fashion"], ["Music & Audio"], ["Craft", "SALE", C.orange], ["Photography & Video"], ["Web & App design"]]],
    ["Lists", [["New courses"], ["Top rated"], ["Courses on sale"], ["Course bundles"], ["Blog", "POPULAR", C.accent], ["Ebooks", "NEW", "#4ECDC4"], ["Events"]]],
    ["Company", [["About us"], ["Security"], ["Contact us"], ["Careers", "HIRING", C.pink], ["Become a Teacher"], ["Term of Service"], ["Privacy Policy"], ["Accessibility"]]],
    ["Feature", [["User Management"], ["Learn Management"], ["Reporting"], ["Forums"], ["Language"]]],
  ];
  const socials = ["Facebook", "YouTube", "Instagram", "X", "TikTok", "LinkedIn"];
  return (
    <footer style={{ background: C.dark, marginTop: 40 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 40px 40px", display: "grid", gridTemplateColumns: "240px repeat(4, 1fr)", gap: 40 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            <span style={{ fontFamily: F.head, fontWeight: 900, fontSize: 20, color: C.darkText, letterSpacing: "-0.04em" }}>KERJA</span>
            <span style={{ background: C.accent, color: C.onAccent, fontFamily: F.head, fontWeight: 900, fontSize: 13, padding: "3px 9px", borderRadius: 7, letterSpacing: "-0.02em", transform: "skewX(-8deg)", display: "inline-block" }}>ID</span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: 12, color: C.darkMuted, lineHeight: 1.6, margin: 0 }}>Platform belajar online #1 untuk skill data & produktivitas.</p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title}>
            <div style={{ fontFamily: F.head, fontSize: 15, fontWeight: 700, color: C.darkText, marginBottom: 16 }}>{title}</div>
            {items.map(([label, badge, bColor]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11, cursor: "pointer" }}>
                <span style={{ fontFamily: F.body, fontSize: 13, color: C.darkMuted, transition: "color 0.15s" }}>{label}</span>
                {badge && <span style={{ background: bColor, color: bColor === C.accent ? C.onAccent : "#0A0A0F", fontFamily: F.head, fontWeight: 800, fontSize: 9, padding: "2px 7px", borderRadius: 5, letterSpacing: "0.04em" }}>{badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#F4F4F5" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: F.body, fontSize: 12, color: C.muted }}>© 2026 <strong style={{ color: C.text }}>Kerja.id</strong>. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: F.body, fontSize: 12, color: C.muted }}>Connect with us</span>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(s => (
                <div key={s} title={s} style={{ width: 28, height: 28, borderRadius: "50%", background: C.pink, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0F", fontFamily: F.head, fontWeight: 800, fontSize: 11, cursor: "pointer" }}>{s[0]}</div>
              ))}
            </div>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ width: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, cursor: "pointer", marginLeft: 6 }}>↑</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════ APP ════════════════ */
export default function App() {
  const [route, setRoute] = useState({ page: "home" });
  const [user, setUser] = useLocalStorage(LS.user, null);
  const [courses, setCourses] = useLocalStorage(LS.courses, DEFAULT_COURSES);
  const [enrollments, setEnrollments] = useLocalStorage(LS.enrollments, []);
  const [settings, setSettings] = useLocalStorage(LS.settings, DEFAULT_SETTINGS);
  const [adminAuth, setAdminAuth] = useLocalStorage(LS.adminAuth, false);
  const [pendingRoute, setPendingRoute] = useState(null); // remember where to go after login

  const go = (page, params = {}) => {
    // Gates
    if (page === "checkout" && !user) {
      setPendingRoute({ page, params });
      setRoute({ page: "login" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (page === "lms" && !user) {
      setPendingRoute({ page, params });
      setRoute({ page: "login" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (page === "mylearning" && !user) {
      setPendingRoute({ page, params });
      setRoute({ page: "login" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setRoute({ page, ...params });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (u) => { setUser(u); };
  const handleLogout = () => { setUser(null); setRoute({ page: "home" }); };
  const handleAdminLogout = () => { setAdminAuth(false); setRoute({ page: "home" }); };

  const currentCourse = route.courseId ? courses.find(c => c.id === route.courseId) : null;
  const currentEnrollment = user && route.courseId ? enrollments.find(e => e.userEmail === user.email && e.courseId === route.courseId) : null;

  const onBuy = (courseId) => go("checkout", { courseId });
  const onPaid = (enrollment) => {
    setEnrollments(prev => {
      // replace if already exists (idempotent)
      const without = prev.filter(e => !(e.userEmail === enrollment.userEmail && e.courseId === enrollment.courseId));
      return [...without, enrollment];
    });
  };
  const onProgress = (enrollmentId, completedLessons) => {
    setEnrollments(prev => prev.map(e => e.id === enrollmentId ? { ...e, completedLessons } : e));
  };

  const isFullScreenPage = route.page === "lms" || route.page === "admin" || route.page === "login" || route.page === "checkout";

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: F.body }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bg3}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderH}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.muted}; }
        button { transition: all 0.18s ease; }
        button:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(0.98); }
        input:focus, textarea:focus, select:focus { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accentBg} !important; }
        ::placeholder { color: ${C.dim}; }
        ::selection { background: ${C.accent}; color: ${C.onAccent}; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <Navbar route={route} go={go} user={user} onLogout={handleLogout} />

      {route.page === "home" && <Home go={go} courses={courses} />}
      {route.page === "catalog" && <Catalog go={go} courses={courses} />}
      {route.page === "landing" && <Landing go={go} course={currentCourse} onBuy={() => onBuy(route.courseId)} enrolled={!!currentEnrollment} />}
      {route.page === "login" && <Login onLogin={(u) => {
        setUser(u);
        const p = pendingRoute;
        setPendingRoute(null);
        setRoute(p ? { page: p.page, ...p.params } : { page: "mylearning" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />}
      {route.page === "checkout" && user && currentCourse && <Checkout go={go} course={currentCourse} user={user} settings={settings} onPaid={onPaid} />}
      {route.page === "mylearning" && user && <MyLearning go={go} user={user} courses={courses} enrollments={enrollments} />}
      {route.page === "lms" && user && currentCourse && (currentEnrollment ? (
        <LMS go={go} user={user} course={currentCourse} enrollment={currentEnrollment} onProgress={(lessons) => onProgress(currentEnrollment.id, lessons)} />
      ) : (
        <LmsGate go={go} course={currentCourse} user={user} />
      ))}
      {route.page === "admin" && (adminAuth ? (
        <Admin courses={courses} setCourses={setCourses} enrollments={enrollments} settings={settings} setSettings={setSettings} onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin onAuth={setAdminAuth} go={go} />
      ))}

      {!isFullScreenPage && <Footer go={go} />}
    </div>
  );
}
