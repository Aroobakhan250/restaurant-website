import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrderAPI } from "../services/api";
import {
  ShoppingBagIcon,
  CloseIcon,
  BikeIcon,
  DiningTableIcon,
  UtensilsIcon,
  TrashIcon,
  CheckIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
  CashIcon,
  CreditCardIcon,
  SmartphoneIcon,
  PhoneIcon,
  ClockIcon,
  CopyIcon,
  FlameIcon,
} from "./common/Icons";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    orderType,
    setOrderType,
    incQty,
    decQty,
    removeFromCart,
    clearCart,
    showToast,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [orderStage, setOrderStage] = useState("preparing"); // "preparing" | "dispatched"
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(600); // 10 minutes (600s)
  const [copiedOrder, setCopiedOrder] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod", // 'cod', 'card', 'jazzcash'
    notes: "",
  });

  // Countdown timer for 10-minute preparation
  useEffect(() => {
    let timer;
    if (orderPlaced && orderStage === "preparing" && prepSecondsLeft > 0) {
      timer = setInterval(() => {
        setPrepSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOrderStage("dispatched");
            showToast("Order is freshly prepared! Rider Muhammad Hamza has been dispatched.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [orderPlaced, orderStage, prepSecondsLeft, showToast]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyOrderId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id);
    }
    setCopiedOrder(true);
    showToast(`Order #${id} copied to clipboard!`);
    setTimeout(() => setCopiedOrder(false), 2200);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput);
      setPromoInput("");
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) {
      showToast("Please provide your name and phone number");
      return;
    }

    const orderId = "ZAF-" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const readyAt = new Date(now.getTime() + 10 * 60000);

    const receipt = {
      orderId,
      customer: { ...customerInfo },
      items: [...cart],
      orderType,
      subtotal,
      discountAmount,
      deliveryFee,
      total,
      date: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedReadyTime: readyAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rider: {
        name: "Muhammad Hamza",
        phone: "+92 312 9876543",
        cleanPhone: "923129876543",
        bike: "Honda CD 70 (Reg: KHI-8291)",
        rating: "4.9",
        deliveriesCount: "520+",
        eta: "15-20 mins",
      },
    };

    setOrderReceipt(receipt);
    setOrderPlaced(true);
    setOrderStage("preparing");
    setPrepSecondsLeft(600); // 10 minutes countdown
    clearCart();
    showToast(`Order #${orderId} confirmed successfully!`);

    // Persist to MongoDB
    await createOrderAPI(receipt);
  };

  return (
    <>
      {/* Backdrop - Only render when drawer is open to prevent full-screen backdrop filter blocking the website */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={styles.backdrop}
        />
      )}

      {/* Drawer */}
      <aside
        style={{
          ...styles.drawer,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
        className="cart-drawer-panel"
      >
        {/* Drawer Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.headerTitleRow}>
              <ShoppingBagIcon size={20} color="#fbbf24" />
              <h2 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>Your Order Cart</h2>
            </div>
            <div style={styles.headerSub}>
              {cart.length === 0 ? "No items selected" : `${cart.length} unique dishes`}
            </div>
          </div>
          <button onClick={closeCart} style={styles.iconBtn} aria-label="Close Cart Drawer">
            <CloseIcon size={16} color="#cbd5e1" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div style={styles.orderTypeBar}>
          <button
            onClick={() => setOrderType("delivery")}
            style={{
              ...styles.typeBtn,
              background: orderType === "delivery" ? "var(--gold-gradient)" : "transparent",
              color: orderType === "delivery" ? "#0c0e14" : "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <BikeIcon size={15} color={orderType === "delivery" ? "#0c0e14" : "currentColor"} />
            <span>Delivery</span>
          </button>
          <button
            onClick={() => setOrderType("takeaway")}
            style={{
              ...styles.typeBtn,
              background: orderType === "takeaway" ? "var(--gold-gradient)" : "transparent",
              color: orderType === "takeaway" ? "#0c0e14" : "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <ShoppingBagIcon size={15} color={orderType === "takeaway" ? "#0c0e14" : "currentColor"} />
            <span>Takeaway</span>
          </button>
          <button
            onClick={() => setOrderType("dinein")}
            style={{
              ...styles.typeBtn,
              background: orderType === "dinein" ? "var(--gold-gradient)" : "transparent",
              color: orderType === "dinein" ? "#0c0e14" : "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <DiningTableIcon size={15} color={orderType === "dinein" ? "#0c0e14" : "currentColor"} />
            <span>Dine-in</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              <UtensilsIcon size={38} color="#64748b" />
            </div>
            <h3 style={{ color: "#fff", fontSize: "18px", marginTop: "16px" }}>Your cart is empty</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "6px", maxWidth: "260px" }}>
              Explore our master artisan menu and add your favorite dishes!
            </p>
            <Link
              to="/menu"
              onClick={closeCart}
              className="btn-primary"
              style={{ marginTop: "24px", padding: "12px 26px" }}
            >
              Explore Menu Now →
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div style={styles.list}>
              {cart.map((item) => (
                <div key={item.id} style={styles.item} className="glass-card">
                  <div style={styles.itemThumbWrap}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.itemThumbImg}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <UtensilsIcon size={18} color="#94a3b8" />
                    )}
                  </div>

                  <div style={styles.itemInfo}>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemCategory}>{item.category}</div>
                    <div style={styles.itemPrice}>Rs {item.price} each</div>
                  </div>

                  <div style={styles.itemActions}>
                    <div style={styles.qtyControl}>
                      <button onClick={() => decQty(item.id)} style={styles.qtyBtn}>
                        −
                      </button>
                      <span style={styles.qtyNum}>{item.qty}</span>
                      <button onClick={() => incQty(item.id)} style={styles.qtyBtn}>
                        +
                      </button>
                    </div>

                    <div style={styles.itemTotal}>Rs {item.price * item.qty}</div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={styles.removeBtn}
                      title="Remove Item"
                    >
                      <TrashIcon size={14} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div style={styles.promoSection}>
              {coupon.applied ? (
                <div style={styles.couponAppliedBox}>
                  <div>
                    <span style={{ fontWeight: 800, color: "#10b981", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <CheckIcon size={13} color="#10b981" />
                      Code {coupon.code} applied!
                    </span>
                    <span style={{ fontSize: "12px", color: "#cbd5e1", display: "block" }}>
                      You saved Rs {discountAmount} ({coupon.discountPercent}% OFF)
                    </span>
                  </div>
                  <button onClick={removeCoupon} style={styles.removeCouponBtn}>
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyPromo} style={styles.promoForm}>
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ZAFFRON20)..."
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={styles.promoInput}
                    />
                    <button type="submit" style={styles.applyBtn}>
                      Apply
                    </button>
                  </form>
                  <div style={styles.hintRow}>
                    <span>Try code:</span>
                    <button
                      onClick={() => applyCoupon("ZAFFRON20")}
                      style={styles.hintTag}
                    >
                      ZAFFRON20 (20% OFF)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer & Bill Summary */}
            <div style={styles.footer}>
              <div style={styles.billRow}>
                <span style={styles.billLabel}>Subtotal</span>
                <span style={styles.billVal}>Rs {subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={styles.billRow}>
                  <span style={{ ...styles.billLabel, color: "#10b981" }}>Promo Discount</span>
                  <span style={{ ...styles.billVal, color: "#10b981" }}>- Rs {discountAmount}</span>
                </div>
              )}

              {orderType === "delivery" && (
                <div style={styles.billRow}>
                  <span style={styles.billLabel}>
                    Delivery Fee {subtotal >= 1500 && <span style={styles.freePill}>FREE</span>}
                  </span>
                  <span style={styles.billVal}>
                    {deliveryFee === 0 ? "Rs 0" : `Rs ${deliveryFee}`}
                  </span>
                </div>
              )}

              <div style={styles.totalDivider} />

              <div style={styles.grandTotalRow}>
                <div>
                  <span style={styles.grandTotalLabel}>Estimated Total</span>
                  <div style={styles.grandTotalVal}>Rs {total}</div>
                </div>

                <button
                  onClick={() => {
                    closeCart();
                    setCheckoutModalOpen(true);
                  }}
                  className="btn-primary"
                  style={styles.checkoutBtn}
                >
                  Checkout Now →
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                <button onClick={clearCart} style={styles.clearCartLink}>
                  Clear all items
                </button>
                <span style={{ fontSize: "11px", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheckIcon size={12} color="#64748b" />
                  Secure Direct Kitchen Ordering
                </span>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            setCheckoutModalOpen(false);
            if (!orderPlaced) {
              setOrderStage("preparing");
              setPrepSecondsLeft(600);
            }
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                if (orderPlaced) {
                  showToast("Live order tracking minimized. See bottom bar to open anytime!");
                }
              }}
              style={styles.modalCloseBtn}
              title="Close / Minimize Modal"
            >
              <CloseIcon size={16} color="#cbd5e1" />
            </button>

            {orderPlaced && orderReceipt ? (
              /* Order Confirmation Screen */
              <div style={styles.receiptWrapper}>
                <div style={styles.checkCircle}>
                  <CheckIcon size={26} color="#10b981" />
                </div>
                <h2 style={{ color: "#fff", fontSize: "24px", marginTop: "12px", marginBottom: "4px" }} className="serif">
                  Order Successfully Placed!
                </h2>

                {/* Order ID Banner with Copy Option */}
                <div style={styles.orderIdCard}>
                  <div>
                    <span style={styles.orderIdSub}>Order Reference Number</span>
                    <div style={styles.orderIdVal}>#{orderReceipt.orderId}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyOrderId(orderReceipt.orderId)}
                    style={styles.copyOrderBtn}
                  >
                    <CopyIcon size={14} color={copiedOrder ? "#10b981" : "#fbbf24"} />
                    <span>{copiedOrder ? "Copied!" : "Copy Order #"}</span>
                  </button>
                </div>

                <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "10px", lineHeight: 1.5, textAlign: "center" }}>
                  Thank you, <b style={{ color: "#fff" }}>{orderReceipt.customer.name}</b>. Your order has been confirmed and routed directly to our kitchen.
                </p>

                {/* Progress Tracker Bar */}
                <div style={styles.trackerBox}>
                  <div style={styles.trackerStep}>
                    <span style={styles.stepActive}>✓</span>
                    <span style={styles.stepText}>Received</span>
                  </div>
                  <div style={{ ...styles.trackerLine, background: "#10b981" }} />
                  <div style={styles.trackerStep}>
                    <span style={orderStage === "preparing" ? styles.stepCurrent : styles.stepActive}>
                      {orderStage === "preparing" ? "2" : "✓"}
                    </span>
                    <span
                      style={{
                        ...styles.stepText,
                        color: orderStage === "preparing" ? "#fbbf24" : "#10b981",
                        fontWeight: 700,
                      }}
                    >
                      Cooking (10m)
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.trackerLine,
                      background: orderStage === "dispatched" ? "#10b981" : "rgba(255,255,255,0.12)",
                    }}
                  />
                  <div style={styles.trackerStep}>
                    <span style={orderStage === "dispatched" ? styles.stepActiveGreen : styles.stepPending}>
                      <BikeIcon size={14} color={orderStage === "dispatched" ? "#000" : "#94a3b8"} />
                    </span>
                    <span
                      style={{
                        ...styles.stepText,
                        color: orderStage === "dispatched" ? "#34d399" : "#94a3b8",
                        fontWeight: orderStage === "dispatched" ? 700 : 500,
                      }}
                    >
                      On the Way
                    </span>
                  </div>
                </div>

                {/* STAGE 1: 10-Minute Kitchen Preparation Box */}
                {orderStage === "preparing" ? (
                  <div style={styles.prepCard}>
                    <div style={styles.prepHeader}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={styles.flameIconWrap}>
                          <FlameIcon size={18} color="#f59e0b" />
                        </span>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>
                            Kitchen Preparing Your Feast
                          </div>
                          <div style={{ fontSize: "11px", color: "#fbbf24" }}>
                            Freshly prepared • Ready at ~{orderReceipt.estimatedReadyTime}
                          </div>
                        </div>
                      </div>
                      <span style={styles.liveBadge}>
                        <span style={styles.livePulseDot} /> LIVE
                      </span>
                    </div>

                    {/* Timer Box */}
                    <div style={styles.timerBox}>
                      <div style={styles.timerNumbers}>{formatTime(prepSecondsLeft)}</div>
                      <div style={styles.timerSub}>
                        10 minute me order ready ho raha hai
                      </div>
                      <div style={styles.progressBarBg}>
                        <div
                          style={{
                            ...styles.progressBarFill,
                            width: `${Math.min(100, Math.max(5, ((600 - prepSecondsLeft) / 600) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div style={styles.prepNotice}>
                      <ClockIcon size={16} color="#fbbf24" />
                      <span>
                        Order abhi <b>10 minute me ready</b> ho raha hai. Jaise hi khana ready hoga, <b>rider assign ho kar rider ka mobile number</b> yahan display ho jayega takay aap direct call karke track kar sakein.
                      </span>
                    </div>

                    {/* Fast-Forward Demo Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setOrderStage("dispatched");
                        setPrepSecondsLeft(0);
                        showToast("Fast-forward: Order ready! Rider details active.");
                      }}
                      style={styles.fastForwardBtn}
                      title="Test / Instant Preview Rider Details"
                    >
                      ⚡ Fast-Forward: Khana Ready & Rider Details Dekhein (Demo)
                    </button>
                  </div>
                ) : (
                  /* STAGE 2: Rider Details & Direct Calling Card */
                  <div style={styles.riderCard}>
                    <div style={styles.riderCardHeader}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={styles.riderPulseDot} />
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 800,
                            color: "#34d399",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Food Ready • Rider Dispatched
                        </span>
                      </div>
                      <span style={styles.etaBadge}>ETA: {orderReceipt.rider.eta}</span>
                    </div>

                    {/* Rider Profile Row */}
                    <div style={styles.riderProfileRow}>
                      <div style={styles.riderAvatar}>
                        <BikeIcon size={24} color="#f59e0b" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={styles.riderName}>{orderReceipt.rider.name}</span>
                          <span style={styles.verifiedPill}>✓ Assigned Rider</span>
                        </div>
                        <div style={styles.riderSub}>
                          <span>⭐ {orderReceipt.rider.rating} ({orderReceipt.rider.deliveriesCount} trips)</span>
                          <span>•</span>
                          <span>{orderReceipt.rider.bike}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rider Contact Box */}
                    <div style={styles.riderContactBox}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                        <span style={styles.riderContactLabel}>Rider Mobile Number:</span>
                        <span style={styles.riderContactNumber}>{orderReceipt.rider.phone}</span>
                      </div>

                      <div style={styles.riderActionGrid}>
                        <a
                          href={`tel:${orderReceipt.rider.phone}`}
                          style={styles.callRiderBtn}
                        >
                          <PhoneIcon size={16} color="#000" />
                          <span>Call Rider Now</span>
                        </a>

                        <a
                          href={`https://wa.me/${orderReceipt.rider.cleanPhone}?text=${encodeURIComponent(
                            `Hi ${orderReceipt.rider.name}, I am tracking my Zaffron order #${orderReceipt.orderId}. Please share your current location.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.waRiderBtn}
                        >
                          <WhatsAppIcon size={16} color="#22c55e" />
                          <span>WhatsApp Rider</span>
                        </a>
                      </div>
                    </div>

                    <p style={styles.riderHelpText}>
                      💡 <b>Call karke Track karein:</b> Rider ka number oper available hai. Call kar ke aap direct delivery location guide kar sakte hain.
                    </p>

                    <button
                      type="button"
                      onClick={() => setOrderStage("preparing")}
                      style={styles.backToPrepBtn}
                    >
                      ↺ View Kitchen Prep Status
                    </button>
                  </div>
                )}

                {/* Summary Table */}
                <div style={styles.receiptSummary}>
                  <div style={styles.receiptRow}>
                    <span>Order Type:</span>
                    <span style={{ textTransform: "capitalize", fontWeight: 700, color: "#fff" }}>
                      {orderReceipt.orderType}
                    </span>
                  </div>
                  {orderReceipt.orderType === "delivery" && orderReceipt.customer.address && (
                    <div style={styles.receiptRow}>
                      <span>Delivery Address:</span>
                      <span style={{ maxWidth: "60%", textAlign: "right", color: "#fff" }}>
                        {orderReceipt.customer.address}
                      </span>
                    </div>
                  )}
                  <div style={styles.receiptRow}>
                    <span>Items ({orderReceipt.items.length}):</span>
                    <span>Rs {orderReceipt.subtotal}</span>
                  </div>
                  {orderReceipt.discountAmount > 0 && (
                    <div style={styles.receiptRow}>
                      <span style={{ color: "#10b981" }}>Discount:</span>
                      <span style={{ color: "#10b981" }}>- Rs {orderReceipt.discountAmount}</span>
                    </div>
                  )}
                  <div style={styles.receiptRow}>
                    <span>Payment Method:</span>
                    <span style={{ textTransform: "uppercase", fontWeight: 700 }}>
                      {orderReceipt.customer.paymentMethod}
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.receiptRow,
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      paddingTop: "8px",
                      fontWeight: 800,
                    }}
                  >
                    <span style={{ color: "#fff" }}>Amount to Pay:</span>
                    <span style={{ color: "#fbbf24", fontSize: "18px" }}>Rs {orderReceipt.total}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "20px", width: "100%", flexWrap: "wrap" }}>
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      showToast("Website browsing unlocked! Tracking runs live below.");
                    }}
                    className="btn-primary"
                    style={{ flex: 1, padding: "12px", minWidth: "180px" }}
                  >
                    🌐 Browse Website (Track Live)
                  </button>
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setOrderPlaced(false);
                      setOrderReceipt(null);
                      setOrderStage("preparing");
                      setPrepSecondsLeft(600);
                    }}
                    className="btn-ghost"
                    style={{ padding: "12px 14px", fontSize: "13px" }}
                  >
                    Done & Clear
                  </button>
                  <a
                    href={`https://wa.me/923005557890?text=${encodeURIComponent(
                      `Hi Zaffron, I just placed order #${orderReceipt.orderId} for Rs ${orderReceipt.total}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{ padding: "12px 14px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <WhatsAppIcon size={16} color="#22c55e" />
                    <span>Support</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <div>
                <span className="pill-badge" style={{ marginBottom: "10px" }}>
                  Complete Your Order
                </span>
                <h2 style={{ color: "#fff", fontSize: "24px", marginBottom: "6px" }} className="serif">
                  Delivery & Contact Information
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "22px" }}>
                  Order Total: <b style={{ color: "#fbbf24" }}>Rs {total}</b> • Estimated time: <b>30-35 mins</b>
                </p>

                <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={styles.formRow}>
                    <div style={{ flex: 1 }}>
                      <label style={styles.inputLabel}>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={styles.inputLabel}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={styles.inputLabel}>
                      {orderType === "delivery"
                        ? "Complete Delivery Address *"
                        : orderType === "dinein"
                        ? "Table Number (if seated) or Guest Count"
                        : "Pickup Note"}
                    </label>
                    <textarea
                      rows={2}
                      required={orderType === "delivery"}
                      placeholder={
                        orderType === "delivery"
                          ? "House / Apartment #, Street, Area, Landmark..."
                          : "Optional pickup/dine-in details..."
                      }
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      style={{ ...styles.formInput, resize: "vertical" }}
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label style={styles.inputLabel}>Select Payment Method</label>
                    <div style={styles.payGrid}>
                      <label
                        style={{
                          ...styles.payCard,
                          borderColor: customerInfo.paymentMethod === "cod" ? "#f59e0b" : "rgba(255,255,255,0.1)",
                          background: customerInfo.paymentMethod === "cod" ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={customerInfo.paymentMethod === "cod"}
                          onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: "cod" })}
                          style={{ display: "none" }}
                        />
                        <CashIcon size={20} color={customerInfo.paymentMethod === "cod" ? "#f59e0b" : "#94a3b8"} />
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Cash on Delivery</span>
                      </label>

                      <label
                        style={{
                          ...styles.payCard,
                          borderColor: customerInfo.paymentMethod === "card" ? "#f59e0b" : "rgba(255,255,255,0.1)",
                          background: customerInfo.paymentMethod === "card" ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={customerInfo.paymentMethod === "card"}
                          onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: "card" })}
                          style={{ display: "none" }}
                        />
                        <CreditCardIcon size={20} color={customerInfo.paymentMethod === "card" ? "#f59e0b" : "#94a3b8"} />
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Credit/Debit Card</span>
                      </label>

                      <label
                        style={{
                          ...styles.payCard,
                          borderColor: customerInfo.paymentMethod === "jazzcash" ? "#f59e0b" : "rgba(255,255,255,0.1)",
                          background: customerInfo.paymentMethod === "jazzcash" ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="jazzcash"
                          checked={customerInfo.paymentMethod === "jazzcash"}
                          onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: "jazzcash" })}
                          style={{ display: "none" }}
                        />
                        <SmartphoneIcon size={20} color={customerInfo.paymentMethod === "jazzcash" ? "#f59e0b" : "#94a3b8"} />
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Easypaisa / JazzCash</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={styles.inputLabel}>Cooking / Delivery Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Less spicy, extra sauce, leave at door..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      style={styles.formInput}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: "10px", padding: "14px", width: "100%" }}>
                    Confirm & Place Order (Rs {total}) →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Live Tracking Bar when modal is closed / minimized */}
      {orderPlaced && orderReceipt && !checkoutModalOpen && (
        <aside style={styles.floatingTrackerBar} aria-label="Live Order Tracking Status">
          <div style={styles.floatingTrackerLeft}>
            <span style={orderStage === "preparing" ? styles.livePulseDot : styles.riderPulseDot} />
            <div>
              <div style={styles.floatingTrackerTitle}>
                <span>Order #{orderReceipt.orderId}</span>
                <span style={{ color: "#94a3b8", fontWeight: 400 }}> • </span>
                <span style={{ color: orderStage === "preparing" ? "#fbbf24" : "#34d399" }}>
                  {orderStage === "preparing" ? `Cooking (~${formatTime(prepSecondsLeft)})` : "Rider Dispatched 🚀"}
                </span>
              </div>
              <div style={styles.floatingTrackerSub}>
                {orderStage === "preparing"
                  ? "Khana kitchen me tayyar ho raha hai (10 min)"
                  : `Rider: ${orderReceipt.rider.name} • ${orderReceipt.rider.phone}`}
              </div>
            </div>
          </div>

          <div style={styles.floatingTrackerActions}>
            {orderStage === "dispatched" && (
              <a href={`tel:${orderReceipt.rider.phone}`} style={styles.floatingCallBtn}>
                <PhoneIcon size={14} color="#000" />
                <span>Call Rider</span>
              </a>
            )}
            <button
              onClick={() => setCheckoutModalOpen(true)}
              style={styles.floatingViewBtn}
            >
              Open Live Tracker →
            </button>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setOrderReceipt(null);
                setOrderStage("preparing");
                setPrepSecondsLeft(600);
              }}
              style={styles.floatingCloseBtn}
              title="Dismiss Tracking Bar"
            >
              <CloseIcon size={12} color="#94a3b8" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(6px)",
    transition: "opacity 0.25s ease",
    zIndex: 110,
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "min(440px, 94vw)",
    background: "rgba(16, 20, 30, 0.97)",
    borderLeft: "1px solid rgba(245, 158, 11, 0.25)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.85)",
    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    zIndex: 120,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerSub: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  iconBtn: {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#fff",
    borderRadius: "10px",
    width: "34px",
    height: "34px",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
  },
  orderTypeBar: {
    display: "flex",
    padding: "10px 24px",
    background: "rgba(0, 0, 0, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    gap: "8px",
  },
  typeBtn: {
    flex: 1,
    padding: "7px 10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  empty: {
    padding: "60px 30px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "grid",
    placeItems: "center",
    fontSize: "32px",
  },
  list: {
    padding: "20px 24px",
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  item: {
    padding: "14px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  itemThumbWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    overflow: "hidden",
    background: "rgba(245, 158, 11, 0.15)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  itemThumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: "14px",
    fontWeight: 800,
    color: "#fff",
  },
  itemCategory: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  itemPrice: {
    fontSize: "12px",
    color: "#fbbf24",
    fontWeight: 700,
    marginTop: "2px",
  },
  itemActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "2px 4px",
  },
  qtyBtn: {
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },
  qtyNum: {
    width: "20px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 800,
    color: "#fff",
  },
  itemTotal: {
    fontSize: "14px",
    fontWeight: 900,
    color: "#fff",
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    opacity: 0.7,
  },
  promoSection: {
    padding: "14px 24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(0, 0, 0, 0.2)",
  },
  promoForm: {
    display: "flex",
    gap: "8px",
  },
  promoInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    color: "#fff",
    fontSize: "13px",
    outline: "none",
    fontFamily: "var(--font-sans)",
  },
  applyBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    background: "rgba(245, 158, 11, 0.2)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    fontWeight: 800,
    fontSize: "13px",
    cursor: "pointer",
  },
  hintRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  hintTag: {
    background: "transparent",
    border: "none",
    color: "#fbbf24",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "11px",
    padding: 0,
  },
  couponAppliedBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    padding: "10px 14px",
    borderRadius: "10px",
  },
  removeCouponBtn: {
    background: "transparent",
    border: "none",
    color: "#f87171",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  footer: {
    padding: "18px 24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(12, 14, 20, 0.98)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  billRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  billLabel: {
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  billVal: {
    color: "#fff",
    fontWeight: 700,
  },
  freePill: {
    background: "rgba(16, 185, 129, 0.2)",
    color: "#34d399",
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "999px",
    fontWeight: 800,
  },
  totalDivider: {
    height: "1px",
    background: "rgba(255, 255, 255, 0.1)",
    margin: "6px 0",
  },
  grandTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px",
  },
  grandTotalLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  grandTotalVal: {
    fontSize: "24px",
    fontWeight: 900,
    color: "#fbbf24",
  },
  checkoutBtn: {
    padding: "12px 24px",
    fontSize: "14px",
  },
  clearCartLink: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: "12px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "18px",
    right: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
  },
  formRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  inputLabel: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 700,
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  formInput: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-sans)",
  },
  payGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 85px), 1fr))",
    gap: "8px",
  },
  payCard: {
    padding: "14px 10px",
    borderRadius: "14px",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  receiptWrapper: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  checkCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "rgba(16, 185, 129, 0.2)",
    border: "2px solid #10b981",
    color: "#10b981",
    fontSize: "30px",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },
  orderIdCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 16px",
    borderRadius: "14px",
    background: "rgba(245, 158, 11, 0.08)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    marginTop: "12px",
    boxSizing: "border-box",
  },
  orderIdSub: {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#94a3b8",
    fontWeight: 700,
    display: "block",
  },
  orderIdVal: {
    fontSize: "17px",
    fontWeight: 900,
    color: "#fbbf24",
    letterSpacing: "0.5px",
    marginTop: "2px",
  },
  copyOrderBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  trackerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "18px 0 16px 0",
    width: "100%",
    maxWidth: "360px",
  },
  trackerStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  stepActive: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#10b981",
    color: "#000",
    fontWeight: 900,
    fontSize: "12px",
    display: "grid",
    placeItems: "center",
  },
  stepCurrent: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#fbbf24",
    color: "#000",
    fontWeight: 900,
    fontSize: "12px",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 0 12px rgba(251, 191, 36, 0.5)",
  },
  stepActiveGreen: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#10b981",
    color: "#000",
    fontWeight: 900,
    fontSize: "12px",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 0 12px rgba(16, 185, 129, 0.5)",
  },
  stepPending: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    color: "#94a3b8",
    fontWeight: 900,
    fontSize: "12px",
    display: "grid",
    placeItems: "center",
  },
  stepText: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 600,
  },
  trackerLine: {
    flex: 1,
    height: "2px",
    background: "#10b981",
    margin: "0 8px 18px",
  },
  prepCard: {
    width: "100%",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(20, 24, 36, 0.95) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "16px",
    textAlign: "left",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  prepHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  flameIconWrap: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "rgba(245, 158, 11, 0.15)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    display: "grid",
    placeItems: "center",
  },
  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "0.5px",
    color: "#fbbf24",
    background: "rgba(245, 158, 11, 0.18)",
    padding: "3px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(245, 158, 11, 0.35)",
  },
  livePulseDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#fbbf24",
    boxShadow: "0 0 8px #fbbf24",
    display: "inline-block",
  },
  timerBox: {
    background: "rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
    marginBottom: "12px",
  },
  timerNumbers: {
    fontSize: "36px",
    fontWeight: 900,
    color: "#fbbf24",
    letterSpacing: "2px",
    fontFamily: "monospace",
    textShadow: "0 0 20px rgba(251, 191, 36, 0.35)",
  },
  timerSub: {
    fontSize: "12px",
    color: "#cbd5e1",
    fontWeight: 600,
    marginTop: "2px",
    marginBottom: "10px",
  },
  progressBarBg: {
    width: "100%",
    height: "6px",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    borderRadius: "999px",
    transition: "width 0.4s ease",
  },
  prepNotice: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "12px",
    color: "#cbd5e1",
    lineHeight: 1.5,
    background: "rgba(255, 255, 255, 0.03)",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    marginBottom: "12px",
  },
  fastForwardBtn: {
    width: "100%",
    background: "rgba(245, 158, 11, 0.14)",
    border: "1px dashed rgba(245, 158, 11, 0.45)",
    color: "#fbbf24",
    borderRadius: "10px",
    padding: "9px 12px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  riderCard: {
    width: "100%",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 24, 36, 0.95) 100%)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "16px",
    textAlign: "left",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  riderCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  riderPulseDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
    boxShadow: "0 0 10px #10b981",
    display: "inline-block",
  },
  etaBadge: {
    fontSize: "11px",
    fontWeight: 800,
    color: "#34d399",
    background: "rgba(16, 185, 129, 0.2)",
    padding: "3px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(16, 185, 129, 0.4)",
  },
  riderProfileRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "12px",
  },
  riderAvatar: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.15)",
    border: "2px solid #fbbf24",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  riderName: {
    fontSize: "15px",
    fontWeight: 900,
    color: "#fff",
  },
  verifiedPill: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#34d399",
    background: "rgba(16, 185, 129, 0.2)",
    padding: "2px 6px",
    borderRadius: "999px",
  },
  riderSub: {
    fontSize: "12px",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "2px",
  },
  riderContactBox: {
    background: "rgba(0, 0, 0, 0.35)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
  },
  riderContactLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  riderContactNumber: {
    fontSize: "16px",
    fontWeight: 900,
    color: "#fbbf24",
    letterSpacing: "0.5px",
  },
  riderActionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  callRiderBtn: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#000",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 800,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
    transition: "transform 0.15s ease",
  },
  waRiderBtn: {
    background: "rgba(34, 197, 94, 0.15)",
    border: "1px solid rgba(34, 197, 94, 0.35)",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s ease",
  },
  riderHelpText: {
    fontSize: "11px",
    color: "#cbd5e1",
    lineHeight: 1.5,
    margin: "0 0 10px 0",
  },
  backToPrepBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: "11px",
    cursor: "pointer",
    textDecoration: "underline",
    display: "block",
    textAlign: "center",
    width: "100%",
  },
  receiptSummary: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "14px 18px",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "13px",
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#cbd5e1",
  },
  floatingTrackerBar: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "min(720px, 94vw)",
    background: "rgba(16, 20, 32, 0.96)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    borderRadius: "16px",
    boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
    padding: "12px 18px",
    zIndex: 95,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  floatingTrackerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  floatingTrackerTitle: {
    fontSize: "13px",
    fontWeight: 800,
    color: "#fff",
  },
  floatingTrackerSub: {
    fontSize: "11px",
    color: "#cbd5e1",
    marginTop: "2px",
  },
  floatingTrackerActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  floatingCallBtn: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#000",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 800,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 10px rgba(16, 185, 129, 0.3)",
  },
  floatingViewBtn: {
    background: "rgba(245, 158, 11, 0.18)",
    border: "1px solid rgba(245, 158, 11, 0.4)",
    color: "#fbbf24",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  floatingCloseBtn: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
};