import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchIcon, CalendarIcon, PhoneIcon } from "../common/Icons";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/menu");
    }
  };

  return (
    <section style={styles.heroSection}>
      {/* Dark Ambient & Vignette Overlays over /images/hero.jpg */}
      <div style={styles.gradientOverlay} />
      <div style={styles.vignetteOverlay} />

      <div className="container" style={styles.heroContainer}>
        <div style={styles.heroContent}>
          {/* Top Pill Badge */}
          <div style={styles.badgeWrapper}>
            <span className="pill-badge" style={styles.pillBadge}>
              Michelin-Inspired Artisan Cuisine • Open Daily
            </span>
          </div>

          {/* Main Title */}
          <h1 style={styles.heroTitle} className="serif">
            A Symphony of <span className="gold-text">Exquisite Flavors</span>,
            <br />
            Crafted with Passion.
          </h1>

          {/* Subtitle / Description */}
          <p style={styles.heroSubtitle}>
            Immerse yourself in an extraordinary culinary journey. Savor hand-selected fresh 
            ingredients, time-honored artisanal recipes, and a warm, luxurious ambience designed 
            for unforgettable memories.
          </p>

          {/* Quick Dish Search Bar right in Hero */}
          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>
                <SearchIcon size={16} color="#fbbf24" />
              </span>
              <input
                type="text"
                placeholder="Search menu dishes (e.g. Biryani, Karahi, Pasta, Burger, Pizza)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <button type="submit" className="btn-primary" style={styles.searchBtn}>
                Find Food
              </button>
            </div>
          </form>

          {/* Primary Action Buttons */}
          <div style={styles.btnRow} className="hero-btn-row">
            <Link to="/menu" className="btn-primary" style={styles.mainBtn}>
              <span>Explore Menu</span>
              <span style={{ fontSize: "18px" }}>→</span>
            </Link>
            <Link to="/reservation" className="btn-ghost" style={styles.ghostBtn}>
              <CalendarIcon size={15} color="#fbbf24" />
              <span>Reserve a Table</span>
            </Link>
            <a href="tel:+923005557890" className="btn-ghost" style={styles.callBtn}>
              <PhoneIcon size={14} color="#fbbf24" />
              <span>Quick Call</span>
            </a>
          </div>

          {/* Floating Trust Metrics */}
          <div style={styles.statsRow} className="hero-stats-row">
            <div style={styles.statItem}>
              <div style={styles.statVal}>4.9 / 5.0</div>
              <div style={styles.statLabel}>2,400+ Verified Reviews</div>
            </div>
            <div style={styles.statDivider} className="hero-stat-divider" />
            <div style={styles.statItem}>
              <div style={styles.statVal}>30 Min</div>
              <div style={styles.statLabel}>Lightning Express Delivery</div>
            </div>
            <div style={styles.statDivider} className="hero-stat-divider" />
            <div style={styles.statItem}>
              <div style={styles.statVal}>100%</div>
              <div style={styles.statLabel}>Fresh & Halal Certified</div>
            </div>
            <div style={styles.statDivider} className="hero-stat-divider" />
            <div style={styles.statItem}>
              <div style={styles.statVal}>50+</div>
              <div style={styles.statLabel}>Master Chef Creations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: "relative",
    minHeight: "92vh",
    display: "flex",
    alignItems: "center",
    backgroundImage: "url('/images/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(12, 14, 20, 0.88) 0%, rgba(12, 14, 20, 0.72) 45%, rgba(12, 14, 20, 0.95) 100%)",
    zIndex: 1,
  },
  vignetteOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 65% 50%, transparent 20%, rgba(12, 14, 20, 0.75) 85%)",
    zIndex: 1,
  },
  heroContainer: {
    position: "relative",
    zIndex: 2,
    paddingTop: "30px",
    paddingBottom: "50px",
  },
  heroContent: {
    maxWidth: "820px",
  },
  badgeWrapper: {
    marginBottom: "20px",
  },
  pillBadge: {
    boxShadow: "0 0 25px rgba(245, 158, 11, 0.2)",
  },
  heroTitle: {
    fontSize: "clamp(30px, 5.5vw, 68px)",
    lineHeight: 1.15,
    color: "#ffffff",
    fontWeight: 800,
    marginBottom: "20px",
    letterSpacing: "-0.5px",
  },
  heroSubtitle: {
    fontSize: "clamp(15px, 1.8vw, 19px)",
    color: "#cbd5e1",
    lineHeight: 1.65,
    maxWidth: "680px",
    marginBottom: "28px",
    textShadow: "0 2px 10px rgba(0,0,0,0.7)",
  },
  searchForm: {
    maxWidth: "640px",
    marginBottom: "28px",
    width: "100%",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(19, 23, 34, 0.92)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    borderRadius: "9999px",
    padding: "6px 8px 6px 16px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(14px)",
    gap: "10px",
    width: "100%",
  },
  searchIcon: {
    fontSize: "18px",
    opacity: 0.7,
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    minWidth: "0",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
  },
  searchBtn: {
    padding: "10px 20px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  btnRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  mainBtn: {
    padding: "14px 30px",
    fontSize: "15px",
  },
  ghostBtn: {
    padding: "13px 26px",
    fontSize: "15px",
  },
  callBtn: {
    padding: "13px 24px",
    fontSize: "15px",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
    background: "rgba(19, 24, 38, 0.65)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "18px 24px",
    borderRadius: "18px",
    backdropFilter: "blur(12px)",
    maxWidth: "760px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
  },
  statVal: {
    fontSize: "22px",
    fontWeight: 900,
    color: "#fbbf24",
    lineHeight: 1.1,
  },
  statLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 600,
    marginTop: "3px",
  },
  statDivider: {
    width: "1px",
    height: "32px",
    background: "rgba(255, 255, 255, 0.12)",
  },
};