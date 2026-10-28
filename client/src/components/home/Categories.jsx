import { Link } from "react-router-dom";
import fastfood from "../../assets/categories/fastfood.jpg";
import maincourse from "../../assets/categories/maincourse.jpg";
import bbq from "../../assets/categories/bbq.jpg";
import desserts from "../../assets/categories/desserts.jpg";
import drinks from "../../assets/categories/drinks.jpg";
import salads from "../../assets/categories/salads.jpg";
import seafood from "../../assets/categories/seafood.jpg";
import breakfast from "../../assets/categories/breakfast.jpg";

export default function Categories() {
  const categories = [
    {
      id: "Fast Food",
      title: "Gourmet Fast Food",
      desc: "Smash burgers, artisan pizzas & loaded fries",
      count: "10 Dishes",
      badge: "Popular Choice",
      image: fastfood,
    },
    {
      id: "Main Course",
      title: "Royal Main Course",
      desc: "Aromatic biryanis, rich karahis & tender handi",
      count: "12 Dishes",
      badge: "Chef's Choice",
      image: maincourse,
    },
    {
      id: "BBQ",
      title: "Charcoal BBQ",
      desc: "Smoky tikkas, succulent malai boti & kababs",
      count: "8 Dishes",
      badge: "Smoky & Hot",
      image: bbq,
    },
    {
      id: "Desserts",
      title: "Artisan Desserts",
      desc: "Molten lava, Belgian brownies & royal kheer",
      count: "6 Delights",
      badge: "Sweet Treats",
      image: desserts,
    },
    {
      id: "Drinks",
      title: "Craft Beverages",
      desc: "Fresh mint margaritas, iced brews & chillers",
      count: "8 Drinks",
      badge: "Refreshing",
      image: drinks,
    },
    {
      id: "Salads",
      title: "Garden Fresh Salads",
      desc: "Crisp greens, Mediterranean feta & caesar bowls",
      count: "5 Bowls",
      badge: "Healthy & Clean",
      image: salads,
    },
    {
      id: "Starters",
      title: "Crispy Appetizers",
      desc: "Golden mozzarella sticks, crispy wings & nachos",
      count: "8 Starters",
      badge: "Quick Bites",
      image: seafood,
    },
    {
      id: "Breakfast",
      title: "Morning Artisan",
      desc: "Desi halwa puri, fluffy omelettes & fresh chai",
      count: "6 Specials",
      badge: "Daily 8-11 AM",
      image: breakfast,
    },
  ];

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-title">Curated Gastronomy</span>
          <h2 className="main-title">Explore Our Categories</h2>
          <p className="desc">
            From sizzling charcoal grills to rich royal curries and decadent handcrafted sweets, 
            explore our masterfully prepared selections.
          </p>
        </div>

        {/* Grid */}
        <div style={styles.grid} className="universal-3-col-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?cat=${encodeURIComponent(cat.id)}`}
              style={styles.card}
              className="glass-card"
            >
              <div
                style={{
                  ...styles.imageWrapper,
                  backgroundImage: `url(${cat.image})`,
                }}
              >
                <div style={styles.imageOverlay} />
                <span style={styles.badge}>{cat.badge}</span>
                <span style={styles.countPill}>{cat.count}</span>
              </div>

              <div style={styles.content}>
                <h3 style={styles.title}>{cat.title}</h3>
                <p style={styles.desc}>{cat.desc}</p>
                <div style={styles.footerRow}>
                  <span style={styles.exploreLink}>View Dishes</span>
                  <span style={styles.arrowCircle}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#0c0e14",
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "clamp(10px, 2vw, 22px)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    overflow: "hidden",
    borderRadius: "20px",
    cursor: "pointer",
  },
  imageWrapper: {
    height: "180px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.4s ease",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,14,20,0.85) 100%)",
  },
  badge: {
    position: "absolute",
    top: "14px",
    left: "14px",
    zIndex: 2,
    background: "rgba(12, 14, 20, 0.75)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 700,
    backdropFilter: "blur(6px)",
  },
  countPill: {
    position: "absolute",
    bottom: "12px",
    right: "14px",
    zIndex: 2,
    background: "rgba(0, 0, 0, 0.65)",
    color: "#e2e8f0",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "6px",
  },
  desc: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.5,
    marginBottom: "16px",
    flex: 1,
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "12px",
  },
  exploreLink: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#fbbf24",
  },
  arrowCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.15)",
    color: "#fbbf24",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
    fontWeight: 800,
  },
};