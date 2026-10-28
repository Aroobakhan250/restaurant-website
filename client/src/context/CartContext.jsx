import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CheckIcon } from "../components/common/Icons";

const CartContext = createContext(null);
const STORAGE_KEY = "zaffron_cart_v1";

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [coupon, setCoupon] = useState({ code: "", discountPercent: 0, applied: false });
  const [orderType, setOrderType] = useState("delivery"); // delivery, takeaway, dine-in
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function showToast(message, icon = null) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!coupon.applied) return 0;
    return Math.round((subtotal * coupon.discountPercent) / 100);
  }, [subtotal, coupon]);

  const deliveryFee = useMemo(() => {
    if (orderType !== "delivery" || subtotal === 0) return 0;
    return subtotal >= 1500 ? 0 : 150; // Free delivery over Rs 1500
  }, [subtotal, orderType]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + deliveryFee);
  }, [subtotal, discountAmount, deliveryFee]);

  function openCart() { setIsOpen(true); }
  function closeCart() { setIsOpen(false); }
  function toggleCart() { setIsOpen((v) => !v); }

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + quantity } : x
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  }

  function removeFromCart(id) {
    const item = cart.find((x) => x.id === id);
    if (item) {
      showToast(`Removed ${item.name} from cart`);
    }
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function incQty(id) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  }

  function decQty(id) {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
    setCoupon({ code: "", discountPercent: 0, applied: false });
  }

  function applyCoupon(code) {
    const clean = code.trim().toUpperCase();
    if (clean === "ZAFFRON20" || clean === "SOLARIA20") {
      setCoupon({ code: "ZAFFRON20", discountPercent: 20, applied: true });
      showToast("Coupon ZAFFRON20 applied! 20% OFF");
      return { success: true, message: "20% discount applied!" };
    } else if (clean === "WELCOME10") {
      setCoupon({ code: clean, discountPercent: 10, applied: true });
      showToast("Coupon WELCOME10 applied! 10% OFF");
      return { success: true, message: "10% discount applied!" };
    } else {
      showToast("Invalid promo code. Try 'ZAFFRON20'");
      return { success: false, message: "Invalid promo code" };
    }
  }

  function removeCoupon() {
    setCoupon({ code: "", discountPercent: 0, applied: false });
    showToast("Promo code removed");
  }

  const value = {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    coupon,
    orderType,
    setOrderType,
    isOpen,
    toasts,
    lastOrder,
    setLastOrder,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    incQty,
    decQty,
    clearCart,
    applyCoupon,
    removeCoupon,
    showToast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Global Toast Render */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast-item">
            <div style={{ display: "grid", placeItems: "center", color: "#fbbf24", flexShrink: 0 }}>
              {t.icon || <CheckIcon size={18} color="#fbbf24" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#f8fafc" }}>
                {t.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}