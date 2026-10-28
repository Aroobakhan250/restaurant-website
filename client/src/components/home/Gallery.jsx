import { useState } from "react";
import { EyeIcon, CloseIcon } from "../common/Icons";

export default function Gallery() {
  const images = [
    {
      id: 1,
      title: "Zaffron Charcoal Grill Platter",
      category: "Grills & BBQ",
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Handcrafted Angus Smash Burger",
      category: "Gourmet Bites",
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Artisan Woodfired Truffle Pizza",
      category: "Woodfired",
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Fine Dining Candlelit Ambience",
      category: "Ambience",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Royal Creamy Fettuccine Alfredo",
      category: "Italian",
      url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Molten Chocolate Lava Cake",
      category: "Desserts",
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      title: "Private VIP Dining Lounge",
      category: "Ambience",
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      title: "Artisan Mint Mojito & Coolers",
      category: "Beverages",
      url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [activeImage, setActiveImage] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Grills & BBQ", "Gourmet Bites", "Italian", "Desserts", "Ambience"];

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-title">Visual Symphony</span>
          <h2 className="main-title">Ambience & Food Gallery</h2>
          <p className="desc">
            A glimpse into the artistry, passion, and luxurious atmosphere that awaits you at 
            Zaffron Restaurant.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={styles.filterRow}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                ...styles.filterBtn,
                background: filter === c ? "var(--gold-gradient)" : "rgba(255,255,255,0.06)",
                color: filter === c ? "#0c0e14" : "#ffffff",
                borderColor: filter === c ? "transparent" : "rgba(255,255,255,0.12)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery Masonry-like Grid */}
        <div style={styles.grid} className="universal-3-col-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={styles.card}
              onClick={() => setActiveImage(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                style={styles.img}
              />
              <div style={styles.overlay}>
                <span style={styles.categoryBadge}>{item.category}</span>
                <h4 style={styles.dishTitle}>{item.title}</h4>
                <span style={styles.viewBadge}>
                  <EyeIcon size={14} color="#94a3b8" />
                  <span style={{ marginLeft: "6px" }}>View Full Image</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="modal-overlay" onClick={() => setActiveImage(null)}>
            <div
              style={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                style={styles.closeBtn}
                aria-label="Close image preview"
              >
                <CloseIcon size={16} color="#fff" />
              </button>
              <img
                src={activeImage.url}
                alt={activeImage.title}
                style={styles.lightboxImg}
              />
              <div style={styles.lightboxDetails}>
                <span style={styles.lightboxCategory}>{activeImage.category}</span>
                <h3 style={{ color: "#fff", fontSize: "20px", marginTop: "4px" }}>
                  {activeImage.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#0c0e14",
  },
  filterRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "36px",
  },
  filterBtn: {
    padding: "8px 18px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.2s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "clamp(8px, 1.8vw, 18px)",
  },
  card: {
    position: "relative",
    height: "clamp(220px, 35vw, 260px)",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,14,20,0.9) 100%)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "opacity 0.2s ease",
  },
  categoryBadge: {
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#fbbf24",
    marginBottom: "4px",
  },
  dishTitle: {
    fontSize: "16px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "10px",
  },
  viewBadge: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 600,
  },
  lightboxContent: {
    maxWidth: "850px",
    width: "94vw",
    background: "#131722",
    borderRadius: "22px",
    overflow: "hidden",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "16px",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    zIndex: 10,
  },
  lightboxImg: {
    width: "100%",
    maxHeight: "70vh",
    objectFit: "cover",
    display: "block",
  },
  lightboxDetails: {
    padding: "20px 24px",
    background: "#131722",
  },
  lightboxCategory: {
    fontSize: "12px",
    color: "#f59e0b",
    fontWeight: 700,
    textTransform: "uppercase",
  },
};