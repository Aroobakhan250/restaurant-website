import { useState, useEffect } from "react";
import { StarIcon, UtensilsIcon, CloseIcon } from "../common/Icons";

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Hamza Tariq",
      role: "Verified Diner • Food Critic",
      rating: 5,
      initials: "HT",
      favorite: "Zaffron Royal Grilled Chicken & Naan",
      date: "Yesterday",
      text: "Hands down the best culinary experience in town! The aroma of charcoal and tenderness of the meat is unmatched. The service was 5-star from the moment we walked in.",
    },
    {
      id: 2,
      name: "Dr. Ayesha Malik",
      role: "Family Dining",
      rating: 5,
      initials: "AM",
      favorite: "Mutton Karahi & Garlic Bread",
      date: "3 days ago",
      text: "Celebrated our wedding anniversary here. The private booth ambience, soothing music, and prompt delivery of food made our evening truly unforgettable.",
    },
    {
      id: 3,
      name: "Saad Rehman",
      role: "Regular Foodie",
      rating: 5,
      initials: "SR",
      favorite: "Angus Smash Burger & Fries",
      date: "1 week ago",
      text: "Their smash burger rivals high-end gourmet burger joints in New York. Juicy, perfectly seasoned, and the packaging kept it steaming hot until home.",
    },
    {
      id: 4,
      name: "Zara & Farhan",
      role: "Couple Dining",
      rating: 5,
      initials: "ZF",
      favorite: "Truffle Pasta & Mint Margarita",
      date: "2 weeks ago",
      text: "The pasta sauce is decadently rich yet balanced. Highly recommend reserving a table on the rooftop terrace for the best candlelit view!",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5, favorite: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const names = newReview.name.trim().split(" ");
    const initials = names.length > 1 ? `${names[0][0]}${names[1][0]}`.toUpperCase() : names[0].slice(0, 2).toUpperCase();

    const added = {
      id: Date.now(),
      name: newReview.name,
      role: "Verified Guest",
      rating: Number(newReview.rating),
      initials: initials || "ZG",
      favorite: newReview.favorite || "Chef's Special",
      date: "Just now",
      text: newReview.text,
    };

    setReviewsList([added, ...reviewsList]);
    setCurrentIndex(0);
    setModalOpen(false);
    setNewReview({ name: "", text: "", rating: 5, favorite: "" });
  };

  const current = reviewsList[currentIndex];

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-title">Words of Love</span>
          <h2 className="main-title">What Our Guests Say</h2>
          <p className="desc">
            Over 2,400 glowing reviews from families, couples, and food connoisseurs who make 
            Zaffron their second home.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div style={styles.reviewWrapper} className="glass-card">
          <div style={styles.quoteIcon}>“</div>

          <div style={styles.cardInner}>
            <div style={styles.starsRow}>
              <div style={{ display: "flex", gap: "3px" }}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <StarIcon key={i} size={18} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <span style={styles.ratingNumber}>{current.rating}.0 / 5.0</span>
            </div>

            <p style={styles.reviewText}>"{current.text}"</p>

            <div style={styles.metaRow}>
              <div style={styles.avatarCircle}>{current.initials}</div>
              <div>
                <div style={styles.reviewerName}>{current.name}</div>
                <div style={styles.reviewerRole}>{current.role} • <span style={{ color: "#94a3b8" }}>{current.date}</span></div>
                <div style={styles.favoritePill}>
                  <UtensilsIcon size={13} color="#f59e0b" />
                  <span style={{ marginLeft: "6px" }}>Recommended: <b style={{ color: "#fbbf24" }}>{current.favorite}</b></span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={styles.controlsRow}>
            <div style={styles.dotsRow}>
              {reviewsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    ...styles.dot,
                    background: idx === currentIndex ? "#f59e0b" : "rgba(255,255,255,0.2)",
                    width: idx === currentIndex ? "24px" : "8px",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div style={styles.btnNavGroup}>
              <button
                onClick={() => setCurrentIndex((p) => (p - 1 + reviewsList.length) % reviewsList.length)}
                style={styles.navBtn}
                aria-label="Previous Review"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentIndex((p) => (p + 1) % reviewsList.length)}
                style={styles.navBtn}
                aria-label="Next Review"
              >
                →
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={styles.writeBtn}
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Modal for adding review */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "22px", color: "#fff" }}>Share Your Dining Experience</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}
                  aria-label="Close review modal"
                >
                  <CloseIcon size={18} color="#fff" />
                </button>
              </div>

              <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Khan"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    style={styles.modalInput}
                  >
                    <option value="5">5.0 / 5.0 - Exceptional</option>
                    <option value="4">4.0 / 5.0 - Great</option>
                    <option value="3">3.0 / 5.0 - Good</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Favorite Dish Ordered</label>
                  <input
                    type="text"
                    placeholder="e.g. Chicken Tikka, Fettuccine Pasta..."
                    value={newReview.favorite}
                    onChange={(e) => setNewReview({ ...newReview, favorite: e.target.value })}
                    style={styles.modalInput}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Your Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the flavors, ambience, and service..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    style={{ ...styles.modalInput, resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: "10px", width: "100%", padding: "14px" }}>
                  Post Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#090b10",
  },
  reviewWrapper: {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "clamp(20px, 4vw, 40px) clamp(16px, 4vw, 40px)",
    borderRadius: "28px",
    position: "relative",
    overflow: "hidden",
  },
  quoteIcon: {
    position: "absolute",
    top: "14px",
    right: "clamp(14px, 3vw, 30px)",
    fontSize: "clamp(60px, 8vw, 90px)",
    fontFamily: "serif",
    color: "rgba(245, 158, 11, 0.08)",
    lineHeight: 1,
    userSelect: "none",
  },
  cardInner: {
    position: "relative",
    zIndex: 2,
  },
  starsRow: {
    color: "#fbbf24",
    fontSize: "20px",
    letterSpacing: "3px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  ratingNumber: {
    fontSize: "13px",
    fontWeight: 800,
    color: "#f59e0b",
  },
  reviewText: {
    fontSize: "clamp(15px, 2vw, 21px)",
    fontFamily: "'Playfair Display', serif",
    lineHeight: 1.6,
    color: "#f8fafc",
    marginBottom: "24px",
    fontStyle: "italic",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatarCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.15)",
    border: "1.5px solid rgba(245, 158, 11, 0.4)",
    display: "grid",
    placeItems: "center",
    fontSize: "15px",
    fontWeight: "800",
    color: "#fbbf24",
    letterSpacing: "1px",
    flexShrink: 0,
  },
  reviewerName: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#ffffff",
  },
  reviewerRole: {
    fontSize: "13px",
    color: "#f59e0b",
    fontWeight: 600,
  },
  favoritePill: {
    fontSize: "12px",
    color: "#cbd5e1",
    marginTop: "4px",
  },
  controlsRow: {
    marginTop: "32px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  dotsRow: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  dot: {
    height: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnNavGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    transition: "all 0.2s ease",
  },
  writeBtn: {
    padding: "10px 20px",
    fontSize: "13px",
  },
  modalInput: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    outline: "none",
  },
};