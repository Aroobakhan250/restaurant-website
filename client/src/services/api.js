export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Table Reservation
export async function createReservationAPI(reservationData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData),
    });
    return await res.json();
  } catch (error) {
    console.warn("Backend reservation error, using local fallback:", error);
    return { success: true, localOnly: true, data: reservationData };
  }
}

// Food Order Checkout
export async function createOrderAPI(orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (error) {
    console.warn("Backend order error, using local fallback:", error);
    return { success: true, localOnly: true, data: orderData };
  }
}

// Contact Message
export async function submitContactAPI(contactData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    return await res.json();
  } catch (error) {
    console.warn("Backend contact error:", error);
    return { success: true, localOnly: true };
  }
}
