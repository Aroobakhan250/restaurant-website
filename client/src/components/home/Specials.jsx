import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ClockIcon, StarIcon } from "../common/Icons";

export default function Specials() {
  const { addToCart } = useCart();

  const specials = [
    {
      id: 101,
      name: "Zaffron Royal Grilled Chicken",
      category: "Chef's Special",
      price: 1299,
      originalPrice: 1550,
      rating: "4.9",
      reviews: 142,
      tag: "Best Seller",
      calories: "620 kcal",
      time: "25 min",
      desc: "Charcoal-smoked half chicken marinated in artisanal secret spices with garlic dip and butter naan.",
      img: "/images/specials/chicken.jpg",
    },
    {
      id: 102,
      name: "Truffle Alfredo Fettuccine",
      category: "Pasta & Italian",
      price: 999,
      originalPrice: 1200,
      rating: "4.8",
      reviews: 98,
      tag: "Chef's Choice",
      calories: "540 kcal",
      time: "20 min",
      desc: "Silky fettuccine ribbons in rich parmesan cream, wild mushrooms, and black truffle infused glaze.",
      img: "/images/specials/pasta.jpg",
    },
    {
      id: 103,
      name: "Prime Double Smash Beast",
      category: "Gourmet Burgers",
      price: 899,
      originalPrice: 1050,
      rating: "5.0",
      reviews: 210,
      tag: "Most Popular",
      calories: "780 kcal",
      time: "15 min",
      desc: "Double Angus smash patties, caramelized onions, smoked gouda, and house secret burger relish.",
      img: "/images/specials/burger.jpg",
    },
    {
      id: 104,
      name: "Woodfired Rustic Pepperoni",
      category: "Artisan Pizza",
      price: 1499,
      originalPrice: 1750,
      rating: "4.9",
      reviews: 184,
      tag: "Signature Dish",
      calories: "850 kcal",
      time: "20 min",
      desc: "Slow-fermented sourdough crust topped with San Marzano tomatoes, buffalo mozzarella & crispy beef pepperoni.",
      img: "/images/specials/pizza.jpg",
    },
  ];

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-title">Daily Limited Offerings</span>
          <h2 className="main-title">Today’s Chef Specials</h2>
          <p className="desc">
            Handcrafted in limited batches daily. Prepared with rare spices and premium cuts 
            personally inspected by our Executive Chef.
          </p>
        </div>

        {/* Grid */}
        <div style={styles.grid} className="dish-3-col-grid universal-3-col-grid">
          {specials.map((dish) => (
            <div key={dish.id} className="glass-card menu-card special-card" style={styles.card}>
              {/* Image & Badge */}
              <div
                style={{
                  ...styles.cardImg,
                  backgroundImage: `url(${dish.img})`,
                }}
                className="menu-card-img-wrap special-card-img"
              >
                <div style={styles.imgOverlay} />
                <span style={styles.tagBadge} className="menu-card-cat-badge">{dish.tag}</span>
                <span style={styles.timeBadge} className="menu-card-time-badge">
                  <ClockIcon size={12} color="#cbd5e1" />
                  <span>{dish.time}</span>
                </span>
              </div>

              {/* Body */}
              <div style={styles.body} className="menu-card-body">
                <div style={styles.metaRow} className="menu-card-title-row">
                  <span style={styles.category}>{dish.category}</span>
                  <span style={styles.rating} className="menu-card-rating">
                    <StarIcon size={12} />
                    <span>{dish.rating} ({dish.reviews})</span>
                  </span>
                </div>

                <h3 style={styles.title} className="menu-card-title">{dish.name}</h3>
                <p style={styles.desc} className="menu-card-desc">{dish.desc}</p>

                <div style={styles.nutritionRow} className="menu-card-meta">
                  <span>{dish.calories}</span>
                  <span>•</span>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>100% Halal</span>
                </div>

                {/* Price and CTA */}
                <div style={styles.footer} className="menu-card-footer">
                  <div className="menu-card-price-block">
                    <div style={styles.originalPrice} className="menu-card-orig-price">Rs {dish.originalPrice}</div>
                    <div style={styles.price} className="menu-card-price">Rs {dish.price}</div>
                  </div>

                  <div className="menu-card-btn-row">
                    <button
                      onClick={() => addToCart(dish)}
                      className="btn-primary menu-card-add-btn"
                      style={styles.addBtn}
                    >
                      <span>+ Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Banner */}
        <div style={styles.ctaBanner} className="glass-card">
          <div>
            <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
              Craving more delicious options?
            </h4>
            <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
              Discover our complete menu of over 50+ appetizers, grills, pasta, curries, and beverages.
            </p>
          </div>
          <Link to="/menu" className="btn-primary" style={{ padding: "12px 28px", fontSize: "14px" }}>
            Browse 50+ Dishes →
          </Link>
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
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "clamp(10px, 2vw, 24px)",
    marginBottom: "40px",
  },
  card: {
    overflow: "hidden",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
  },
  cardImg: {
    height: "190px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,14,20,0.85) 100%)",
  },
  tagBadge: {
    position: "absolute",
    top: "14px",
    left: "14px",
    background: "rgba(245, 158, 11, 0.9)",
    color: "#0c0e14",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 900,
    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
  },
  timeBadge: {
    position: "absolute",
    bottom: "12px",
    right: "14px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "#e2e8f0",
    padding: "4px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 700,
  },
  body: {
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  category: {
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#f59e0b",
  },
  rating: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#fbbf24",
  },
  title: {
    fontSize: "19px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "8px",
  },
  desc: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.5,
    marginBottom: "14px",
    flex: 1,
  },
  nutritionRow: {
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "18px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "14px",
  },
  originalPrice: {
    fontSize: "12px",
    color: "#64748b",
    textDecoration: "line-through",
  },
  price: {
    fontSize: "20px",
    fontWeight: 900,
    color: "#fbbf24",
  },
  addBtn: {
    padding: "10px 20px",
    fontSize: "14px",
  },
  ctaBanner: {
    padding: "clamp(20px, 3vw, 26px) clamp(16px, 4vw, 32px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(19, 23, 34, 0.8))",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    borderRadius: "20px",
  },
};