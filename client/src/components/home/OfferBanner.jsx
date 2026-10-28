import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CopyIcon, CheckIcon } from "../common/Icons";

export default function OfferBanner() {
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useCart();

  const handleCopy = () => {
    navigator.clipboard?.writeText("ZAFFRON20");
    applyCoupon("ZAFFRON20");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.card} className="glass-card">
          <div style={styles.glowDecor} />
          
          <div style={styles.left}>
            <span style={styles.specialPill}>Limited Weekend Feast Offer</span>
            <h3 style={styles.title} className="serif">
              Enjoy Flat <span className="gold-text">20% Discount</span> on All Platters & Mains!
            </h3>
            <p style={styles.desc}>
              Order your favorite charcoal grills, creamy handis, or woodfired pizzas. Apply coupon code at checkout or copy below to activate directly.
            </p>

            <div style={styles.codeRow}>
              <div style={styles.codeBox}>
                <span style={styles.codeText}>ZAFFRON20</span>
                <button onClick={handleCopy} style={styles.copyBtn}>
                  {copied ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <CheckIcon size={14} color="#10b981" /> Applied
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <CopyIcon size={14} color="#fbbf24" /> Copy Code
                    </span>
                  )}
                </button>
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                * Valid on all orders above Rs 1,000
              </span>
            </div>
          </div>

          <div style={styles.right}>
            <Link to="/menu" className="btn-primary" style={{ padding: "16px 36px", fontSize: "16px" }}>
              Order With Discount →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "30px 0 60px 0",
    background: "#0c0e14",
  },
  card: {
    padding: "clamp(22px, 4vw, 40px) clamp(16px, 4vw, 40px)",
    borderRadius: "28px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(19, 24, 38, 0.95) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    position: "relative",
    overflow: "hidden",
  },
  glowDecor: {
    position: "absolute",
    top: "-50%",
    left: "-20%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245, 158, 11, 0.25), transparent 70%)",
    pointerEvents: "none",
  },
  left: {
    maxWidth: "680px",
    position: "relative",
    zIndex: 2,
  },
  specialPill: {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: "999px",
    background: "rgba(239, 68, 68, 0.2)",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    color: "#f87171",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "14px",
  },
  title: {
    fontSize: "clamp(24px, 3.2vw, 36px)",
    color: "#ffffff",
    marginBottom: "12px",
    lineHeight: 1.25,
  },
  desc: {
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: 1.6,
    marginBottom: "20px",
  },
  codeRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  codeBox: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.6)",
    border: "1px dashed rgba(245, 158, 11, 0.6)",
    borderRadius: "12px",
    padding: "4px 6px 4px 14px",
    gap: "12px",
  },
  codeText: {
    fontWeight: 900,
    fontSize: "16px",
    color: "#fbbf24",
    letterSpacing: "1.5px",
  },
  copyBtn: {
    background: "rgba(245, 158, 11, 0.25)",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: 800,
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  right: {
    position: "relative",
    zIndex: 2,
  },
};
