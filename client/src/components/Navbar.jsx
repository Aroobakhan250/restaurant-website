import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartIcon, CalendarIcon, PhoneIcon } from "./common/Icons";

export default function Navbar() {
  const { cartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div style={styles.topBar}>
        <div className="container" style={styles.topBarInner}>
          <div style={styles.topBarLeft} className="top-bar-announcement-left">
            <span style={styles.liveDot} />
            <span style={{ fontSize: "12px", fontWeight: 600 }}>
              Live Kitchen: <b style={{ color: "#fbbf24" }}>Open Now</b> until 11:30 PM
            </span>
          </div>
          <div style={styles.topBarRight} className="top-bar-announcement-right">
            <span style={{ fontSize: "12px", opacity: 0.85, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <PhoneIcon size={12} color="#fbbf24" />
              <span>Hotline: <b>+92 (300) 555-7890</b></span>
            </span>
            <span style={styles.divider}>|</span>
            <span style={{ fontSize: "12px", color: "#fbbf24", fontWeight: 700 }}>
              Code 'ZAFFRON20' for 20% OFF
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        style={{
          ...styles.header,
          background: scrolled
            ? "rgba(12, 14, 20, 0.94)"
            : "rgba(12, 14, 20, 0.82)",
          boxShadow: scrolled ? "0 10px 30px rgba(0, 0, 0, 0.6)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(245, 158, 11, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="container" style={styles.inner}>
          {/* Brand Logo */}
          <Link to="/" style={styles.brand}>
            <div style={styles.logoBadge}>
              <span style={styles.crown}>Z</span>
            </div>
            <div>
              <div style={styles.brandTitle}>ZAFFRON</div>
              <div style={styles.brandSub}>ARTISAN & FINE DINING</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={styles.desktopNav} className="nav-desktop-links">
            <NavLink to="/" style={linkStyle} end>
              Home
            </NavLink>
            <NavLink to="/menu" style={linkStyle}>
              Menu
            </NavLink>
            <NavLink to="/reservation" style={linkStyle}>
              Reservation
            </NavLink>
            <NavLink to="/about" style={linkStyle}>
              About Us
            </NavLink>
            <NavLink to="/contact" style={linkStyle}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div style={styles.actions}>
            <Link to="/reservation" className="btn-ghost nav-reserve-link" style={styles.reserveBtn}>
              <CalendarIcon size={13} color="#fbbf24" />
              <span>Book Table</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              style={styles.cartBtn}
              title="Open Cart"
              aria-label="View Shopping Cart"
            >
              <CartIcon size={16} color="#fbbf24" />
              <span style={styles.cartText}>Cart</span>
              <span style={styles.cartBadge}>{cartCount}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.hamburger}
              className="nav-hamburger-btn"
              aria-label="Toggle Navigation Menu"
            >
              <span style={{
                ...styles.bar,
                transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                transition: "transform 0.2s ease"
              }}></span>
              <span style={{
                ...styles.bar,
                opacity: mobileMenuOpen ? 0 : 1,
                transition: "opacity 0.2s ease"
              }}></span>
              <span style={{
                ...styles.bar,
                transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                transition: "transform 0.2s ease"
              }}></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileNav}>
            <NavLink
              to="/"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu & Ordering
            </NavLink>
            <NavLink
              to="/reservation"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Table Reservation
            </NavLink>
            <NavLink
              to="/about"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Zaffron
            </NavLink>
            <NavLink
              to="/contact"
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact & Location
            </NavLink>
            <Link
              to="/reservation"
              className="btn-primary"
              style={{ marginTop: "8px", padding: "12px 20px", width: "100%", justifyContent: "center" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <CalendarIcon size={14} color="#0c0e14" />
              <span>Book Table Online</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

function linkStyle({ isActive }) {
  return {
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "15px",
    color: isActive ? "#fbbf24" : "rgba(241, 245, 249, 0.82)",
    padding: "8px 12px",
    position: "relative",
    transition: "color 0.2s ease",
    borderBottom: isActive ? "2px solid #f59e0b" : "2px solid transparent",
  };
}

const styles = {
  topBar: {
    background: "#080a0f",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "6px 0",
    color: "#cbd5e1",
  },
  topBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
  },
  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
    boxShadow: "0 0 10px #10b981",
    animation: "pulse 2s infinite",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  divider: {
    opacity: 0.3,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    transition: "all 0.3s ease",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  },
  logoBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.08))",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 0 16px rgba(245, 158, 11, 0.2)",
  },
  crown: {
    fontSize: "20px",
  },
  brandTitle: {
    fontSize: "22px",
    fontWeight: 900,
    letterSpacing: "2.5px",
    color: "#ffffff",
    fontFamily: "'Playfair Display', serif",
  },
  brandSub: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#f59e0b",
  },
  desktopNav: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  reserveBtn: {
    padding: "9px 20px",
    fontSize: "14px",
    display: "inline-flex",
  },
  cartBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 18px",
    borderRadius: "9999px",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "14px",
    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.18)",
    transition: "all 0.2s ease",
  },
  cartText: {
    display: "inline",
  },
  cartBadge: {
    minWidth: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "var(--gold-gradient)",
    color: "#0c0e14",
    fontSize: "12px",
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
    padding: "0 4px",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
  },
  bar: {
    width: "22px",
    height: "2px",
    background: "#f8fafc",
    borderRadius: "2px",
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(14, 18, 28, 0.98)",
    borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
    padding: "16px 24px",
    gap: "12px",
  },
  mobileLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "16px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
};