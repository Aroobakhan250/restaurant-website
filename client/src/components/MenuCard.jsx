import { useCart } from "../context/CartContext";
import { StarIcon, ClockIcon, FlameIcon, EyeIcon } from "./common/Icons";

export default function MenuCard({ item, onQuickView }) {
  const { addToCart } = useCart();

  return (
    <div className="glass-card menu-card" style={styles.card}>
      {/* Dish Photo Banner */}
      <div style={styles.imgContainer} className="menu-card-img-wrap" onClick={() => onQuickView && onQuickView(item)}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="menu-card-img"
          style={styles.dishImg}
          onError={(e) => {
            // Graceful fallback to delicious food placeholder if offline or blocked
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
          }}
        />
        <div style={styles.imgOverlay} />

        {/* Top Floating Badges */}
        <div style={styles.topBadges} className="menu-card-top-badges">
          <span style={styles.categoryBadge} className="menu-card-cat-badge">{item.category}</span>
          {item.diet === "veg" ? (
            <span style={styles.vegBadge} className="menu-card-veg-badge">VEG</span>
          ) : (
            <span style={styles.nonVegBadge} className="menu-card-nonveg-badge">NON-VEG</span>
          )}
        </div>

        {/* Bottom Floating Info */}
        <div style={styles.bottomBadges} className="menu-card-bottom-badges">
          {item.isPopular && (
            <span style={styles.popularBadge} className="menu-card-pop-badge">
              <StarIcon size={10} color="#0c0e14" fill="#0c0e14" />
              <span>POPULAR</span>
            </span>
          )}
          {item.spicy && (
            <span style={styles.spicyBadge} className="menu-card-spicy-badge">
              <FlameIcon size={11} color="#fff" />
              <span>SPICY</span>
            </span>
          )}
          <span style={styles.timeBadge} className="menu-card-time-badge">
            <ClockIcon size={11} color="#cbd5e1" />
            <span>{item.prepTime}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={styles.body} className="menu-card-body">
        <div style={styles.titleRow} className="menu-card-title-row">
          <h3 style={styles.title} className="menu-card-title" onClick={() => onQuickView && onQuickView(item)}>
            {item.name}
          </h3>
          <span style={styles.rating} className="menu-card-rating">
            <StarIcon size={12} color="#fbbf24" fill="#fbbf24" />
            <span>{item.rating}</span>
          </span>
        </div>

        <p style={styles.desc} className="menu-card-desc">{item.desc}</p>

        <div style={styles.metaRow} className="menu-card-meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <FlameIcon size={12} color="#f97316" />
            {item.calories}
          </span>
          <span>•</span>
          <span style={{ color: "#10b981", fontWeight: 700 }}>100% Fresh Halal</span>
        </div>
      </div>

      {/* Card Footer */}
      <div style={styles.footer} className="menu-card-footer">
        <div className="menu-card-price-block">
          <span style={styles.priceLabel} className="menu-card-price-label">Price</span>
          <div style={styles.price} className="menu-card-price">Rs {item.price}</div>
        </div>

        <div style={styles.btnRow} className="menu-card-btn-row">
          {onQuickView && (
            <button
              onClick={() => onQuickView(item)}
              style={styles.quickBtn}
              className="menu-card-quick-btn"
              title="Quick View Details"
              aria-label={`Quick view details for ${item.name}`}
            >
              <EyeIcon size={15} color="#cbd5e1" />
            </button>
          )}

          <button
            onClick={() => addToCart(item)}
            className="btn-primary menu-card-add-btn"
            style={styles.addBtn}
          >
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "22px",
    overflow: "hidden",
    transition: "transform 0.28s ease, box-shadow 0.28s ease",
  },
  imgContainer: {
    position: "relative",
    height: "185px",
    overflow: "hidden",
    cursor: "pointer",
    background: "#1a202c",
  },
  dishImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(12,14,20,0.85) 100%)",
  },
  topBadges: {
    position: "absolute",
    top: "12px",
    left: "12px",
    right: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  categoryBadge: {
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "rgba(12, 14, 20, 0.8)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    padding: "3px 9px",
    borderRadius: "999px",
    backdropFilter: "blur(6px)",
  },
  vegBadge: {
    fontSize: "11px",
    fontWeight: 800,
    background: "rgba(16, 185, 129, 0.85)",
    color: "#ffffff",
    padding: "3px 8px",
    borderRadius: "999px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  },
  nonVegBadge: {
    fontSize: "11px",
    fontWeight: 800,
    background: "rgba(239, 68, 68, 0.85)",
    color: "#ffffff",
    padding: "3px 8px",
    borderRadius: "999px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  },
  bottomBadges: {
    position: "absolute",
    bottom: "10px",
    left: "12px",
    right: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    zIndex: 2,
  },
  popularBadge: {
    fontSize: "10px",
    fontWeight: 800,
    background: "rgba(245, 158, 11, 0.9)",
    color: "#0c0e14",
    padding: "2px 7px",
    borderRadius: "6px",
  },
  spicyBadge: {
    fontSize: "10px",
    fontWeight: 800,
    background: "rgba(249, 115, 22, 0.9)",
    color: "#fff",
    padding: "2px 7px",
    borderRadius: "6px",
  },
  timeBadge: {
    fontSize: "11px",
    fontWeight: 700,
    background: "rgba(0, 0, 0, 0.7)",
    color: "#cbd5e1",
    padding: "2px 7px",
    borderRadius: "6px",
    marginLeft: "auto",
  },
  body: {
    padding: "18px 20px 14px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
    marginBottom: "6px",
  },
  title: {
    fontSize: "17px",
    fontWeight: 800,
    color: "#ffffff",
    cursor: "pointer",
    lineHeight: 1.3,
  },
  rating: {
    fontSize: "12px",
    fontWeight: 800,
    color: "#fbbf24",
    whiteSpace: "nowrap",
  },
  desc: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.5,
    marginBottom: "12px",
    flex: 1,
  },
  metaRow: {
    display: "flex",
    gap: "8px",
    fontSize: "12px",
    color: "#64748b",
    alignItems: "center",
  },
  footer: {
    padding: "14px 20px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
  priceLabel: {
    fontSize: "10px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
  },
  price: {
    fontSize: "20px",
    fontWeight: 900,
    color: "#fbbf24",
  },
  btnRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  quickBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#fff",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    fontSize: "15px",
  },
  addBtn: {
    padding: "9px 18px",
    fontSize: "13px",
  },
};