import { useState } from "react";
import { useCart } from "../context/CartContext";
import { submitContactAPI } from "../services/api";
import { 
  MapPinIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  ClockIcon, 
  MailIcon, 
  CheckIcon, 
  CreditCardIcon 
} from "../components/common/Icons";

export default function Contact() {
  const { showToast } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;

    submitContactAPI(form);
    setSubmitted(true);
    showToast("Message received! Our team will contact you shortly.");
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
    }, 4000);
  };

  const faqs = [
    {
      q: "Is all your meat 100% Halal certified?",
      a: "Yes, absolutely. All our poultry, mutton, and beef cuts are 100% certified Halal, grain-fed, and sourced daily from verified local ethical farms.",
    },
    {
      q: "Do you offer private dining halls for corporate events or weddings?",
      a: "Yes! Our Royal VIP Lounge and Rooftop Terrace can host intimate gatherings of 20 to 120 guests with customized chef menus, dedicated butler service, and audiovisual setups.",
    },
    {
      q: "What is your delivery radius and estimated arrival time?",
      a: "We deliver across a 12 km radius. Orders are sealed in thermal insulated containers and typically arrive piping hot in 30 to 40 minutes.",
    },
    {
      q: "Is complimentary valet parking available at the venue?",
      a: "Yes, we provide secure complimentary valet parking for all our guests right at the main foyer entrance.",
    },
    {
      q: "Can you customize dishes for gluten-free or specific allergen diets?",
      a: "Certainly. When placing an order or reserving a table, please notify us of any allergies. Our chefs prepare customized allergen-safe dishes in dedicated cookware.",
    },
  ];

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <span className="pill-badge" style={{ marginBottom: "12px" }}>
            Reach Out to Us
          </span>
          <h1 style={styles.title} className="serif">
            Contact & <span className="gold-text">Hospitality Concierge</span>
          </h1>
          <p style={styles.subtitle}>
            Have an inquiry about table bookings, private caterings, or customized culinary menus? 
            Our team is at your service 7 days a week.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div style={styles.cardsGrid}>
          <div className="glass-card" style={styles.contactCard}>
            <div style={styles.cardIcon}>
              <MapPinIcon size={22} color="#f59e0b" />
            </div>
            <h3 style={styles.cardHeading}>Flagship Address</h3>
            <p style={styles.cardText}>
              Plot 42-B, Main Boulevard, Gulberg III, Near Liberty Roundabout, Lahore, Pakistan
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              style={styles.cardLink}
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="glass-card" style={styles.contactCard}>
            <div style={styles.cardIcon}>
              <PhoneIcon size={22} color="#f59e0b" />
            </div>
            <h3 style={styles.cardHeading}>Hotline & WhatsApp</h3>
            <p style={styles.cardText}>
              Direct Reservations: <b>+92 (300) 555-7890</b><br />
              Order Helpline: <b>+92 (42) 3578-9000</b>
            </p>
            <a
              href="https://wa.me/923005557890?text=Hi%20Zaffron%20Restaurant,%20I%20would%20like%20to%20inquire%20about..."
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.cardLink, color: "#10b981", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <WhatsAppIcon size={15} color="#10b981" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="glass-card" style={styles.contactCard}>
            <div style={styles.cardIcon}>
              <ClockIcon size={22} color="#f59e0b" />
            </div>
            <h3 style={styles.cardHeading}>Service Hours</h3>
            <p style={styles.cardText}>
              <b>Lunch Service:</b> 12:00 PM – 04:00 PM<br />
              <b>Dinner Service:</b> 07:00 PM – 11:30 PM<br />
              <b>Late Night Delivery:</b> Until 01:00 AM
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#10b981", fontWeight: 700 }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              <span>Open 7 Days a Week</span>
            </div>
          </div>

          <div className="glass-card" style={styles.contactCard}>
            <div style={styles.cardIcon}>
              <MailIcon size={22} color="#f59e0b" />
            </div>
            <h3 style={styles.cardHeading}>Email Concierge</h3>
            <p style={styles.cardText}>
              General: <b>concierge@zaffron.com</b><br />
              Events: <b>events@zaffron.com</b>
            </p>
            <a href="mailto:concierge@zaffron.com" style={styles.cardLink}>
              Send Direct Email →
            </a>
          </div>
        </div>

        {/* Contact Form & Map Section */}
        <div style={styles.formSection}>
          <div style={styles.formCol} className="glass-card">
            <h2 style={{ color: "#fff", fontSize: "24px", marginBottom: "8px" }} className="serif">
              Send Us a Message
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
              Fill in the form below and our general manager will respond within 2 hours.
            </p>

            {submitted ? (
              <div style={styles.submittedAlert}>
                <CheckIcon size={28} color="#10b981" />
                <div>
                  <h4 style={{ color: "#fbbf24", margin: "0 0 4px 0" }}>Message Sent!</h4>
                  <p style={{ color: "#cbd5e1", fontSize: "13px", margin: 0 }}>
                    Thank you. We have received your inquiry and will contact you promptly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={styles.formRow2}>
                  <div>
                    <label style={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bilal Ahmed"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formRow2}>
                  <div>
                    <label style={styles.label}>Email Address</label>
                    <input
                      type="email"
                      placeholder="bilal@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Inquiry Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={styles.select}
                    >
                      <option value="general">General Question</option>
                      <option value="reservation">Table Reservation Assistance</option>
                      <option value="catering">Private Party / Catering</option>
                      <option value="feedback">Feedback / Compliment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist your dining experience today?..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...styles.input, resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: "14px", marginTop: "8px" }}>
                  Submit Inquiry Message →
                </button>
              </form>
            )}
          </div>

          {/* Location & Map Card */}
          <div style={styles.mapCol} className="glass-card">
            <h3 style={{ color: "#fff", fontSize: "20px", marginBottom: "8px" }}>Visit Our Sanctuary</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
              Located in the vibrant heart of the city with dedicated valet attendants and easy access.
            </p>

            <div style={styles.mapVisual}>
              <div style={styles.mapPin}>
                <MapPinIcon size={26} color="#f59e0b" />
                <div style={styles.mapPinLabel}>
                  <b style={{ color: "#fff" }}>Zaffron Restaurant</b>
                  <span style={{ fontSize: "11px", color: "#fbbf24", display: "block" }}>
                    Valet Parking Entrance
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.amenitiesGrid}>
              <div style={styles.amenityItem}>
                <CheckIcon size={14} color="#10b981" />
                <span style={{ fontSize: "12px", color: "#cbd5e1" }}>Free Valet Parking</span>
              </div>
              <div style={styles.amenityItem}>
                <CheckIcon size={14} color="#10b981" />
                <span style={{ fontSize: "12px", color: "#cbd5e1" }}>Complimentary High-speed Wi-Fi</span>
              </div>
              <div style={styles.amenityItem}>
                <CheckIcon size={14} color="#10b981" />
                <span style={{ fontSize: "12px", color: "#cbd5e1" }}>Wheelchair Accessible</span>
              </div>
              <div style={styles.amenityItem}>
                <CreditCardIcon size={14} color="#10b981" />
                <span style={{ fontSize: "12px", color: "#cbd5e1" }}>All Cards & Wallets Accepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: "90px" }}>
          <div className="section-header">
            <span className="sub-title">Got Questions?</span>
            <h2 className="main-title">Frequently Asked Questions</h2>
            <p className="desc">
              Everything you need to know about dining, reservations, and deliveries at Zaffron.
            </p>
          </div>

          <div style={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={styles.faqCard}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div style={styles.faqQuestionRow}>
                  <h4 style={styles.faqQuestion}>{faq.q}</h4>
                  <span style={styles.faqChevron}>
                    {activeFaq === idx ? "▲" : "▼"}
                  </span>
                </div>
                {activeFaq === idx && (
                  <p style={styles.faqAnswer}>{faq.a}</p>
                )}
              </div>
            ))}
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
  header: {
    textAlign: "center",
    maxWidth: "760px",
    margin: "0 auto 50px auto",
  },
  title: {
    fontSize: "clamp(32px, 4.5vw, 48px)",
    color: "#ffffff",
    marginBottom: "14px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    lineHeight: 1.6,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: "20px",
    marginBottom: "50px",
  },
  contactCard: {
    padding: "clamp(20px, 3.5vw, 30px) clamp(16px, 3.5vw, 24px)",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
  },
  cardIcon: {
    fontSize: "30px",
    marginBottom: "14px",
  },
  cardHeading: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: 1.6,
    marginBottom: "16px",
    flex: 1,
  },
  cardLink: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#fbbf24",
    textDecoration: "none",
  },
  formSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "24px",
  },
  formCol: {
    padding: "clamp(20px, 4vw, 36px) clamp(14px, 4vw, 36px)",
    borderRadius: "26px",
  },
  formRow2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#cbd5e1",
    fontWeight: 700,
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-sans)",
  },
  select: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
  },
  submittedAlert: {
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.35)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  mapCol: {
    padding: "clamp(20px, 4vw, 36px) clamp(14px, 4vw, 36px)",
    borderRadius: "26px",
    display: "flex",
    flexDirection: "column",
  },
  mapVisual: {
    height: "220px",
    borderRadius: "18px",
    background: "radial-gradient(circle at center, #1e293b, #0f172a)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    display: "grid",
    placeItems: "center",
    marginBottom: "24px",
  },
  mapPin: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(12, 14, 20, 0.9)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    padding: "10px 18px",
    borderRadius: "999px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },
  mapPinLabel: {
    textAlign: "left",
  },
  amenitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
    gap: "12px",
    marginTop: "auto",
  },
  amenityItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.04)",
  },
  faqList: {
    maxWidth: "840px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  faqCard: {
    padding: "20px 24px",
    borderRadius: "18px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  faqQuestionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  },
  faqQuestion: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
  },
  faqChevron: {
    fontSize: "12px",
    color: "#f59e0b",
  },
  faqAnswer: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: 1.6,
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
};