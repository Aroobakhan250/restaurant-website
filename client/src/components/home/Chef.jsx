import { Link } from "react-router-dom";
import { AwardIcon, CheckIcon } from "../common/Icons";

export default function Chef() {
  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div style={styles.grid}>
          {/* Chef Image with Floating Accolade Cards */}
          <div style={styles.imageCol}>
            <div style={styles.imgCard} className="glass-card">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Executive Chef Marco Laurent"
                style={styles.chefImg}
              />
              <div style={styles.imgOverlay} />

              {/* Floating Accolade Badge */}
              <div style={styles.accoladeBadge} className="glass-card">
                <AwardIcon size={26} color="#fbbf24" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14px", color: "#fff" }}>
                    Gold Ribbon Master
                  </div>
                  <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 600 }}>
                    Global Culinary Summit 2024
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chef Philosophy & Bio */}
          <div style={styles.contentCol}>
            <span className="pill-badge" style={{ marginBottom: "16px" }}>
              Master of Gastronomy
            </span>
            <h2 style={styles.title} className="serif">
              "Cooking is not just technique; it is a sacred transfer of emotion."
            </h2>
            <p style={styles.lead}>
              Meet <b>Chef Marco & Chef Tariq</b>, the visionary culinary directors behind Zaffron.
              Trained in the historic bistros of Florence and the traditional charcoal tandoors of
              the East, they blend age-old heritage recipes with avant-garde presentation.
            </p>
            <p style={styles.text}>
              Every marinade is rested for 24 hours in stone vessels, our pasta dough is rolled by hand
              each dawn, and our sourdough pizza crusts undergo a 72-hour slow cold fermentation for 
              unmatched lightness and aroma.
            </p>

            <div style={styles.pointsGrid}>
              <div style={styles.pointItem}>
                <span style={styles.checkIcon}>
                  <CheckIcon size={12} color="#10b981" />
                </span>
                <div>
                  <div style={styles.pointTitle}>Zero Preservatives</div>
                  <div style={styles.pointDesc}>Only cold-pressed oils & fresh Himalayan salts</div>
                </div>
              </div>
              <div style={styles.pointItem}>
                <span style={styles.checkIcon}>
                  <CheckIcon size={12} color="#10b981" />
                </span>
                <div>
                  <div style={styles.pointTitle}>Handcrafted In-House</div>
                  <div style={styles.pointDesc}>All sauces, stocks, dips, and desserts made daily</div>
                </div>
              </div>
            </div>

            <div style={styles.btnRow}>
              <Link to="/about" className="btn-primary">
                Read Our Full Story →
              </Link>
              <Link to="/reservation" className="btn-ghost">
                Book Chef’s Table
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#090b10",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "clamp(24px, 4vw, 50px)",
    alignItems: "center",
  },
  imageCol: {
    position: "relative",
  },
  imgCard: {
    position: "relative",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  },
  chefImg: {
    width: "100%",
    height: "clamp(300px, 50vw, 520px)",
    objectFit: "cover",
    display: "block",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, transparent 40%, rgba(12,14,20,0.85) 100%)",
  },
  accoladeBadge: {
    position: "absolute",
    bottom: "clamp(12px, 3vw, 24px)",
    left: "clamp(12px, 3vw, 24px)",
    right: "clamp(12px, 3vw, 24px)",
    padding: "clamp(10px, 2.5vw, 16px) clamp(12px, 3vw, 20px)",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(19, 24, 38, 0.92)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    borderRadius: "16px",
  },
  contentCol: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "clamp(24px, 3.2vw, 38px)",
    color: "#f8fafc",
    lineHeight: 1.3,
    marginBottom: "16px",
  },
  lead: {
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: 1.7,
    marginBottom: "14px",
  },
  text: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: 1.7,
    marginBottom: "24px",
  },
  pointsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  pointItem: {
    display: "flex",
    gap: "12px",
  },
  checkIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "rgba(16, 185, 129, 0.2)",
    color: "#10b981",
    display: "grid",
    placeItems: "center",
    fontSize: "12px",
    fontWeight: 900,
    flexShrink: 0,
    marginTop: "2px",
  },
  pointTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
  },
  pointDesc: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
};
