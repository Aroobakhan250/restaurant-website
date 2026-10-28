import { Link } from "react-router-dom";

export default function About() {
  const milestones = [
    { year: "2018", title: "The Humble Spark", desc: "Started as an intimate 6-table bistro passionate about authentic charcoal meats and handmade pasta." },
    { year: "2020", title: "Culinary Accolade", desc: "Awarded Best Emerging Contemporary Dining for our signature 72-hour fermented sourdough crusts." },
    { year: "2022", title: "Grand Expansion", desc: "Unveiled our flagship multi-tiered dining hall, romantic rooftop terrace, and private VIP lounge." },
    { year: "2024", title: "Gold Ribbon Recognition", desc: "Ranked among top gourmet destinations with over 45,000 satisfied guests and 4.9 / 5.0 rating." },
  ];

  const team = [
    {
      name: "Chef Marco Laurent",
      role: "Executive Culinary Director",
      bio: "18 years of Michelin-star experience in Florence & Lyon, specializing in artisanal pastas and European sauces.",
      img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Chef Tariq Mehmood",
      role: "Master Pitmaster & Desi Head Chef",
      bio: "Master of ancient tandoori charcoal grilling, delicate aromatic saffron spices, and traditional shinwari techniques.",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Elena Rostova",
      role: "Head Pastry & Dessert Artisan",
      bio: "Parisian pastry academy graduate, handcrafted molten Belgian chocolate cakes and artisan Italian gelato.",
      img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Hero Banner */}
        <div style={styles.heroBanner}>
          <span className="pill-badge" style={{ marginBottom: "14px" }}>
            The Zaffron Heritage
          </span>
          <h1 style={styles.title} className="serif">
            A Legacy of <span className="gold-text">Culinary Passion</span> & Perfection
          </h1>
          <p style={styles.subtitle}>
            Founded on the belief that fine food has the power to bring people together, 
            inspire awe, and evoke cherished memories that last a lifetime.
          </p>
        </div>

        {/* Story Section */}
        <div style={styles.storyGrid}>
          <div style={styles.storyText}>
            <span style={styles.sectionTag}>Our Philosophy</span>
            <h2 style={styles.sectionTitle} className="serif">
              Where Ancient Charcoal Meets Modern Gastronomic Art
            </h2>
            <p style={styles.paragraph}>
              At Zaffron, food is treated not as a commercial product, but as an art form. 
              Every recipe is the result of years of culinary exploration, balancing smoky ancestral 
              fire cooking with classical European finesse.
            </p>
            <p style={styles.paragraph}>
              We believe in uncompromised sourcing: our meats are 100% certified grain-fed and Halal, 
              our herbs and greens are hand-harvested daily at dawn, and our stone-milled flours are 
              fermented naturally without chemical leaveners.
            </p>

            <div style={styles.quoteCard} className="glass-card">
              <p style={{ fontStyle: "italic", color: "#fbbf24", fontSize: "16px", margin: 0 }}>
                "We don't cut corners. If a stock takes 14 hours to extract its purest essence, 
                we simmer it for 14 hours. That is the Zaffron promise."
              </p>
              <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                — Executive Chef Marco Laurent
              </div>
            </div>
          </div>

          <div style={styles.storyImages}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
              alt="Zaffron Restaurant Ambience"
              style={styles.mainImg}
              className="glass-card"
            />
          </div>
        </div>

        {/* Milestone Timeline */}
        <div style={{ marginTop: "80px" }}>
          <div className="section-header">
            <span className="sub-title">Our Evolution</span>
            <h2 className="main-title">Milestones on Our Journey</h2>
            <p className="desc">
              From our first charcoal grill in 2018 to being recognized as a culinary benchmark today.
            </p>
          </div>

          <div style={styles.milestoneGrid}>
            {milestones.map((m, idx) => (
              <div key={idx} className="glass-card" style={styles.milestoneCard}>
                <div style={styles.yearBadge}>{m.year}</div>
                <h3 style={{ fontSize: "18px", color: "#fff", margin: "14px 0 8px" }}>{m.title}</h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Artisans (Team) */}
        <div style={{ marginTop: "90px" }}>
          <div className="section-header">
            <span className="sub-title">The Culinary Masters</span>
            <h2 className="main-title">Meet the Masters Behind the Menu</h2>
            <p className="desc">
              Decades of combined culinary artistry dedicated to delighting your palate.
            </p>
          </div>

          <div style={styles.teamGrid} className="universal-3-col-grid">
            {team.map((chef, idx) => (
              <div key={idx} className="glass-card" style={styles.teamCard}>
                <div style={styles.chefImgWrap}>
                  <img src={chef.img} alt={chef.name} style={styles.chefPhoto} />
                </div>
                <div style={{ padding: "20px" }}>
                  <span style={styles.chefRole}>{chef.role}</span>
                  <h3 style={{ fontSize: "18px", color: "#fff", margin: "6px 0 10px" }}>{chef.name}</h3>
                  <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                    {chef.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div style={styles.ctaCard} className="glass-card">
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", color: "#fff" }} className="serif">
            Ready to Taste the Craftsmanship?
          </h2>
          <p style={{ color: "#cbd5e1", maxWidth: "560px", margin: "12px auto 28px", fontSize: "15px" }}>
            Join us for lunch or dinner. Book an exquisite table or order our signature dishes directly to your home.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/reservation" className="btn-primary" style={{ padding: "14px 32px" }}>
              Book a Table Now →
            </Link>
            <Link to="/menu" className="btn-ghost" style={{ padding: "14px 28px" }}>
              Explore Complete Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "50px 0 100px 0",
    minHeight: "100vh",
    background: "#0c0e14",
  },
  heroBanner: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 60px auto",
  },
  title: {
    fontSize: "clamp(34px, 4.5vw, 52px)",
    color: "#ffffff",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "17px",
    color: "#94a3b8",
    lineHeight: 1.7,
  },
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "clamp(24px, 4vw, 50px)",
    alignItems: "center",
  },
  storyText: {
    display: "flex",
    flexDirection: "column",
  },
  sectionTag: {
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#f59e0b",
    marginBottom: "10px",
  },
  sectionTitle: {
    fontSize: "clamp(22px, 3vw, 36px)",
    color: "#ffffff",
    lineHeight: 1.3,
    marginBottom: "18px",
  },
  paragraph: {
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: 1.7,
    marginBottom: "14px",
  },
  quoteCard: {
    padding: "18px 20px",
    borderRadius: "18px",
    borderLeft: "4px solid #f59e0b",
    background: "rgba(245, 158, 11, 0.08)",
    marginTop: "14px",
  },
  storyImages: {
    position: "relative",
  },
  mainImg: {
    width: "100%",
    height: "clamp(280px, 45vw, 460px)",
    objectFit: "cover",
    borderRadius: "26px",
    display: "block",
  },
  milestoneGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: "18px",
  },
  milestoneCard: {
    padding: "24px 20px",
    borderRadius: "22px",
  },
  yearBadge: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: "999px",
    background: "rgba(245, 158, 11, 0.18)",
    color: "#fbbf24",
    fontWeight: 900,
    fontSize: "14px",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "clamp(10px, 2vw, 22px)",
  },
  teamCard: {
    borderRadius: "22px",
    overflow: "hidden",
  },
  chefImgWrap: {
    height: "260px",
    overflow: "hidden",
  },
  chefPhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  chefRole: {
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#f59e0b",
  },
  ctaCard: {
    marginTop: "70px",
    padding: "clamp(30px, 5vw, 60px) clamp(16px, 4vw, 30px)",
    textAlign: "center",
    borderRadius: "32px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(19, 23, 34, 0.95))",
    border: "1px solid rgba(245, 158, 11, 0.35)",
  },
};