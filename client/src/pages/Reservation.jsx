import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createReservationAPI } from "../services/api";
import { 
  CheckIcon, 
  DiningTableIcon, 
  SparklesIcon, 
  AwardIcon, 
  LeafIcon, 
  WhatsAppIcon, 
  ShieldCheckIcon 
} from "../components/common/Icons";

export default function Reservation() {
  const { showToast } = useCart();

  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [timeSlot, setTimeSlot] = useState("08:00 PM");
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState("indoor");
  const [occasion, setOccasion] = useState("casual");

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeSlots = [
    { time: "12:30 PM", meal: "Lunch", status: "Available" },
    { time: "01:30 PM", meal: "Lunch", status: "Filling Fast" },
    { time: "02:30 PM", meal: "Lunch", status: "Available" },
    { time: "07:00 PM", meal: "Dinner", status: "Available" },
    { time: "08:00 PM", meal: "Dinner", status: "Popular" },
    { time: "09:00 PM", meal: "Dinner", status: "Filling Fast" },
    { time: "10:00 PM", meal: "Dinner", status: "Available" },
  ];

  const seatingOptions = [
    {
      id: "indoor",
      title: "Intimate Dining Hall",
      desc: "Warm acoustic lighting, velvet booths & gentle background jazz",
      icon: <DiningTableIcon size={26} color="#f59e0b" />,
    },
    {
      id: "rooftop",
      title: "Rooftop Skyline Terrace",
      desc: "Under the stars with panoramic views & romantic candlelights",
      icon: <SparklesIcon size={26} color="#f59e0b" />,
    },
    {
      id: "vip",
      title: "Royal VIP Lounge",
      desc: "Private room, personal butler service & customized chef plating",
      icon: <AwardIcon size={26} color="#f59e0b" />,
    },
    {
      id: "garden",
      title: "Garden Patio",
      desc: "Lush green courtyard seating with soothing fountain ambience",
      icon: <LeafIcon size={26} color="#f59e0b" />,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) {
      showToast("Please provide your name and phone number");
      return;
    }

    const bookingId = "RES-" + Math.floor(1000 + Math.random() * 9000);
    const booking = {
      bookingId,
      date,
      timeSlot,
      guests,
      seatingArea: seatingOptions.find((s) => s.id === seatingArea)?.title || "Standard",
      occasion,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      specialRequests: contact.specialRequests,
    };

    setConfirmedBooking(booking);
    showToast(`Table reserved successfully! Booking ID: #${bookingId}`);

    // Persist to MongoDB
    await createReservationAPI(booking);
  };

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <span className="pill-badge" style={{ marginBottom: "12px" }}>
            Fine Dining Reservations
          </span>
          <h1 style={styles.title} className="serif">
            Reserve Your <span className="gold-text">Unforgettable Table</span>
          </h1>
          <p style={styles.subtitle}>
            Whether it’s an intimate candlelit date, a milestone birthday, or a grand family reunion, 
            allow us to craft an impeccable dining experience for you.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div style={styles.confirmationCard} className="glass-card">
            <div style={styles.checkBadge}>
              <CheckIcon size={28} color="#10b981" />
            </div>
            <h2 style={{ color: "#fff", fontSize: "28px", marginTop: "14px" }} className="serif">
              Table Reservation Confirmed!
            </h2>
            <div style={styles.resIdBadge}>Booking Reference: #{confirmedBooking.bookingId}</div>

            <p style={{ color: "#cbd5e1", fontSize: "15px", marginTop: "14px", maxWidth: "540px", lineHeight: 1.6 }}>
              Dear <b>{confirmedBooking.name}</b>, we have reserved a premier table in our{" "}
              <b>{confirmedBooking.seatingArea}</b> for <b>{confirmedBooking.guests} Guests</b> on{" "}
              <b style={{ color: "#fbbf24" }}>{confirmedBooking.date}</b> at{" "}
              <b style={{ color: "#fbbf24" }}>{confirmedBooking.timeSlot}</b>.
            </p>

            <div style={styles.detailsBox}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Guest Name</span>
                <span style={styles.detailVal}>{confirmedBooking.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Contact Phone</span>
                <span style={styles.detailVal}>{confirmedBooking.phone}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Party Size</span>
                <span style={styles.detailVal}>{confirmedBooking.guests} People</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Date & Time</span>
                <span style={styles.detailVal}>
                  {confirmedBooking.date} • {confirmedBooking.timeSlot}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Atmosphere</span>
                <span style={styles.detailVal}>{confirmedBooking.seatingArea}</span>
              </div>
              {confirmedBooking.specialRequests && (
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Special Notes</span>
                  <span style={styles.detailVal}>{confirmedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            <div style={styles.actionRow}>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="btn-primary"
                style={{ padding: "14px 28px" }}
              >
                Reserve Another Table
              </button>
              <Link to="/menu" className="btn-ghost" style={{ padding: "14px 28px" }}>
                Pre-Order Dishes →
              </Link>
              <a
                href={`https://wa.me/923005557890?text=${encodeURIComponent(
                  `Hi Zaffron, my reservation is confirmed #${confirmedBooking.bookingId} for ${confirmedBooking.guests} guests on ${confirmedBooking.date} at ${confirmedBooking.timeSlot}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ padding: "14px 24px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <WhatsAppIcon size={16} color="#22c55e" />
                <span>WhatsApp Confirmation</span>
              </a>
            </div>
          </div>
        ) : (
          /* Main Reservation Form */
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form} className="glass-card">
              {/* Step 1: Date & Guests */}
              <div style={styles.stepSection}>
                <div style={styles.stepHeader}>
                  <span style={styles.stepNumber}>1</span>
                  <div>
                    <h3 style={styles.stepTitle}>Select Date & Party Size</h3>
                    <p style={styles.stepDesc}>Choose your intended dining date and number of guests</p>
                  </div>
                </div>

                <div style={styles.inputGrid2}>
                  <div>
                    <label style={styles.fieldLabel}>Date of Dining</label>
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>Party Size (Number of Guests)</label>
                    <div style={styles.guestSelector}>
                      {[1, 2, 4, 6, 8, "10+"].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          style={{
                            ...styles.guestBtn,
                            background: guests === num ? "var(--gold-gradient)" : "rgba(255,255,255,0.06)",
                            color: guests === num ? "#0c0e14" : "#fff",
                            borderColor: guests === num ? "transparent" : "rgba(255,255,255,0.12)",
                          }}
                        >
                          {num} {typeof num === "number" && num === 1 ? "Guest" : "Guests"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slot */}
              <div style={styles.stepSection}>
                <div style={styles.stepHeader}>
                  <span style={styles.stepNumber}>2</span>
                  <div>
                    <h3 style={styles.stepTitle}>Choose Time Slot</h3>
                    <p style={styles.stepDesc}>Select from available lunch and dinner service seatings</p>
                  </div>
                </div>

                <div style={styles.timeSlotsGrid}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTimeSlot(slot.time)}
                      style={{
                        ...styles.timeSlotCard,
                        borderColor: timeSlot === slot.time ? "#f59e0b" : "rgba(255,255,255,0.1)",
                        background: timeSlot === slot.time ? "rgba(245, 158, 11, 0.16)" : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" }}>
                        {slot.meal}
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginTop: "2px" }}>
                        {slot.time}
                      </span>
                      <span style={{ ...styles.slotStatusPill, color: timeSlot === slot.time ? "#fbbf24" : "#64748b" }}>
                        {slot.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Seating Atmosphere */}
              <div style={styles.stepSection}>
                <div style={styles.stepHeader}>
                  <span style={styles.stepNumber}>3</span>
                  <div>
                    <h3 style={styles.stepTitle}>Select Preferred Ambience</h3>
                    <p style={styles.stepDesc}>Customize the setting for your dining occasion</p>
                  </div>
                </div>

                <div style={styles.seatingGrid}>
                  {seatingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSeatingArea(opt.id)}
                      style={{
                        ...styles.seatingCard,
                        borderColor: seatingArea === opt.id ? "#f59e0b" : "rgba(255,255,255,0.1)",
                        background: seatingArea === opt.id ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <div style={{ marginBottom: "6px" }}>{opt.icon}</div>
                      <h4 style={{ color: "#fff", fontSize: "16px", marginTop: "8px", marginBottom: "4px" }}>
                        {opt.title}
                      </h4>
                      <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>
                        {opt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Contact & Requests */}
              <div style={styles.stepSection}>
                <div style={styles.stepHeader}>
                  <span style={styles.stepNumber}>4</span>
                  <div>
                    <h3 style={styles.stepTitle}>Guest Details & Special Requests</h3>
                    <p style={styles.stepDesc}>We will send instant confirmation to your contact</p>
                  </div>
                </div>

                <div style={styles.inputGrid3}>
                  <div>
                    <label style={styles.fieldLabel}>Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Khan"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      style={styles.input}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      style={styles.input}
                    />
                  </div>

                  <div>
                    <label style={styles.fieldLabel}>Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      style={styles.select}
                    >
                      <option value="casual">Casual Dining</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="anniversary">Romantic Anniversary</option>
                      <option value="business">Business Dinner</option>
                      <option value="family">Family Reunion</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <label style={styles.fieldLabel}>Special Dietary or Setup Requests (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. High chair needed for toddler, rose petals on table, less spicy appetizers..."
                    value={contact.specialRequests}
                    onChange={(e) => setContact({ ...contact, specialRequests: e.target.value })}
                    style={{ ...styles.input, resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "10px" }}>
                <button type="submit" className="btn-primary" style={styles.submitBtn}>
                  Confirm Table Reservation →
                </button>
                <div style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <ShieldCheckIcon size={14} color="#64748b" />
                  <span>No reservation deposit required. We hold tables for 15 minutes past booking time.</span>
                </div>
              </div>
            </form>
          </div>
        )}
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
    margin: "0 auto 40px auto",
  },
  title: {
    fontSize: "clamp(32px, 4.5vw, 48px)",
    color: "#fff",
    marginBottom: "14px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    lineHeight: 1.6,
  },
  formContainer: {
    maxWidth: "920px",
    margin: "0 auto",
  },
  form: {
    padding: "clamp(20px, 4vw, 40px) clamp(14px, 4vw, 40px)",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  stepSection: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    paddingBottom: "24px",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  stepNumber: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "var(--gold-gradient)",
    color: "#0c0e14",
    fontWeight: 900,
    fontSize: "16px",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "18px",
    color: "#fff",
    fontWeight: 800,
  },
  stepDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "2px 0 0 0",
  },
  inputGrid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: "16px",
  },
  inputGrid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
    gap: "14px",
  },
  fieldLabel: {
    display: "block",
    fontSize: "12px",
    color: "#cbd5e1",
    fontWeight: 700,
    marginBottom: "8px",
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
  guestSelector: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  guestBtn: {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1px solid",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  timeSlotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 100px), 1fr))",
    gap: "10px",
  },
  timeSlotCard: {
    padding: "12px 8px",
    borderRadius: "14px",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  slotStatusPill: {
    fontSize: "10px",
    marginTop: "4px",
    fontWeight: 700,
  },
  seatingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
    gap: "12px",
  },
  seatingCard: {
    padding: "16px 14px",
    borderRadius: "18px",
    border: "1px solid",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
  },
  confirmationCard: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "clamp(30px, 5vw, 50px) clamp(16px, 4vw, 40px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "32px",
  },
  checkBadge: {
    width: "74px",
    height: "74px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.2)",
    border: "2px solid #f59e0b",
    display: "grid",
    placeItems: "center",
    fontSize: "36px",
  },
  resIdBadge: {
    padding: "6px 18px",
    borderRadius: "999px",
    background: "rgba(245, 158, 11, 0.15)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    fontWeight: 800,
    fontSize: "15px",
    marginTop: "12px",
  },
  detailsBox: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "18px",
    padding: "clamp(16px, 3vw, 20px) clamp(14px, 3vw, 24px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    margin: "24px 0",
    textAlign: "left",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
  detailLabel: {
    color: "#94a3b8",
  },
  detailVal: {
    color: "#fff",
    fontWeight: 700,
  },
  actionRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};