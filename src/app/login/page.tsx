"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authenticate, getUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (getUser()) router.replace("/account");
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!email.trim() || !password.trim()) {
      setErr("Please enter email and password.");
      return;
    }
    setBusy(true);
    try {
      const normalized = email.trim().toLowerCase();
      authenticate(normalized, password);
      if (!remember) {
        window.addEventListener("beforeunload", () => {
          localStorage.removeItem("authUser");
        });
      }
      router.replace("/account");
    } catch (e: any) {
      setErr(e?.message || "Invalid email or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-brand-cream text-brand-brown px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-md relative">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-3 bg-gradient-to-r from-black to-brand-brown bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to manage your orders and account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={busy}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✉️
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-brand-gold hover:text-amber-700 font-medium transition-colors duration-200 flex items-center gap-1 text-black"
                >
                  <span>Forgot password?</span>
                  <span>→</span>
                </Link>
              </div>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                  placeholder="Your password"
                  type="password"
                  autoComplete="current-password"
                  minLength={6}
                  required
                  disabled={busy}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium">Minimum 6 characters required</p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
              <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    remember ? 'bg-brand-gold border-brand-gold' : 'bg-white border-gray-300'
                  }`}>
                    {remember && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                Remember me
              </label>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border">localStorage</span>
            </div>

            {/* Error Message */}
            {err && (
              <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 text-xs">!</span>
                  </div>
                  <span>{err}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={busy}
              className="w-full bg-brand-gold hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-3 group"
              type="submit"
            >
              {busy ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">New to Organo?</span>
            </div>
          </div>

          {/* Sign Up Link */}
            <Link 
            href="/signup" 
            className="w-full border-2 border-gray-300 text-black hover:border-brand-gold hover:bg-brand-gold hover:text-white font-semibold py-4 px-6 rounded-2xl text-center block transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 group relative overflow-hidden"
            >
            <span className="relative z-10">Create an account</span>
            <div className="absolute inset-0 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>

        </div>
      </div>
    </main>
  );
}