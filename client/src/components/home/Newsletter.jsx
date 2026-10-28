import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { MailIcon, CheckIcon, ShieldCheckIcon } from "../common/Icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { applyCoupon, showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubscribed(true);
    applyCoupon("WELCOME10");
    showToast("Welcome to Zaffron Club! 10% code applied.");
  };

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div style={styles.card} className="glass-card">
          <div style={styles.inner}>
            <div style={{ marginBottom: "16px", color: "#fbbf24" }}>
              <MailIcon size={36} color="#fbbf24" />
            </div>
            <span className="pill-badge" style={{ marginBottom: "12px" }}>
              Zaffron Connoisseur Club
            </span>
            <h2 style={styles.title} className="serif">
              Subscribe for Secret Menus & VIP Invitations
            </h2>
            <p style={styles.desc}>
              Join over 10,000 epicures. Receive exclusive seasonal chef menus, private tasting invitations, 
              and get an instant <b>10% OFF voucher</b> on your first online order.
            </p>

            {subscribed ? (
              <div style={styles.successBox}>
                <CheckIcon size={26} color="#10b981" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "16px", color: "#fbbf24" }}>
                    Welcome to the Inner Circle!
                  </div>
                  <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
                    Your 10% discount code <b>WELCOME10</b> has been automatically applied to your cart.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.form}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <button type="submit" className="btn-primary" style={styles.btn}>
                  Claim 10% Voucher
                </button>
              </form>
            )}

            <div style={{ ...styles.footnote, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <ShieldCheckIcon size={14} color="#64748b" />
              <span>We respect your privacy. No spam ever, unsubscribe anytime with one click.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "30px 0 80px 0",
    background: "#090b10",
  },
  card: {
    maxWidth: "840px",
    margin: "0 auto",
    padding: "clamp(30px, 5vw, 50px) clamp(16px, 4vw, 30px)",
    borderRadius: "28px",
    background: "linear-gradient(180deg, rgba(23, 28, 42, 0.95), rgba(15, 18, 28, 0.95))",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
  },
  inner: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "clamp(22px, 3.5vw, 34px)",
    color: "#ffffff",
    marginBottom: "14px",
    lineHeight: 1.25,
  },
  desc: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: 1.6,
    marginBottom: "26px",
  },
  form: {
    display: "flex",
    gap: "10px",
    width: "100%",
    maxWidth: "500px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    minWidth: "min(100%, 220px)",
    padding: "13px 18px",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-sans)",
  },
  btn: {
    padding: "13px 26px",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  successBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.35)",
    borderRadius: "16px",
    padding: "16px 24px",
    textAlign: "left",
    marginBottom: "16px",
    width: "100%",
    maxWidth: "500px",
  },
  footnote: {
    fontSize: "12px",
    color: "#64748b",
  },
};
