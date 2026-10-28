import { useEffect, useMemo, useState } from "react";
import { UsersIcon, BookOpenIcon, TrophyIcon, StarIcon } from "../common/Icons";

export default function Stats() {
  const stats = useMemo(
    () => [
      { id: 1, label: "Delighted Guests Served", value: 45000, suffix: "+", icon: <UsersIcon size={22} color="#f59e0b" /> },
      { id: 2, label: "Master Recipes Crafted", value: 120, suffix: "+", icon: <BookOpenIcon size={22} color="#f59e0b" /> },
      { id: 3, label: "Years of Culinary Legacy", value: 8, suffix: " Years", icon: <TrophyIcon size={22} color="#f59e0b" /> },
      { id: 4, label: "Verified Foodie Rating", value: 4.9, suffix: " / 5.0", icon: <StarIcon size={22} color="#f59e0b" fill="#f59e0b" /> },
    ],
    []
  );

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div style={styles.wrapper} className="glass-card">
          <div style={styles.grid}>
            {stats.map((s) => (
              <StatItem
                key={s.id}
                icon={s.icon}
                label={s.label}
                value={s.value}
                suffix={s.suffix}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value, suffix }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;

      const formatted = Number.isInteger(value)
        ? Math.round(current).toLocaleString()
        : (Math.round(current * 10) / 10).toFixed(1);

      setDisplay(formatted);
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div style={styles.item}>
      <div style={styles.iconCircle}>{icon}</div>
      <div style={styles.numberRow}>
        <span style={styles.number}>{display}</span>
        <span style={styles.suffix}>{suffix}</span>
      </div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  section: {
    padding: "30px 0 60px 0",
    background: "#0c0e14",
  },
  wrapper: {
    padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px)",
    borderRadius: "26px",
    background: "linear-gradient(135deg, rgba(23, 28, 42, 0.9), rgba(15, 18, 28, 0.95))",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
    gap: "20px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "12px 8px",
  },
  iconCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.12)",
    display: "grid",
    placeItems: "center",
    fontSize: "20px",
    marginBottom: "12px",
  },
  numberRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  number: {
    fontSize: "clamp(26px, 3.5vw, 42px)",
    fontWeight: 900,
    background: "var(--gold-gradient)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    letterSpacing: "-0.5px",
  },
  suffix: {
    fontSize: "clamp(16px, 2vw, 20px)",
    fontWeight: 800,
    color: "#fbbf24",
    marginLeft: "4px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#94a3b8",
    marginTop: "6px",
  },
};