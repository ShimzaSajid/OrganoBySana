"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useEffect, useMemo } from "react";
import { PRODUCTS } from "@/lib/data";

function money(n: number) {
  try {
    return n.toLocaleString();
  } catch {
    return String(n);
  }
}

export default function CartDrawer() {
  const { isOpen, close, items, subtotal, updateQty, removeItem, clear } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = useMemo(() => subtotal, [subtotal]);

  // Map product metadata by id (for kit children lookups)
  const productById = useMemo(() => {
    const m = new Map<string, any>();
    for (const p of PRODUCTS as any[]) m.set(p.id, p);
    return m;
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer (LEFT) */}
      <aside
        className={`fixed left-0 top-0 h-full w-[360px] max-w-[95vw] bg-white z-[60] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-black">Your Cart</h3>
          <button onClick={close} aria-label="Close" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Items (scroll area) */}
        <div className="overflow-y-auto" style={{ height: "calc(100% - 72px - 240px)" }}>
          <div className="p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <div className="text-4xl mb-3">🛒</div>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some items to get started</p>
              </div>
            ) : (
              items.map((line) => {
                const packQty = line.bundle?.quantity ?? 1;

                // ---- SINGLE: colors summary (supports duplicates) ----
                const singleColors =
                  line.selectedOptions?.colors ??
                  (line.selectedOptions?.color ? [line.selectedOptions.color] : []);
                const colorSummary =
                  (singleColors?.length ?? 0) === 0
                    ? null
                    : (() => {
                        const map = new Map<string, number>();
                        singleColors!.forEach((c) => map.set(c, (map.get(c) ?? 0) + 1));
                        return Array.from(map.entries())
                          .map(([c, count]) => (count > 1 ? `${c} ×${count}` : c))
                          .join(", ");
                      })();

                // ---- KIT: per-item selections (ONLY render for items that actually have colors) ----
                const kitSelections =
                  line.kitSelectedOptions
                    ? Object.entries(line.kitSelectedOptions)
                        .map(([pid, sel]) => {
                          const child = productById.get(pid);
                          const hasColors =
                            child && Array.isArray(child.colors) && child.colors.length > 0;
                          if (!hasColors) return null; // e.g., Wooden Comb -> skip

                          const picked = sel?.colors ?? [];
                          const groups = new Map<string, number>();
                          picked.forEach((c) => groups.set(c, (groups.get(c) ?? 0) + 1));
                          const summary = Array.from(groups.entries())
                            .map(([c, n]) => (n > 1 ? `${c} ×${n}` : c))
                            .join(", ");

                          return {
                            key: pid,
                            name: child?.name ?? "Item",
                            size: (child?.sizeLabel as string | undefined) ?? undefined,
                            summary,
                          };
                        })
                        .filter(Boolean)
                    : [];

                return (
                  <div key={line.lineId} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex gap-4 items-start">
                      <Image
                        src={line.image}
                        alt={line.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-black font-semibold leading-tight text-base mb-1">{line.name}</div>
                        
                        {/* Pack + options */}
                        <div className="text-xs text-gray-600 mb-2">
                          {packQty > 1 ? `Pack of ${packQty}` : "Single"}
                          {line.sizeLabel ? ` • ${line.sizeLabel}` : ""}
                          {colorSummary ? ` • ${colorSummary}` : ""}
                        </div>

                        {/* Price per item */}
                        <div className="text-sm text-black font-medium mb-2">
                          Rs {money(line.unitPrice)} each
                        </div>

                        {/* KIT selections list */}
                        {kitSelections && kitSelections.length > 0 && (
                          <div className="mt-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-800 mb-2">Bundle selections:</div>
                            <ul className="space-y-1">
                              {kitSelections.map((row: any) => (
                                <li key={row.key} className="flex flex-wrap gap-1">
                                  <span className="text-gray-800">
                                    {row.name}
                                    {row.size ? ` (${row.size})` : ""}:
                                  </span>
                                  <span className="text-gray-700">{row.summary || "—"}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls and actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQty(line.lineId, Math.max(1, line.qty - 1))}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="text-xs text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-black">{line.qty}</span>
                        <button
                          onClick={() => updateQty(line.lineId, line.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="text-xs text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-sm font-semibold text-black">
                          Rs {money(line.unitPrice * line.qty)}
                        </div>
                        <button
                          onClick={() => removeItem(line.lineId)}
                          className="text-red-600 text-sm hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg border border-gray-300 bg-black text-white font-medium">
              Subtotal
            </div>
            <div className="p-3 rounded-lg border border-gray-300 text-right font-bold text-black">
              Rs {money(subtotal)}
            </div>
            <div className="p-3 rounded-lg border border-gray-300 bg-black text-white font-medium">
              Shipping
            </div>
            <div className="p-3 rounded-lg border border-gray-300 text-right font-semibold text-green-700">
              FREE
            </div>
          </div>

          <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-gray-200">
            <span className="text-black">Total</span>
            <span className="text-black">Rs {money(total)}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={clear} 
              className={`flex-1 bg-brand-gold text-white rounded-lg py-3 text-sm font-bold hover:bg-amber-600 transition-colors ${
                items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={items.length === 0}
            >
              Clear Cart
            </button>
            {items.length > 0 ? (
              <Link
                href="/checkout"
                onClick={close}
                className="flex-1 text-center bg-brand-green text-white rounded-lg py-3 text-sm font-bold hover:bg-emerald-600 transition-colors"
              >
                Checkout
              </Link>
            ) : (
              <button
                className="flex-1 bg-gray-300 text-gray-500 rounded-lg py-3 text-sm font-bold cursor-not-allowed"
                disabled
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}