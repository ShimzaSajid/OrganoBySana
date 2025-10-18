"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type LastOrderItem = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  sizeLabel: string | null;
  category: string;
  image: string;
  bundle: {
    quantity: number;
    price: number;
    compareAtPrice?: number;
    badge?: string;
  } | null;
  selectedOptions?: { color?: string; colors?: string[] } | null;
  kitSelectedOptions?: Record<string, { colors?: string[] }> | null;
  unitPrice: number;
  unitCompareAtPrice: number | null;
  qty: number;
  isKit: boolean;
};

type LastOrder = {
  orderNumber: string;
  payment: { method: "COD" };
  contact: { emailOrPhone: string; subscribe: boolean };
  shippingAddress: {
    country: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    city: string;
    postal?: string;
    phone: string;
  };
  billingAddress:
    | "same-as-shipping"
    | {
        firstName: string;
        lastName: string;
        company?: string;
        address1: string;
        city: string;
        postal?: string;
        phone: string;
      };
  discountCode: string | null;
  items: LastOrderItem[];
  totals: { subtotal: number; shipping: number; total: number };
  placedAt: string; // ISO date
};

function money(n: number) {
  try {
    return n.toLocaleString();
  } catch {
    return String(n);
  }
}

export default function ConfirmationPage() {
  const q = useSearchParams();
  const orderFromQuery = q.get("order") ?? undefined;
  const trackFromQuery = q.get("track") ?? undefined;

  const [saved, setSaved] = useState<LastOrder | null>(null);

  // Load the last order from sessionStorage (set in Checkout)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lastOrder");
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Build a single-line address for the Maps query
  const addressLine = useMemo(() => {
    if (!saved?.shippingAddress) return "";
    const a = saved.shippingAddress;
    return [a.address1, a.city, a.postal, a.country].filter(Boolean).join(", ");
  }, [saved?.shippingAddress]);

  // Keyless Google Maps embed + fallback open-in-Maps link
  const mapsEmbedSrc = addressLine
    ? `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&output=embed`
    : null;

  const mapsOpenLink = addressLine
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`
    : null;

  // Helpers to summarize selected colors (single + kit)
  const summarizeSingleColors = (colors?: string[], color?: string) => {
    const arr = colors ?? (color ? [color] : []);
    if (!arr || arr.length === 0) return null;
    const m = new Map<string, number>();
    arr.forEach((c) => m.set(c, (m.get(c) ?? 0) + 1));
    return Array.from(m.entries())
      .map(([c, n]) => (n > 1 ? `${c} ×${n}` : c))
      .join(", ");
  };

  const summarizeKit = (kit?: Record<string, { colors?: string[] }> | null) => {
    if (!kit) return "";
    const parts: string[] = [];
    Object.values(kit).forEach((sel) => {
      const g = new Map<string, number>();
      (sel.colors ?? []).forEach((c) => g.set(c, (g.get(c) ?? 0) + 1));
      const s = Array.from(g.entries())
        .map(([c, n]) => (n > 1 ? `${c} ×${n}` : c))
        .join(", ");
      if (s) parts.push(s);
    });
    return parts.join(" • ");
  };

  // No saved order at all → simple fallback
  if (!saved) {
    return (
      <main className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-2">Thank you!</h1>
          <p className="text-gray-700">
            Your order has been placed. (If you refreshed or opened this page directly, we
            couldn’t load the order summary.)
          </p>
          <div className="mt-6">
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Confirmation + shipping + map */}
        <section className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-green text-white grid place-items-center font-bold">
                ✓
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  Thank you{saved?.shippingAddress?.firstName ? `, ${saved.shippingAddress.firstName}` : ""}!
                </h1>
                <p className="text-gray-600">
                  Your order has been placed successfully (Cash on Delivery).
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-brand-cream rounded-xl p-4">
                <div className="text-gray-500">Order #</div>
                <div className="font-semibold text-black">
                  {orderFromQuery ?? saved.orderNumber}
                </div>
              </div>
              <div className="bg-brand-cream rounded-xl p-4">
                <div className="text-gray-500">Tracking ID</div>
                <div className="font-semibold text-black">{trackFromQuery ?? "—"}</div>
              </div>
              <div className="bg-brand-cream rounded-xl p-4">
                <div className="text-gray-500">Placed</div>
                <div className="font-semibold text-black">
                  {new Date(saved.placedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Order updates + Map */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-2">Order Updates</h2>
            <p className="text-gray-700 mb-4">
              You’ll receive order and shipping updates at{" "}
              <span className="font-medium text-black">{saved.contact.emailOrPhone}</span>.
            </p>

            <div className="mt-2">
              <h3 className="text-lg font-semibold text-black mb-3">Delivery Map</h3>
              {mapsEmbedSrc ? (
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    title="Delivery location"
                    src={mapsEmbedSrc}
                    width="100%"
                    height="400"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, borderRadius: 10 }}
                  />
                </div>
              ) : mapsOpenLink ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-3">
                    See your delivery location on Google Maps.
                  </p>
                  <a
                    href={mapsOpenLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-brand-green text-white px-5 py-3 rounded-xl font-semibold hover:opacity-95"
                  >
                    View on Google Maps
                  </a>
                </div>
              ) : (
                <p className="text-gray-600">Address unavailable.</p>
              )}
            </div>
          </div>

          {/* Contact / Address / Payment cards */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Contact</h3>
              <div className="text-gray-800">{saved.contact.emailOrPhone}</div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-lg font-semibold text-black mb-2">Shipping Address</h3>
              <div className="text-gray-800">
                {saved.shippingAddress.firstName} {saved.shippingAddress.lastName}
                {saved.shippingAddress.company ? `, ${saved.shippingAddress.company}` : ""}
                <br />
                {saved.shippingAddress.address1}
                <br />
                {saved.shippingAddress.city}
                {saved.shippingAddress.postal ? `, ${saved.shippingAddress.postal}` : ""}
                <br />
                {saved.shippingAddress.country}
                <br />
                {saved.shippingAddress.phone}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-lg font-semibold text-black mb-2">Payment</h3>
              <div className="text-gray-800">Cash on Delivery (COD)</div>
              <p className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                We’ll integrate PostEx booking later to automatically generate a tracking ID.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/" className="btn-primary">Continue Shopping</Link>
            </div>
          </div>
        </section>

        {/* RIGHT: Order summary */}
        <aside className="bg-white rounded-2xl shadow border border-gray-100 h-fit sticky top-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-black">Your Order</h2>
          </div>

          {/* Items */}
          <div className="p-6 border-b border-gray-100">
            <ul className="space-y-4">
              {saved.items.map((line) => {
                const packQty = line.bundle?.quantity ?? 1;
                const single = summarizeSingleColors(
                  line.selectedOptions?.colors ?? undefined,
                  line.selectedOptions?.color ?? undefined
                );
                const kit = summarizeKit(line.kitSelectedOptions);

                return (
                  <li
                    key={line.lineId}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                  >
                    <div className="relative flex-shrink-0">
                      <Image
                        src={line.image}
                        alt={line.name}
                        width={70}
                        height={70}
                        className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs px-2 py-1 rounded-full font-bold min-w-6 text-center">
                        {line.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-black leading-tight mb-1">
                        {line.name}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {packQty > 1 ? `Pack of ${packQty}` : "Single"}
                        {line.sizeLabel && ` • ${line.sizeLabel}`}
                      </div>
                      {single && (
                        <div className="text-xs text-gray-700 mb-1">Colors: {single}</div>
                      )}
                      {kit && kit.length > 0 && (
                        <div className="text-xs text-gray-700">Bundle: {kit}</div>
                      )}
                    </div>
                    <div className="text-sm font-bold text-black whitespace-nowrap">
                      Rs {money(line.unitPrice * line.qty)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Totals */}
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black font-semibold">
                  Rs {money(saved.totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-700 font-semibold">
                  {saved.totals.shipping === 0
                    ? "FREE"
                    : `Rs ${money(saved.totals.shipping)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-black">Total</span>
                  <span className="font-bold text-black">Rs {money(saved.totals.total)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Including all applicable taxes
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
