"use client";

import { useEffect, useState } from "react";
import { register, getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (getUser()) router.replace("/account");
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!name.trim()) return setErr("Please enter your full name.");
    if (!email.trim()) return setErr("Please enter your email.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");
    if (pw !== pw2) return setErr("Passwords do not match.");
    if (!agree) return setErr("Please agree to Terms and Privacy Policy.");

    setBusy(true);
    try {
      const normalized = email.trim().toLowerCase();
      register(name.trim(), normalized, pw);
      router.replace("/account");
    } catch (e: any) {
      setErr(e?.message || "Could not create account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen pt-13 pb-16 bg-brand-cream text-brand-brown px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-md relative">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-3 bg-gradient-to-r from-black to-brand-brown bg-clip-text text-transparent">
            Join Organo
          </h1>
          <p className="text-gray-600 text-lg">
            Create your account and start shopping
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                  placeholder="Sana Ahmed"
                  autoComplete="name"
                  required
                  disabled={busy}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Email Address <span className="text-red-500">*</span>
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
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                  placeholder="At least 6 characters"
                  type="password"
                  autoComplete="new-password"
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

            {/* Confirm Password Field */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all duration-300 bg-white placeholder-gray-400 pr-12 text-black"
                  placeholder="Re-enter password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  disabled={busy}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </div>
              </div>
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
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-3 group active:scale-95"
              type="submit"
            >
              {busy ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-brand-gold hover:text-amber-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}