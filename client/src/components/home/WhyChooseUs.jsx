import { LeafIcon, UtensilsIcon, SparklesIcon, ClockIcon } from "../common/Icons";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <LeafIcon size={24} color="#10b981" />,
      badge: "Pure & Organic",
      title: "Farm-to-Table Fresh",
      desc: "We source our vegetables, aromatic herbs, and meats daily from certified local organic farms. Zero preservatives, maximum natural flavor.",
    },
    {
      icon: <UtensilsIcon size={24} color="#f59e0b" />,
      badge: "Culinary Masters",
      title: "Award-Winning Chefs",
      desc: "Our kitchen is led by executive chefs with over 15 years of international fine-dining experience across London, Dubai, and Lahore.",
    },
    {
      icon: <SparklesIcon size={24} color="#fbbf24" />,
      badge: "Hospitality",
      title: "Five-Star Ambience",
      desc: "Designed with acoustic warmth, mood lighting, and private booths to make every family dinner, date, or business meeting memorable.",
    },
    {
      icon: <ClockIcon size={24} color="#f97316" />,
      badge: "Precision",
      title: "Lightning Express Delivery",
      desc: "Insulated thermal packaging guarantees that your pizza arrives bubbling hot and your artisan drinks remain chilled to perfection in under 35 mins.",
    },
  ];

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-title">The Zaffron Standard</span>
          <h2 className="main-title">Why Connoisseurs Choose Us</h2>
          <p className="desc">
            We don’t merely serve meals — we curate sensory experiences where culinary art, 
            heartfelt hospitality, and pristine hygiene converge.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={styles.grid}>
          {pillars.map((item, idx) => (
            <div key={idx} className="glass-card" style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.iconCircle}>{item.icon}</div>
                <span style={styles.badge}>{item.badge}</span>
              </div>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#0c0e14",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
    gap: "20px",
  },
  card: {
    padding: "clamp(22px, 3.5vw, 32px) clamp(18px, 3.5vw, 26px)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "22px",
    position: "relative",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  iconCircle: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.05))",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    display: "grid",
    placeItems: "center",
    fontSize: "26px",
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.15)",
  },
  badge: {
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#f59e0b",
    background: "rgba(245, 158, 11, 0.1)",
    padding: "4px 10px",
    borderRadius: "999px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "12px",
  },
  desc: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: 1.65,
  },
};