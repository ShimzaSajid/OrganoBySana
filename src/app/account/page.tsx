"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, logout } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/login");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) {
    return (
      <main className="min-h-screen pt-20 pb-16 bg-brand-cream px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
            <p className="text-center text-gray-600">Loading your account…</p>
          </div>
        </div>
      </main>
    );
  }

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-brand-cream px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-black mb-2">Hi, {user.name}</h1>
          <p className="text-gray-700 mb-6">{user.email}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/" className="btn-outline text-center">Continue Shopping</Link>
            <button
              onClick={onLogout}
              className="btn-primary"
            >
              Log out
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="font-semibold text-black mb-2">Orders</h2>
            <p className="text-gray-600 text-sm">No orders yet (demo account).</p>
          </div>
        </div>
      </div>
    </main>
  );
}
