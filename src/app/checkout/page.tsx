"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";

function money(n: number) {
  try {
    return n.toLocaleString();
  } catch {
    return String(n);
  }
}

type ShippingForm = {
  emailOrPhone: string;
  subscribe: boolean;
  country: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  city: string;
  postal?: string;
  phone: string;
  saveInfo: boolean;
};

type BillingForm = {
  useShipping: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  city: string;
  postal?: string;
  phone: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  // Pricing
  const shippingCost = 0;
  const total = useMemo(() => subtotal + shippingCost, [subtotal]);

  // Forms
  const [shipping, setShipping] = useState<ShippingForm>({
    emailOrPhone: "",
    subscribe: false,
    country: "Pakistan",
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    city: "",
    postal: "",
    phone: "",
    saveInfo: true,
  });

  const [billing, setBilling] = useState<BillingForm>({
    useShipping: true,
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    city: "",
    postal: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!shipping.emailOrPhone.trim()) e.emailOrPhone = "Required";
    if (!shipping.firstName.trim()) e.firstName = "Required";
    if (!shipping.lastName.trim()) e.lastName = "Required";
    if (!shipping.address1.trim()) e.address1 = "Required";
    if (!shipping.city.trim()) e.city = "Required";
    if (!shipping.phone.trim()) e.phone = "Required";

    if (!billing.useShipping) {
      if (!billing.firstName.trim()) e.bill_firstName = "Required";
      if (!billing.lastName.trim()) e.bill_lastName = "Required";
      if (!billing.address1.trim()) e.bill_address1 = "Required";
      if (!billing.city.trim()) e.bill_city = "Required";
      if (!billing.phone.trim()) e.bill_phone = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Summaries (same spirit as CartDrawer)
  const summarizeSingleColors = (colors?: string[], color?: string) => {
    const arr = colors ?? (color ? [color] : []);
    if (!arr || arr.length === 0) return null;
    const m = new Map<string, number>();
    arr.forEach((c) => m.set(c, (m.get(c) ?? 0) + 1));
    return Array.from(m.entries())
      .map(([c, n]) => (n > 1 ? `${c} ×${n}` : c))
      .join(", ");
  };

  const summarizeKitSelections = (
    kitSelectedOptions?: Record<string, { colors?: string[] }>
  ) => {
    if (!kitSelectedOptions) return [];
    return Object.entries(kitSelectedOptions)
      .map(([pid, sel]) => {
        const groups = new Map<string, number>();
        (sel.colors ?? []).forEach((c) => groups.set(c, (groups.get(c) ?? 0) + 1));
        const summary = Array.from(groups.entries())
          .map(([c, n]) => (n > 1 ? `${c} ×${n}` : c))
          .join(", ");
        return summary ? { pid, summary } : null;
      })
      .filter(Boolean) as { pid: string; summary: string }[];
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const orderNumber = `ORD-${Date.now()}`;
      const payload = {
        orderNumber,
        payment: { method: "COD" as const },
        contact: {
          emailOrPhone: shipping.emailOrPhone,
          subscribe: shipping.subscribe,
        },
        shippingAddress: {
          country: shipping.country,
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          company: shipping.company,
          address1: shipping.address1,
          city: shipping.city,
          postal: shipping.postal,
          phone: shipping.phone,
        },
        billingAddress: billing.useShipping
          ? "same-as-shipping"
          : {
              firstName: billing.firstName,
              lastName: billing.lastName,
              company: billing.company,
              address1: billing.address1,
              city: billing.city,
              postal: billing.postal,
              phone: billing.phone,
            },
        discountCode: discountCode || null,
        items: items.map((l) => ({
          lineId: l.lineId,
          productId: l.productId,
          slug: l.slug,
          name: l.name,
          sizeLabel: l.sizeLabel ?? null,
          category: l.category,
          image: l.image,
          bundle: l.bundle ?? null,
          selectedOptions: l.selectedOptions ?? null,
          kitSelectedOptions: l.kitSelectedOptions ?? null,
          unitPrice: l.unitPrice,
          unitCompareAtPrice: l.unitCompareAtPrice ?? null,
          qty: l.qty,
          isKit: !!l.isKit,
        })),
        totals: { subtotal, shipping: shippingCost, total },
        placedAt: new Date().toISOString(),
      };

      // Replace with real API later (PostEx + Payload)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastOrder", JSON.stringify(payload));
      }

      clear();
      router.push(`/order/confirmation?order=${encodeURIComponent(orderNumber)}`);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert("Something went wrong placing your order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">Checkout</h1>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🛒</span>
          </div>
          <p className="text-gray-700 text-lg mb-4">Your cart is empty.</p>
          <Link href="/" className="inline-block bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order with confidence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Contact + Delivery + Payment + Billing */}
          <form onSubmit={placeOrder} className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">1</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                    placeholder="Email or mobile phone number"
                    value={shipping.emailOrPhone}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, emailOrPhone: e.target.value }))
                    }
                  />
                  {errors.emailOrPhone && (
                    <p className="text-red-600 text-sm mt-2">{errors.emailOrPhone}</p>
                  )}
                </div>
                <label className="flex items-center gap-3 text-gray-700 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    checked={shipping.subscribe}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, subscribe: e.target.checked }))
                    }
                  />
                  <span className="group-hover:text-gray-900 transition-colors">Email me with news and offers</span>
                </label>
              </div>
            </section>

            {/* Delivery */}
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">2</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Delivery Address</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800"
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, country: e.target.value }))
                    }
                  >
                    <option>Pakistan</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="First name"
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, firstName: e.target.value }))
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-2">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="Last name"
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, lastName: e.target.value }))
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-2">{errors.lastName}</p>
                    )}
                  </div>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600 sm:col-span-2"
                    placeholder="Company (optional)"
                    value={shipping.company}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, company: e.target.value }))
                    }
                  />
                  <div className="sm:col-span-2">
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="Address"
                      value={shipping.address1}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, address1: e.target.value }))
                      }
                    />
                    {errors.address1 && (
                      <p className="text-red-600 text-sm mt-2">{errors.address1}</p>
                    )}
                  </div>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, city: e.target.value }))
                    }
                  />
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                    placeholder="Postal code (optional)"
                    value={shipping.postal}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, postal: e.target.value }))
                    }
                  />
                  <div className="sm:col-span-2">
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="Phone"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, phone: e.target.value }))
                      }
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-2">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-3 text-gray-700 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      checked={shipping.saveInfo}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, saveInfo: e.target.checked }))
                      }
                    />
                    <span className="group-hover:text-gray-900 transition-colors">Save this information for next time</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Shipping method */}
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">3</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Shipping Method</h2>
              </div>
              <div className="flex items-center justify-between border-2 border-green-200 bg-green-50 rounded-xl p-4">
                <span className="text-gray-800 font-medium">Free Shipping</span>
                <span className="px-3 py-1 rounded-full bg-brand-green text-white text-sm font-semibold">FREE</span>
              </div>
            </section>

            {/* Payment (COD only) */}
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">4</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Payment Method</h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  All transactions are secure and encrypted.
                </p>

                <label className="flex items-center gap-4 border-2 border-green-200 bg-green-50 rounded-xl p-4 cursor-pointer">
                  <input type="radio" name="payment" checked readOnly className="w-4 h-4 text-brand-green" />
                  <span className="font-semibold text-gray-900">Cash on Delivery (COD)</span>
                </label>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> We'll integrate PostEx booking after order placement to generate your tracking ID.
                  </p>
                </div>
              </div>
            </section>

            {/* Billing address */}
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">5</span>
                </div>
                <h2 className="text-xl font-semibold text-black">Billing Address</h2>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-colors">
                  <input
                    type="radio"
                    name="billing"
                    checked={billing.useShipping}
                    onChange={() => setBilling((b) => ({ ...b, useShipping: true }))}
                    className="w-4 h-4 text-brand-green"
                  />
                  <span className="font-medium text-gray-800">Same as shipping address</span>
                </label>

                <label className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-colors">
                  <input
                    type="radio"
                    name="billing"
                    checked={!billing.useShipping}
                    onChange={() => setBilling((b) => ({ ...b, useShipping: false }))}
                    className="w-4 h-4 text-brand-green"
                  />
                  <span className="font-medium text-gray-800">Use a different billing address</span>
                </label>

                {!billing.useShipping && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                        placeholder="First name"
                        value={billing.firstName}
                        onChange={(e) =>
                          setBilling((b) => ({ ...b, firstName: e.target.value }))
                        }
                      />
                      {errors.bill_firstName && (
                        <p className="text-red-600 text-sm mt-2">{errors.bill_firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                        placeholder="Last name"
                        value={billing.lastName}
                        onChange={(e) =>
                          setBilling((b) => ({ ...b, lastName: e.target.value }))
                        }
                      />
                      {errors.bill_lastName && (
                        <p className="text-red-600 text-sm mt-2">{errors.bill_lastName}</p>
                      )}
                    </div>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600 sm:col-span-2"
                      placeholder="Company (optional)"
                      value={billing.company}
                      onChange={(e) =>
                        setBilling((b) => ({ ...b, company: e.target.value }))
                      }
                    />
                    <div className="sm:col-span-2">
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                        placeholder="Address"
                        value={billing.address1}
                        onChange={(e) =>
                          setBilling((b) => ({ ...b, address1: e.target.value }))
                        }
                      />
                      {errors.bill_address1 && (
                        <p className="text-red-600 text-sm mt-2">{errors.bill_address1}</p>
                      )}
                    </div>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="City"
                      value={billing.city}
                      onChange={(e) =>
                        setBilling((b) => ({ ...b, city: e.target.value }))
                      }
                    />
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                      placeholder="Postal code (optional)"
                      value={billing.postal}
                      onChange={(e) =>
                        setBilling((b) => ({ ...b, postal: e.target.value }))
                      }
                    />
                    <div className="sm:col-span-2">
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-800 placeholder-gray-600"
                        placeholder="Phone"
                        value={billing.phone}
                        onChange={(e) =>
                          setBilling((b) => ({ ...b, phone: e.target.value }))
                        }
                      />
                      {errors.bill_phone && (
                        <p className="text-red-600 text-sm mt-2">{errors.bill_phone}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  <Link
                    href="/cart"
                    className="flex-1 text-center border-2 border-gray-300 text-gray-700 rounded-xl py-4 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Return to cart
                  </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-brand-green text-white rounded-xl py-4 font-bold hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing order...
                    </div>
                  ) : (
                    "Confirm Order"
                  )}
                </button>
                </div>
              </div>
            </section>
          </form>

          {/* RIGHT: Order summary */}
          <aside className="bg-white rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-black">Order Summary</h2>
            </div>

            {/* Items */}
            <div className="p-6 border-b border-gray-100">
              <ul className="space-y-4">
                {items.map((line) => {
                  const packQty = line.bundle?.quantity ?? 1;
                  const single = summarizeSingleColors(
                    line.selectedOptions?.colors,
                    line.selectedOptions?.color
                  );
                  const kit = summarizeKitSelections(line.kitSelectedOptions);

                  return (
                    <li key={line.lineId} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
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
                        {kit.length > 0 && (
                          <div className="text-xs text-gray-700">
                            Bundle: {kit.map((k) => k.summary).join(" • ")}
                          </div>
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
                  <span className="text-black font-semibold">Rs {money(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-700 font-semibold">
                    {shippingCost === 0 ? "FREE" : `Rs ${money(shippingCost)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-black">Total</span>
                    <span className="font-bold text-black">Rs {money(total)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Including all applicable taxes
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}