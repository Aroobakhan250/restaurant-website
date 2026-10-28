import { Link } from "react-router-dom";
import { 
  PhoneIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TikTokIcon, 
  WhatsAppIcon 
} from "./common/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.col}>
            <Link to="/" style={styles.brand}>
              <div style={styles.logoBadge}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "19px", color: "#fbbf24" }}>
                  Z
                </span>
              </div>
              <div>
                <div style={styles.brandTitle}>ZAFFRON</div>
                <div style={styles.brandSub}>ARTISAN & FINE DINING</div>
              </div>
            </Link>
            <p style={styles.brandDesc}>
              A celebration of fire, spice, and passion. Crafted with 100% fresh Halal ingredients, 
              ancient charcoal techniques, and heartfelt hospitality.
            </p>
            <div style={styles.badgePill}>
              <ShieldCheckIcon size={14} color="#34d399" />
              <span>100% Certified Halal & Fresh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Quick Navigation</h4>
            <div style={styles.linkList}>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/menu" style={styles.link}>Artisan Menu</Link>
              <Link to="/reservation" style={styles.link}>Book a Table</Link>
              <Link to="/about" style={styles.link}>Our Story & Chefs</Link>
              <Link to="/contact" style={styles.link}>Contact & Location</Link>
            </div>
          </div>

          {/* Categories */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Cuisine Highlights</h4>
            <div style={styles.linkList}>
              <Link to="/menu?cat=Main%20Course" style={styles.link}>Royal Main Course</Link>
              <Link to="/menu?cat=BBQ" style={styles.link}>Charcoal Grilled BBQ</Link>
              <Link to="/menu?cat=Fast%20Food" style={styles.link}>Gourmet Smash Burgers</Link>
              <Link to="/menu?cat=Fast%20Food" style={styles.link}>Woodfired Sourdough Pizzas</Link>
              <Link to="/menu?cat=Desserts" style={styles.link}>Belgian Lava & Gelato</Link>
            </div>
          </div>

          {/* Operating Hours & Contact */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Hours & Location</h4>
            <p style={styles.hoursText}>
              <b>Lunch:</b> 12:00 PM – 04:00 PM<br />
              <b>Dinner:</b> 07:00 PM – 11:30 PM<br />
              <b>Late Delivery:</b> Until 01:00 AM
            </p>
            <div style={styles.contactRow}>
              <PhoneIcon size={14} color="#fbbf24" />
              <a href="tel:+923005557890" style={styles.contactLink}>
                +92 (300) 555-7890
              </a>
            </div>
            <div style={styles.contactRow}>
              <MapPinIcon size={14} color="#fbbf24" />
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                Main Boulevard, Gulberg III, Lahore
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {currentYear} Zaffron Restaurant & Bistro. All rights reserved.
          </p>

          <div style={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialIcon} title="Instagram" aria-label="Instagram">
              <InstagramIcon size={16} color="#fbbf24" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialIcon} title="Facebook" aria-label="Facebook">
              <FacebookIcon size={16} color="#fbbf24" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={styles.socialIcon} title="TikTok" aria-label="TikTok">
              <TikTokIcon size={16} color="#fbbf24" />
            </a>
            <a href="https://wa.me/923005557890" target="_blank" rel="noreferrer" style={styles.socialIcon} title="WhatsApp" aria-label="WhatsApp">
              <WhatsAppIcon size={16} color="#fbbf24" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#080a0f",
    borderTop: "1px solid rgba(245, 158, 11, 0.2)",
    padding: "clamp(45px, 6vw, 70px) 0 30px 0",
    color: "#cbd5e1",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
    gap: "clamp(24px, 4vw, 40px)",
    marginBottom: "36px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    marginBottom: "16px",
  },
  logoBadge: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "rgba(245, 158, 11, 0.2)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
  },
  brandTitle: {
    fontSize: "20px",
    fontWeight: 900,
    letterSpacing: "2px",
    color: "#fff",
    fontFamily: "'Playfair Display', serif",
  },
  brandSub: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#f59e0b",
  },
  brandDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.6,
    marginBottom: "16px",
  },
  badgePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "999px",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    color: "#34d399",
    fontSize: "12px",
    fontWeight: 700,
    width: "fit-content",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "18px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s ease",
  },
  hoursText: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.6,
    marginBottom: "14px",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  contactLink: {
    color: "#fbbf24",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
  },
  bottomBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    paddingTop: "24px",
  },
  copyright: {
    fontSize: "13px",
    color: "#64748b",
    margin: 0,
  },
  socials: {
    display: "flex",
    gap: "12px",
  },
  socialIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "grid",
    placeItems: "center",
    fontSize: "16px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};