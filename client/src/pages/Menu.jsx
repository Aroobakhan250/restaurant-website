import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import { menuData } from "../data/menuData";
import { useCart } from "../context/CartContext";
import { 
  SearchIcon, 
  CloseIcon, 
  UtensilsIcon, 
  CartIcon, 
  StarIcon, 
  ClockIcon, 
  FlameIcon 
} from "../components/common/Icons";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [dietFilter, setDietFilter] = useState("all"); // 'all', 'veg', 'non-veg', 'spicy', 'popular'
  const [sortBy, setSortBy] = useState("default"); // 'default', 'price-low', 'price-high', 'rating'
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickQty, setQuickQty] = useState(1);

  const { addToCart, openCart, cartCount } = useCart();

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCategory(cat);
    const s = searchParams.get("search");
    if (s) setSearchQuery(s);
  }, [searchParams]);

  const categories = useMemo(() => {
    return ["All", "Starters", "Main Course", "Fast Food", "BBQ", "Salads", "Desserts", "Drinks"];
  }, []);

  const filteredDishes = useMemo(() => {
    let result = menuData.filter((item) => {
      // Category filter
      const matchCat = activeCategory === "All" || item.category.toLowerCase() === activeCategory.toLowerCase();

      // Search filter
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      // Diet filter
      let matchDiet = true;
      if (dietFilter === "veg") matchDiet = item.diet === "veg";
      if (dietFilter === "non-veg") matchDiet = item.diet === "non-veg";
      if (dietFilter === "spicy") matchDiet = item.spicy === true;
      if (dietFilter === "popular") matchDiet = item.isPopular === true;

      return matchCat && matchSearch && matchDiet;
    });

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  const handleOpenQuickView = (item) => {
    setQuickViewItem(item);
    setQuickQty(1);
  };

  const handleQuickAdd = () => {
    if (quickViewItem) {
      addToCart(quickViewItem, quickQty);
      setQuickViewItem(null);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Header Banner */}
        <div style={styles.header}>
          <span className="pill-badge" style={{ marginBottom: "12px" }}>
            Curated Culinary Catalog
          </span>
          <h1 style={styles.title} className="serif">
            Our Grand <span className="gold-text">Artisan Menu</span>
          </h1>
          <p style={styles.subtitle}>
            Explore our masterfully crafted selection of over 50 authentic dishes, charcoal grills, 
            royal curries, and handcrafted desserts made with 100% fresh Halal ingredients.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div style={styles.controlsBar} className="glass-card">
          {/* Search Box */}
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>
              <SearchIcon size={16} color="#f59e0b" />
            </span>
            <input
              type="text"
              placeholder="Search by dish name, spice, or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={styles.clearSearchBtn}
                title="Clear Search"
              >
                <CloseIcon size={14} color="#94a3b8" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={styles.sortWrapper}>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select}
            >
              <option value="default">Chef's Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={styles.tabsRow}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              style={{
                ...styles.tabBtn,
                background: activeCategory.toLowerCase() === c.toLowerCase()
                  ? "var(--gold-gradient)"
                  : "rgba(255, 255, 255, 0.05)",
                color: activeCategory.toLowerCase() === c.toLowerCase() ? "#0c0e14" : "#cbd5e1",
                borderColor: activeCategory.toLowerCase() === c.toLowerCase()
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.1)",
                fontWeight: activeCategory.toLowerCase() === c.toLowerCase() ? 900 : 700,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dietary Filters Sub-bar */}
        <div style={styles.dietRow}>
          <div style={styles.dietPills}>
            <button
              onClick={() => setDietFilter("all")}
              style={{
                ...styles.dietBtn,
                background: dietFilter === "all" ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: dietFilter === "all" ? "#fbbf24" : "#94a3b8",
                borderColor: dietFilter === "all" ? "rgba(245, 158, 11, 0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              All Types
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              style={{
                ...styles.dietBtn,
                background: dietFilter === "veg" ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: dietFilter === "veg" ? "#34d399" : "#94a3b8",
                borderColor: dietFilter === "veg" ? "rgba(16, 185, 129, 0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setDietFilter("non-veg")}
              style={{
                ...styles.dietBtn,
                background: dietFilter === "non-veg" ? "rgba(239, 68, 68, 0.2)" : "transparent",
                color: dietFilter === "non-veg" ? "#f87171" : "#94a3b8",
                borderColor: dietFilter === "non-veg" ? "rgba(239, 68, 68, 0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              Non-Veg
            </button>
            <button
              onClick={() => setDietFilter("spicy")}
              style={{
                ...styles.dietBtn,
                background: dietFilter === "spicy" ? "rgba(249, 115, 22, 0.2)" : "transparent",
                color: dietFilter === "spicy" ? "#fb923c" : "#94a3b8",
                borderColor: dietFilter === "spicy" ? "rgba(249, 115, 22, 0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              Spicy
            </button>
            <button
              onClick={() => setDietFilter("popular")}
              style={{
                ...styles.dietBtn,
                background: dietFilter === "popular" ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: dietFilter === "popular" ? "#fbbf24" : "#94a3b8",
                borderColor: dietFilter === "popular" ? "rgba(245, 158, 11, 0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              Most Popular
            </button>
          </div>

          <div style={styles.resultsCount}>
            Showing <b>{filteredDishes.length}</b> handcrafted delicacies
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div style={styles.emptyState} className="glass-card">
            <div style={{ display: "grid", placeItems: "center", marginBottom: "12px" }}>
              <UtensilsIcon size={46} color="#64748b" />
            </div>
            <h3 style={{ color: "#fff", fontSize: "22px", marginTop: "14px" }}>No dishes found</h3>
            <p style={{ color: "#94a3b8", maxWidth: "400px", margin: "8px auto 20px" }}>
              We couldn't find any dishes matching your current filter. Try resetting search or choosing a different category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setDietFilter("all");
              }}
              className="btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={styles.grid} className="dish-3-col-grid universal-3-col-grid">
            {filteredDishes.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        )}

        {/* Floating Cart Button for Quick Checkout */}
        {cartCount > 0 && (
          <div style={styles.floatingCartWrap}>
            <button onClick={openCart} className="btn-primary" style={styles.floatingCartBtn}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <CartIcon size={18} color="#0c0e14" />
                View Cart ({cartCount} items)
              </span>
              <span style={{ fontSize: "16px" }}>→</span>
            </button>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewItem && (
          <div className="modal-overlay" onClick={() => setQuickViewItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
              <button
                onClick={() => setQuickViewItem(null)}
                style={styles.modalCloseBtn}
                aria-label="Close Dish Details"
              >
                <CloseIcon size={16} color="#cbd5e1" />
              </button>

              <div style={{ marginBottom: "20px" }}>
                <div style={styles.modalImgWrap}>
                  <img
                    src={quickViewItem.image}
                    alt={quickViewItem.name}
                    style={styles.modalImg}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div style={styles.modalImgOverlay} />
                  <span style={styles.modalCategoryBadge}>{quickViewItem.category}</span>
                </div>
                <h2 style={{ color: "#fff", fontSize: "24px", marginTop: "14px", textAlign: "center" }} className="serif">
                  {quickViewItem.name}
                </h2>
              </div>

              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, textAlign: "center", marginBottom: "24px" }}>
                {quickViewItem.desc}
              </p>

              {/* Dish Attribute Matrix */}
              <div style={styles.attributeGrid}>
                <div style={styles.attrItem}>
                  <span style={styles.attrLabel}>Rating</span>
                  <span style={{ ...styles.attrVal, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <StarIcon size={13} color="#fbbf24" fill="#fbbf24" />
                    {quickViewItem.rating} / 5.0
                  </span>
                </div>
                <div style={styles.attrItem}>
                  <span style={styles.attrLabel}>Prep Time</span>
                  <span style={{ ...styles.attrVal, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <ClockIcon size={13} color="#fbbf24" />
                    {quickViewItem.prepTime}
                  </span>
                </div>
                <div style={styles.attrItem}>
                  <span style={styles.attrLabel}>Calories</span>
                  <span style={{ ...styles.attrVal, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <FlameIcon size={13} color="#fbbf24" />
                    {quickViewItem.calories}
                  </span>
                </div>
                <div style={styles.attrItem}>
                  <span style={styles.attrLabel}>Diet</span>
                  <span style={styles.attrVal}>
                    {quickViewItem.diet === "veg" ? "Vegetarian" : "Halal Meat"}
                  </span>
                </div>
              </div>

              {/* Quantity Selector & Add to Order */}
              <div style={styles.modalActions}>
                <div style={styles.qtyBox}>
                  <button
                    onClick={() => setQuickQty((q) => Math.max(1, q - 1))}
                    style={styles.modalQtyBtn}
                  >
                    −
                  </button>
                  <span style={styles.modalQtyVal}>{quickQty}</span>
                  <button
                    onClick={() => setQuickQty((q) => q + 1)}
                    style={styles.modalQtyBtn}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleQuickAdd} className="btn-primary" style={{ flex: 1, padding: "14px 20px" }}>
                  Add to Order • Rs {quickViewItem.price * quickQty}
                </button>
              </div>
            </div>
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
    maxWidth: "750px",
    margin: "0 auto 40px auto",
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
  controlsBar: {
    padding: "clamp(12px, 3vw, 16px) clamp(14px, 3vw, 20px)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: "min(100%, 240px)",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "999px",
    padding: "8px 16px",
  },
  searchIcon: {
    fontSize: "16px",
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    minWidth: "0",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
  },
  clearSearchBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "14px",
  },
  sortWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  select: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    padding: "9px 14px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    outline: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
  },
  tabsRow: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    paddingBottom: "10px",
    marginBottom: "16px",
    scrollbarWidth: "none",
  },
  tabBtn: {
    padding: "8px 16px",
    borderRadius: "999px",
    fontSize: "13px",
    border: "1px solid",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  },
  dietRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "32px",
  },
  dietPills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  dietBtn: {
    padding: "6px 14px",
    borderRadius: "999px",
    border: "1px solid",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  resultsCount: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "clamp(10px, 2vw, 24px)",
  },
  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    borderRadius: "24px",
  },
  floatingCartWrap: {
    position: "fixed",
    bottom: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 90,
  },
  floatingCartBtn: {
    padding: "14px 28px",
    boxShadow: "0 10px 35px rgba(245, 158, 11, 0.6)",
    fontSize: "15px",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#fff",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
  },
  modalImgWrap: {
    height: "220px",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    background: "#1a202c",
  },
  modalImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  modalImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,14,20,0.8) 100%)",
  },
  modalCategoryBadge: {
    position: "absolute",
    bottom: "12px",
    left: "14px",
    background: "rgba(12, 14, 20, 0.85)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 800,
  },
  attributeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.04)",
    padding: "16px",
    borderRadius: "16px",
    marginBottom: "24px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  attrItem: {
    display: "flex",
    flexDirection: "column",
  },
  attrLabel: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  attrVal: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#f8fafc",
    marginTop: "2px",
  },
  modalActions: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "14px",
    padding: "4px",
  },
  modalQtyBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 900,
    cursor: "pointer",
  },
  modalQtyVal: {
    width: "36px",
    textAlign: "center",
    fontWeight: 900,
    fontSize: "16px",
    color: "#fff",
  },
};